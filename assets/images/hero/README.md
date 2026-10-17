# Hero image

The home page shows `poster.jpg` beside the headline, whole and uncropped, at its own shape. It is set in `assets/data/media-manifest.js`:

```js
hero: { type: "image", src: "assets/images/hero/poster.jpg", alt: "Short description" }
```

- Use at least 1000 px wide so it stays sharp on high-resolution screens.
- `type: "cover"` shows the image as a full-width banner above the headline instead.
