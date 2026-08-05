Place your website logo image into `public/images/` (for example `public/images/logo.png`).

Generate the following favicon files (tools: https://realfavicongenerator.net or ImageMagick/Sharp):

- `favicon.ico` (multi-size ICO)
- `favicon-32x32.png`
- `favicon-16x16.png`
- `favicon-192x192.png`
- `favicon-512x512.png`
- `apple-touch-icon.png`
- `favicon.svg` (optional vector)

Recommended ImageMagick commands:

```
magick convert public/images/logo.png -resize 16x16 favicon-16x16.png
magick convert public/images/logo.png -resize 32x32 favicon-32x32.png
magick convert public/images/logo.png -resize 192x192 favicon-192x192.png
magick convert public/images/logo.png -resize 512x512 favicon-512x512.png
magick convert public/images/logo.png -resize 180x180 apple-touch-icon.png
magick convert public/images/logo.png -define icon:auto-resize=64,48,32,16 favicon.ico
```

After placing the files in `public/`, the browser will pick them up at the root (`/favicon.ico`, `/favicon-32x32.png`, etc.). The `index.html` already references these files.

If you'd like, I can generate a simple `favicon.svg` from a provided SVG source or help you create the PNG/ICO assets if you upload the logo file here.
