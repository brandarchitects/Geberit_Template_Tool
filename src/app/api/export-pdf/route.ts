import { NextRequest, NextResponse } from 'next/server';
import { AnyTemplateData } from '@/types/template';
import { buildPdfHtml, buildWelcomeCardHtml } from '@/lib/pdfRenderer';
import { existsSync } from 'fs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const SYSTEM_CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/snap/bin/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

async function getPuppeteerBundledPath(): Promise<string | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const puppeteer = require('puppeteer');
    const p: string = puppeteer.executablePath?.() ?? puppeteer.default?.executablePath?.();
    if (p && existsSync(p)) return p;
  } catch { /* expected in production */ }
  return null;
}

// Page size config per template
const PAGE_FORMATS: Record<string, { width: string; height: string; puppeteerFormat?: string }> = {
  'geberit-ad-01':       { puppeteerFormat: 'A4', width: '210mm', height: '297mm' },
  'geberit-welcome-card': { width: '257mm', height: '182mm' },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const templateId: string = body.templateId ?? 'geberit-ad-01';
    const data: AnyTemplateData = body.data;

    if (!data) return new NextResponse('Missing template data', { status: 400 });

    // Build HTML for the correct template
    let html: string;
    if (templateId === 'geberit-welcome-card') {
      html = buildWelcomeCardHtml(data as import('@/types/template').WelcomeCardData);
    } else {
      html = buildPdfHtml(data as import('@/types/template').GeberitAd01Data);
    }

    const puppeteerCore = (await import('puppeteer-core')).default;

    let executablePath: string | null = null;
    let launchArgs: string[] = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];

    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      try {
        const chromium = (await import('@sparticuz/chromium')).default;
        executablePath = await chromium.executablePath();
        launchArgs = chromium.args;
      } catch { /* fall through */ }
    }

    if (!executablePath) executablePath = await getPuppeteerBundledPath();
    if (!executablePath) executablePath = SYSTEM_CHROME_PATHS.find((p) => existsSync(p)) ?? null;

    if (!executablePath) {
      try {
        const chromium = (await import('@sparticuz/chromium')).default;
        const p = await chromium.executablePath();
        if (p && existsSync(p)) { executablePath = p; launchArgs = chromium.args; }
      } catch { /* not available */ }
    }

    if (!executablePath) {
      return new NextResponse(
        JSON.stringify({ error: 'no_browser', message: 'No Chrome/Chromium found. Deploy to Vercel or install Google Chrome.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const browser = await puppeteerCore.launch({ executablePath, headless: true, args: launchArgs });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0', timeout: 20000 });

      const fmt = PAGE_FORMATS[templateId] ?? PAGE_FORMATS['geberit-ad-01'];
      const pdfOptions = fmt.puppeteerFormat
        ? { format: fmt.puppeteerFormat as 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } }
        : { width: fmt.width, height: fmt.height, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } };

      const pdfUint8Array = await page.pdf(pdfOptions);
      const pdfBuffer = Buffer.from(pdfUint8Array);

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="geberit_${templateId}_${Date.now()}.pdf"`,
          'Cache-Control': 'no-store',
        },
      });
    } finally {
      await browser.close();
    }
  } catch (err) {
    console.error('[export-pdf]', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return new NextResponse(
      JSON.stringify({ error: 'pdf_failed', message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
