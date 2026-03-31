import fs from 'fs';
import path from 'path';
import { GeberitAd01Data } from '@/types/template';
import { C } from '@/components/templates/geberit-ad-01/constants';

// ─── Font loading ─────────────────────────────────────────────────────────────

function loadFontBase64(filename: string): string {
  const fontPath = path.join(process.cwd(), 'public', 'fonts', filename);
  if (!fs.existsSync(fontPath)) return '';
  return fs.readFileSync(fontPath).toString('base64');
}

function buildFontFace(): string {
  const boldWoff2    = loadFontBase64(C.fonts.bold.woff2);
  const boldTtf      = loadFontBase64(C.fonts.bold.ttf);
  const regularWoff2 = loadFontBase64(C.fonts.regular.woff2);
  const regularTtf   = loadFontBase64(C.fonts.regular.ttf);
  const lightWoff2   = loadFontBase64(C.fonts.light.woff2);
  const lightTtf     = loadFontBase64(C.fonts.light.ttf);
  const mediumWoff2  = loadFontBase64(C.fonts.medium.woff2);
  const mediumTtf    = loadFontBase64(C.fonts.medium.ttf);

  const face = (weight: number, woff2B64: string, ttfB64: string, style = 'normal') => {
    const sources: string[] = [];
    if (woff2B64) sources.push(`url('data:font/woff2;base64,${woff2B64}') format('woff2')`);
    if (ttfB64)   sources.push(`url('data:font/truetype;base64,${ttfB64}') format('truetype')`);
    if (sources.length === 0) return '';
    return `
@font-face {
  font-family: 'AktivGroteskGeberit';
  font-weight: ${weight};
  font-style: ${style};
  src: ${sources.join(', ')};
}`;
  };

  return [
    face(700, boldWoff2,    boldTtf),
    face(400, regularWoff2, regularTtf),
    face(300, lightWoff2,   lightTtf),
    face(500, mediumWoff2,  mediumTtf),
  ].join('\n');
}

// ─── Image loading ────────────────────────────────────────────────────────────

function resolveBackgroundBase64(data: GeberitAd01Data): { base64: string; mime: string } {
  if (data.customBackgroundBase64) {
    return {
      base64: data.customBackgroundBase64,
      mime: data.customBackgroundMimeType ?? 'image/jpeg',
    };
  }
  const imgPath = path.join(
    process.cwd(),
    'public',
    'images',
    `${data.backgroundImageId}.jpg`
  );
  if (fs.existsSync(imgPath)) {
    return {
      base64: fs.readFileSync(imgPath).toString('base64'),
      mime: 'image/jpeg',
    };
  }
  return { base64: '', mime: 'image/jpeg' };
}

function resolveLogoBase64(): { base64: string; mime: string } {
  const candidates = [
    path.join(process.cwd(), 'public', 'images', 'Logo_Geberit_white_transparent.png'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return { base64: fs.readFileSync(p).toString('base64'), mime: 'image/png' };
    }
  }
  return { base64: '', mime: 'image/png' };
}

// ─── Section HTML helpers ─────────────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sectionHtml(
  title: string,
  text: string | undefined,
  items: string[] | undefined,
  blueTitle: boolean
): string {
  const titleColor = blueTitle ? C.geberitBlue : C.textBlack;
  const titleHtml = `
    <div class="section-title-row" style="display:flex;align-items:center;margin-bottom:${C.separatorMarginTop};">
      <span style="font-family:'AktivGroteskGeberit',Arial,sans-serif;font-weight:${C.sectionTitleWeight};font-size:${C.sectionTitleSize};color:${titleColor};text-transform:uppercase;letter-spacing:0.04em;flex-shrink:0;margin-right:2mm;">${escapeHtml(title)}</span>
      ${blueTitle ? `<div style="flex:1;height:${C.separatorThickness};background-color:${C.separatorColor};margin-top:0.5mm;"></div>` : ''}
    </div>`;

  const bodyHtml = text
    ? `<div style="font-family:'AktivGroteskGeberit',Arial,sans-serif;font-weight:${C.bodyWeight};font-size:${C.bodySize};color:${C.textBlack};line-height:${C.bodyLineHeight};white-space:pre-line;">${escapeHtml(text)}</div>`
    : '';

  const listHtml =
    items && items.length > 0
      ? `<ul style="margin:0;padding-left:3.5mm;list-style-type:disc;">${items
          .map(
            (item) =>
              `<li style="font-family:'AktivGroteskGeberit',Arial,sans-serif;font-weight:${C.bulletWeight};font-size:${C.bulletSize};color:${C.textBlack};line-height:${C.bulletLineHeight};margin-bottom:0.3mm;padding-left:0.5mm;">${escapeHtml(item)}</li>`
          )
          .join('')}</ul>`
      : '';

  return `<div style="margin-bottom:4mm;">${titleHtml}${bodyHtml}${listHtml}</div>`;
}

