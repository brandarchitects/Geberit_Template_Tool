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
  // Positioned top-right per spec: 10 mm from top, 15 mm from right
  logoTop: '10mm',
  logoRight: '15mm',
  logoWidth: '38mm',

  // ─── Taglines (bottom-left of hero) ──────────────────────────────────────
  // Spec: left 15 mm · font 40 pt · leading 45 pt
  taglineLeft: '15mm',
  taglineBottom: '10mm',
  taglineFontSize: '40pt',
  taglineLineHeight: '45pt',     // exact spec: 45 pt leading

  // ─── Content section (below hero) ────────────────────────────────────────
  // Spec: 30 mm left margin, 30 mm right margin, 10 mm column gap
  contentPaddingTop: '10mm',
  contentPaddingBottom: '10mm',
  contentPaddingLeft: '30mm',
  contentPaddingRight: '30mm',
  columnGap: '10mm',

  // ─── Typography ──────────────────────────────────────────────────────────
  // Single font-family name — weights select the correct file via @font-face
  fontFamily: "'AktivGroteskGeberit', Arial, sans-serif",

  // Spec: "We are looking for" — Light, 11pt
  lookingForSize: '11pt',
  lookingForWeight: 300,

  // Job title ("Electrical Engineer FH") — Bold, ~13 pt
  jobTitleSize: '13pt',
  jobTitleWeight: 700,

  // Section titles ("ABOUT GEBERIT" etc.) — Bold, uppercase, blue/black
  sectionTitleSize: '8pt',
  sectionTitleWeight: 700,

  // Spec: Body copy — Regular, 8.5 pt, leading 11 pt
  bodySize: '8.5pt',
  bodyWeight: 400,
  bodyLineHeight: '11pt',        // exact spec: 11 pt leading

  // Bullet points — same as body
  bulletSize: '8.5pt',
  bulletWeight: 400,
  bulletLineHeight: '11pt',      // exact spec: 11 pt leading

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
    'Geberit_Ad_01', 'Geberit_Ad_02', 'Geberit_Ad_03', 'Geberit_Ad_04',
    'Geberit_Ad_05', 'Geberit_Ad_06', 'Geberit_Ad_07', 'Geberit_Ad_08',
    'Geberit_Ad_09', 'Geberit_Ad_10', 'Geberit_Ad_11', 'Geberit_Ad_12',
    'Geberit_Ad_13', 'Geberit_Ad_14', 'Geberit_Ad_15', 'Geberit_Ad_16',
  ] as string[],

  defaultBackgroundId: 'Geberit_Ad_01',

  // ─── Font file names (used by pdfRenderer for base64 embedding) ───────────
  fonts: {
    bold:    { woff2: 'AktivGroteskGeberit_W_Bd.woff2',   ttf: 'AktivGroteskGeberit_Bd.ttf'   },
    regular: { woff2: 'AktivGroteskGeberit_W_Rg.woff2',   ttf: 'AktivGroteskGeberit_Rg.ttf'   },
    light:   { woff2: 'AktivGroteskGeberit_W_Lt.woff2',   ttf: 'AktivGroteskGeberit_Lt.ttf'   },
    medium:  { woff2: 'AktivGroteskGeberit_W_Md.woff2',   ttf: 'AktivGroteskGeberit_Md.ttf'   },
  },
};
