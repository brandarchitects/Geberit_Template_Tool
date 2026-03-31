import { NextRequest, NextResponse } from 'next/server';
import { GeberitAd01Data } from '@/types/template';
import { buildPdfHtml } from '@/lib/pdfRenderer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data: GeberitAd01Data = body.data;

    if (!data) {
      return new NextResponse('Missing template data', { status: 400 });
    }

    const html = buildPdfHtml(data);

    // Dynamic import to avoid bundling issues in non-Puppeteer environments
    let browser;
    try {
      // Try Vercel/production path first (@sparticuz/chromium)
      const chromium = (await import('@sparticuz/chromium')).default;
      const puppeteer = (await import('puppeteer-core')).default;

      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    } catch {
      // Fallback for local development: use system Chrome
      const puppeteer = (await import('puppeteer-core')).default;
      const execPaths = [
        // Mac
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        // Linux
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        // Windows
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      ];

      const { existsSync } = await import('fs');
      const executablePath = execPaths.find((p) => existsSync(p));

      if (!executablePath) {
        return new NextResponse(
          'Chrome/Chromium not found. Install Chrome or deploy to Vercel.',
          { status: 500 }
        );
      }

      browser = await puppeteer.launch({
        executablePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    try {
      const page = await browser.newPage();

      await page.setContent(html, { waitUntil: 'networkidle0', timeout: 20000 });

      const pdfUint8Array = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });

      const pdfBuffer = Buffer.from(pdfUint8Array);

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="geberit_ad.pdf"',
        },
      });
    } finally {
      await browser.close();
    }
  } catch (err) {
    console.error('[export-pdf]', err);
    return new NextResponse(
      err instanceof Error ? err.message : 'Internal server error',
      { status: 500 }
    );
  }
}
