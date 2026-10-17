# Gallery photographs

Upload real photographs here. Use portrait orientation where the photo is portrait; do not force wide crops.

To show a photo on the Our Work page, add it to `"photos"` in `assets/data/media-manifest.js`:

```js
"photos": [
  {"src": "assets/images/gallery/photo-1.jpg", "alt": "Couple arrival at a varmala entry", "section": "varmala-entry"}
],
```

- JPG, about 1600 px on the long side, under 500 KB each
- `alt` is a short description for screen readers
- `section` (optional) also shows the photo on that experience page, e.g. `special-artists`
- Every photo appears on Our Work
- A photo section stays hidden until it has at least one photo
