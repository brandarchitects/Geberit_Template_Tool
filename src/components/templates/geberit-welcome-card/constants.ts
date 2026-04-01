/**
 * Geberit Welcome Card — Layout Constants
 *
 * Format: JIS B5 Landscape  257 × 182 mm
 * Full-bleed photo with gradient overlay and text overlay.
 */

export const WC = {
  // ─── Page ──────────────────────────────────────────────────────────────────
  pageWidth:  '257mm',
  pageHeight: '182mm',

  // ─── Geberit Logo ───────────────────────────────────────────────────────────
  logoTop:   '14mm',
  logoRight: '18mm',
  logoWidth: '48mm',

  // ─── Text content block (anchored bottom-left) ──────────────────────────────
  contentLeft:     '20mm',
  contentBottom:   '20mm',
  contentMaxWidth: '160mm',

  // ─── Taglines ───────────────────────────────────────────────────────────────
  taglineFontSize:   '36pt',
  taglineLineHeight: '41.5pt',

  // ─── Body text ──────────────────────────────────────────────────────────────
  bodySize:        '17pt',
  bodyLineHeight:  '21pt',
  bodyMarginTop:   '6mm',
  signoffMarginTop: '5mm',

  // ─── Colors ─────────────────────────────────────────────────────────────────
  geberitBlue:  '#004673',
  perfectFitBlue: '#B4CDF0',
  white: '#ffffff',

  // ─── Font ───────────────────────────────────────────────────────────────────
  fontFamily: "'AktivGroteskGeberit', Arial, sans-serif",

  // ─── Available background images (shared with Ad01) ─────────────────────────
  backgroundImages: [
    'Geberit_Ad_01',
    'Geberit_Ad_02',
    'Geberit_Ad_03',
    'Geberit_Ad_04',
    'Geberit_Ad_05',
    'Geberit_Ad_06',
  ] as string[],

  defaultBackgroundId: 'Geberit_Ad_01',

  // ─── Font file names ─────────────────────────────────────────────────────────
  fonts: {
    bold:    { woff2: 'AktivGroteskGeberit_W_Bd.woff2',   ttf: 'AktivGroteskGeberit_Bd.ttf'   },
    regular: { woff2: 'AktivGroteskGeberit_W_Rg.woff2',   ttf: 'AktivGroteskGeberit_Rg.ttf'   },
    light:   { woff2: 'AktivGroteskGeberit_W_Lt.woff2',   ttf: 'AktivGroteskGeberit_Lt.ttf'   },
    medium:  { woff2: 'AktivGroteskGeberit_W_Md.woff2',   ttf: 'AktivGroteskGeberit_Md.ttf'   },
  },
};
