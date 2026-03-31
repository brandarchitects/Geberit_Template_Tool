# Images

## Logo
Place the Geberit logo here:
```
Logo_Geberit_white_transparent.png   (520 × 79 px, PNG with transparency)
```

## Background images
Place background images in the `backgrounds/` subfolder:
```
backgrounds/Geberit_Ad_01.jpg   ← default image
backgrounds/Geberit_Ad_02.jpg
backgrounds/Geberit_Ad_03.jpg
backgrounds/Geberit_Ad_04.jpg
backgrounds/Geberit_Ad_05.jpg
backgrounds/Geberit_Ad_06.jpg
```

### Requirements
- Format: JPEG
- Dimensions: 2000 × 1334 px minimum (3:2 ratio)
- Resolution: 300 dpi or higher (for print-quality PDF export)

### Adding more background images
1. Add the file to `public/images/backgrounds/` following the naming convention `Geberit_Ad_XX.jpg`
2. Register the image ID in `src/components/templates/geberit-ad-01/constants.ts` → `C.backgroundImages` array
