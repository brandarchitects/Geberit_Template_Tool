# Geberit Template Tool

A web-based editor for Geberit print templates. Fill in text, choose a background image, and export a print-ready A4 PDF with embedded fonts.

## Features

- **WYSIWYG A4 preview** — live preview scales to fit your screen
- **Collapsible sidebar** — edit all text fields, bullet lists, and background
- **Background image picker** — 6 predefined images + custom upload
- **Gradient overlay** — adjustable opacity slider
- **PDF export** — print-ready A4, embedded fonts, no crop marks
- **JSON export / import** — save your work and re-open it later
- **Password-protected** — simple shared password via environment variable
- **Extendable** — add new templates via the template registry

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file and set password
cp .env.example .env.local
# → edit .env.local and set EDITOR_PASSWORD=your_password

# 3. Add assets (see below)

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the login page.

---

## Adding Assets

### Fonts (required for correct typography)
Place Aktiv Grotesk font files in `public/fonts/`:
```
AktivGrotesk-Bold.woff2 / .ttf
AktivGrotesk-Regular.woff2 / .ttf
AktivGrotesk-Light.woff2 / .ttf
```

### Logo
```
public/images/Logo_Geberit_white_transparent.png   (520 × 79 px)
```

### Background images
```
public/images/backgrounds/Geberit_Ad_01.jpg   ← shown by default
public/images/backgrounds/Geberit_Ad_02.jpg
...
public/images/backgrounds/Geberit_Ad_06.jpg
```
Minimum size: **2000 × 1334 px**, JPEG, 300 dpi.

To add more images: add the file and register the ID in `src/components/templates/geberit-ad-01/constants.ts` → `C.backgroundImages`.

---

## Adjusting Layout Measurements

All layout constants (margins, font sizes, logo position, etc.) are in one file:
```
src/components/templates/geberit-ad-01/constants.ts
```
Adjust values there to match the exact print specification once the annotated design files are available.

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Set environment variables in Vercel project settings:
   - `EDITOR_PASSWORD` — the shared access password
   - `NEXT_PUBLIC_APP_URL` — your Vercel deployment URL (e.g. `https://your-app.vercel.app`)
4. Deploy

PDF generation uses Puppeteer with `@sparticuz/chromium` (optimised for Vercel Serverless).

---

## Adding a New Template

1. Create `src/components/templates/your-template-id/` with:
   - `constants.ts` — layout constants
   - `defaultData.ts` — placeholder text
   - `Template.tsx` — React render component
2. Register in `src/lib/templateRegistry.ts`
3. Access via `/editor?template=your-template-id`
