/**
 * Geberit Ad 01 — Layout Constants
 *
 * All measurements in mm / pt as per the official Geberit design specification.
 *
 * Page: A4  210 × 297 mm
 * Background image: 2000 × 1334 px  (ratio 1.499 → height = 210/1.499 ≈ 140 mm)
 * Logo source: Logo_Geberit_white_transparent.png  520 × 79 px
 */

export const C = {
  // ─── Page ────────────────────────────────────────────────────────────────
  pageWidth: '210mm',
  pageHeight: '297mm',

  // ─── Hero image ──────────────────────────────────────────────────────────
  // 210mm × (1334/2000) = 140.07 mm
  heroHeight: '140mm',

  // ─── Geberit Logo ─────────────────────────────────────────────────────────
  // Spec: 10 mm from top, 5.5 mm from right
  // Width: 520 px original → rendered at ~38 mm (height auto: 38 × 79/520 ≈ 5.77 mm)
  logoTop: '10mm',
  logoRight: '5.5mm',
  logoWidth: '38mm',

  // ─── Taglines (bottom-left of hero) ──────────────────────────────────────
  // Spec: left 15 mm from page edge
  // Font sizes: 40pt  (white Light for line 1–2, blue Bold for line 3)
  taglineLeft: '15mm',
  taglineBottom: '10mm',
  taglineFontSize: '40pt',
  taglineLineHeight: 1.05,

  // ─── Content section (below hero) ────────────────────────────────────────
  // Spec: 30 mm left margin, 30 mm right margin, 10 mm column gap
  contentPaddingTop: '10mm',
  contentPaddingBottom: '10mm',
  contentPaddingLeft: '30mm',
  contentPaddingRight: '30mm',
  columnGap: '10mm',

  // ─── Typography ──────────────────────────────────────────────────────────
  // Spec: "We are looking for" — Aktiv Grotesk Light, 11pt
  lookingForSize: '11pt',
  lookingForWeight: 300,

  // Job title ("Electrical Engineer FH") — Bold, visually ~14pt
  jobTitleSize: '13pt',
  jobTitleWeight: 700,

  // Section titles ("ABOUT GEBERIT" etc.) — Bold, uppercase, blue
  // Not explicitly in spec → estimated at 8pt bold (proportional to body)
  sectionTitleSize: '8pt',
  sectionTitleWeight: 700,

  // Spec: Body copy — Aktiv Grotesk Geberit, 8.5pt
  bodySize: '8.5pt',
  bodyWeight: 400,

  // Bullet points — same as body copy
  bulletSize: '8.5pt',
  bulletWeight: 400,

  lineHeight: 1.35,

  // ─── Separator line (below section titles) ────────────────────────────────
  separatorColor: '#004673',
  separatorThickness: '0.4pt',
  separatorMarginTop: '0.8mm',
  separatorMarginBottom: '1.5mm',

  // ─── Colors ───────────────────────────────────────────────────────────────
  geberitBlue: '#004673',
  perfectFitBlue: '#B4CDF0',  // "THE PERFECT FIT" tagline color
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
