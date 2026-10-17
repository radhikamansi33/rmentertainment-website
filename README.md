# R & M Entertainment Designers: website

A static website (HTML, CSS, JavaScript). No build step and no dependencies.

## Folder structure
```
index.html                 Home
about/  founders/  our-work/  contact/
experiences/               Overview
experiences/<service>/     Eight service pages
owner-checklist/           Launch checklist (hidden from search)
404.html  sitemap.xml  robots.txt

assets/
  css/        base, layout, components, sections, motion
  js/         config, utils, header, media, founders, enquiry, reveal, main
  data/       media-manifest.js   <- the file you edit most
  images/
    logo/       upload logo.png / logo.jpg / logo.jpeg
    hero/       hero image
    founders/   founder photos
    gallery/    photographs
  videos/
    README.md   index of every upload guide
    <section>/  UPLOAD-GUIDE.md + six videos + posters/
```
Video sections: home, about, founders, behind-the-scenes, sangeet-entry, varmala-entry, haldi-entry,
choreography, special-artists, virtual-sessions, technical-rehearsals.

## Quick start
1. **Logo**: upload `assets/images/logo/logo.png` (or `.jpg` / `.jpeg`).
2. **Videos**: open `assets/videos/README.md`, follow each section's `UPLOAD-GUIDE.md`, then set `"live": true` in `assets/data/media-manifest.js`.
3. **Founders**: fill in the `founders` list in `assets/data/media-manifest.js`.
4. **Enquiry form and contact details**: edit `assets/js/config.js`.
5. **Domain**: replace `YOUR-DOMAIN` in `sitemap.xml` and `robots.txt`.

## Publish on GitHub Pages
1. Create a repository and upload the contents of this folder to the root.
2. Settings > Pages > Deploy from a branch > `main` / `(root)`.
3. Open `/owner-checklist/` for the remaining launch items.