// ─── Main HTML builder ────────────────────────────────────────────────────────

export function buildPdfHtml(data: GeberitAd01Data): string {
  const fontFaces = buildFontFace();
  const bg = resolveBackgroundBase64(data);
  const logo = resolveLogoBase64();

  const bgSrc = bg.base64
    ? `data:${bg.mime};base64,${bg.base64}`
    : '';

  const logoSrc = logo.base64
    ? `data:${logo.mime};base64,${logo.base64}`
    : '';

  const gradient = `linear-gradient(to top, rgba(0,70,115,${data.gradientOpacity}) 0%, rgba(0,70,115,${data.gradientOpacity * 0.3}) 45%, transparent 75%)`;

  const leftColumn = [
    // Job intro
    `<div style="margin-bottom:5mm;">
       <div style="font-family:'AktivGroteskGeberit',Arial,sans-serif;font-weight:${C.lookingForWeight};font-size:${C.lookingForSize};color:${C.textBlack};line-height:1.3;margin-bottom:1mm;">${escapeHtml(data.lookingForLabel)}</div>
       <div style="font-family:'AktivGroteskGeberit',Arial,sans-serif;font-weight:${C.jobTitleWeight};font-size:${C.jobTitleSize};color:${C.textBlack};line-height:1.2;">${escapeHtml(data.jobTitle)}</div>
     </div>`,
    sectionHtml(data.aboutTitle, data.aboutText, undefined, true),
    sectionHtml(data.responsibilitiesTitle, undefined, data.responsibilitiesItems, true),
  ].join('');

  const rightColumn = [
    sectionHtml(data.profileTitle, undefined, data.profileItems, true),
    sectionHtml(data.applicationTitle, data.applicationText, undefined, false),
    sectionHtml(data.contactTitle, data.contactText, undefined, false),
  ].join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  ${fontFaces}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 210mm;
    height: 297mm;
    overflow: hidden;
  }
  body {
    font-family: 'AktivGroteskGeberit', Arial, sans-serif;
    background: #ffffff;
  }
  @page {
    size: A4;
    margin: 0;
  }
</style>
</head>
<body>
<div style="width:210mm;height:297mm;position:relative;background:#ffffff;overflow:hidden;">

  <!-- Hero section -->
  <div style="position:absolute;top:0;left:0;width:210mm;height:${C.heroHeight};overflow:hidden;">
    ${bgSrc ? `<img src="${bgSrc}" alt="" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;" />` : `<div style="width:100%;height:100%;background:#004673;"></div>`}

    <!-- Gradient overlay -->
    <div style="position:absolute;inset:0;background:${gradient};"></div>

    <!-- Logo -->
    ${logoSrc ? `<img src="${logoSrc}" alt="GEBERIT" style="position:absolute;top:${C.logoTop};right:${C.logoRight};width:${C.logoWidth};height:auto;" />` : ''}

    <!-- Taglines -->
    <div style="position:absolute;bottom:${C.taglineBottom};left:${C.taglineLeft};">
      <div style="font-family:'AktivGroteskGeberit',Arial,sans-serif;font-weight:300;font-size:${C.taglineFontSize};color:#ffffff;line-height:${C.taglineLineHeight};text-transform:uppercase;">${escapeHtml(data.tagline1)}</div>
      <div style="font-family:'AktivGroteskGeberit',Arial,sans-serif;font-weight:300;font-size:${C.taglineFontSize};color:#ffffff;line-height:${C.taglineLineHeight};text-transform:uppercase;">${escapeHtml(data.tagline2)}</div>
      <div style="font-family:'AktivGroteskGeberit',Arial,sans-serif;font-weight:700;font-size:${C.taglineFontSize};color:${C.perfectFitBlue};line-height:${C.taglineLineHeight};text-transform:uppercase;">${escapeHtml(data.tagline3)}</div>
    </div>
  </div>

  <!-- Content section -->
  <div style="position:absolute;top:${C.heroHeight};left:0;right:0;bottom:0;display:flex;padding-top:${C.contentPaddingTop};padding-bottom:${C.contentPaddingBottom};padding-left:${C.contentPaddingLeft};padding-right:${C.contentPaddingRight};gap:${C.columnGap};box-sizing:border-box;">
    <!-- Left column -->
    <div style="flex:1;overflow:hidden;">
      ${leftColumn}
    </div>
    <!-- Right column -->
    <div style="flex:1;overflow:hidden;">
      ${rightColumn}
    </div>
  </div>

</div>
</body>
</html>`;
}
