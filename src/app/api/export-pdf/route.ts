import { NextRequest, NextResponse } from 'next/server';
import { GeberitAd01Data } from '@/types/template';
import { buildPdfHtml } from '@/lib/pdfRenderer';
import { existsSync } from 'fs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const SYSTEM_CHROME_PATHS = [
  // Mac
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  // Linux
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/snap/bin/chromium',
  // Windows
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

async function getPuppeteerBundledPath(): Promise<string | null> {
  try {
    // puppeteer (full package with bundled Chromium) — optional, used in local dev
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const puppeteer = require('puppeteer');
    const p: string = puppeteer.executablePath?.() ?? puppeteer.default?.executablePath?.();
    if (p && existsSync(p)) return p;
  } catch {
    // puppeteer not installed or Chromium not downloaded — expected in production
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data: GeberitAd01Data = body.data;

    if (!data) {
      return new NextResponse('Missing template data', { status: 400 });
    }

    const html = buildPdfHtml(data);
    const puppeteerCore = (await import('puppeteer-core')).default;

    let executablePath: string | null = null;
    let launchArgs: string[] = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];

    // ── 1. Vercel / production: @sparticuz/chromium ──────────────────────────
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      try {
        const chromium = (await import('@sparticuz/chromium')).default;
        executablePath = await chromium.executablePath();
        launchArgs = chromium.args;
      } catch {
        // fall through to system paths
      }
    }

    // ── 2. puppeteer bundled Chromium (local dev with full puppeteer pkg) ────
    if (!executablePath) {
      executablePath = await getPuppeteerBundledPath();
    }

    // ── 3. System Chrome / Chromium ──────────────────────────────────────────
    if (!executablePath) {
      executablePath = SYSTEM_CHROME_PATHS.find((p) => existsSync(p)) ?? null;
    }

    // ── 4. @sparticuz/chromium as last resort (non-Vercel) ───────────────────
    if (!executablePath) {
      try {
        const chromium = (await import('@sparticuz/chromium')).default;
        const path = await chromium.executablePath();
        if (path && existsSync(path)) executablePath = path;
        if (executablePath) launchArgs = chromium.args;
      } catch {
        // not available
      }
    }

    if (!executablePath) {
      return new NextResponse(
        JSON.stringify({
          error: 'no_browser',
          message:
            'No Chrome/Chromium found. For local development: install Google Chrome. For production: deploy to Vercel.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const browser = await puppeteerCore.launch({
      executablePath,
      headless: true,
      args: launchArgs,
    });

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
          'Content-Disposition': `attachment; filename="geberit_ad_${Date.now()}.pdf"`,
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
