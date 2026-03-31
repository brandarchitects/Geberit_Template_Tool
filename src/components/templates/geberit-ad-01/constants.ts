/**
 * Geberit Ad 01 — Layout Constants
 *
 * All measurements in mm unless noted otherwise.
 * Adjust these values to match the exact print design once
 * the annotated specification files are delivered.
 *
 * Page: A4  210 × 297 mm
 * Background image source: 2000 × 1334 px  (ratio 1.499 → height = 210/1.499 = 140.09 mm)
 */

export const C = {
  // ─── Page ────────────────────────────────────────────────────────────────
  pageWidth: '210mm',
  pageHeight: '297mm',

  // ─── Hero image ──────────────────────────────────────────────────────────
  heroHeight: '140mm',

  // ─── Geberit Logo ─────────────────────────────────────────────────────────
  // Original: 520 × 79 px  → width 38mm → height 38 × 79/520 = 5.77mm
  logoTop: '10mm',
  logoRight: '5.5mm',
  logoWidth: '38mm',

  // ─── Taglines (bottom-left of hero) ──────────────────────────────────────
  taglineLeft: '15mm',
  taglineBottom: '12mm',
  taglineFontSize: '42pt',      // ~14.8mm per line — adjust to spec
  taglineLineHeight: 1.05,

  // ─── Content section ─────────────────────────────────────────────────────
  contentPaddingTop: '10mm',
  contentPaddingBottom: '10mm',
  contentPaddingLeft: '30mm',
  contentPaddingRight: '30mm',
  columnGap: '10mm',

  // ─── Typography ──────────────────────────────────────────────────────────
  lookingForSize: '8pt',
  jobTitleSize: '12pt',
  sectionTitleSize: '7.5pt',
  bodySize: '8.5pt',
  bulletSize: '8.5pt',
  lineHeight: 1.35,

  // ─── Separator line ───────────────────────────────────────────────────────
  separatorColor: '#004673',
  separatorThickness: '0.3pt',
  separatorMarginBottom: '2mm',
  separatorMarginTop: '1mm',

  // ─── Colors ───────────────────────────────────────────────────────────────
  geberitBlue: '#004673',
  perfectFitBlue: '#B4CDF0',
  textBlack: '#000000',
  white: '#ffffff',

  // ─── Available background images ─────────────────────────────────────────
  backgroundImages: [
    'Geberit_Ad_01',
    'Geberit_Ad_02',
    'Geberit_Ad_03',
    'Geberit_Ad_04',
    'Geberit_Ad_05',
    'Geberit_Ad_06',
  ] as string[],

  defaultBackgroundId: 'Geberit_Ad_01',
};
