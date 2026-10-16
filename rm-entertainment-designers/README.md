# R & M Entertainment Designers: website

Static site (HTML, CSS, JavaScript). No build step.

## Structure
```
index.html                      Home
about/  founders/  our-work/  contact/
experiences/                    Overview
experiences/<service>/          7 service pages (sangeet-entry, varmala-entry, haldi-entry,
                                choreography, special-artists, virtual-sessions, technical-rehearsals)
owner-checklist/                Launch checklist (noindex)
assets/css/style.css            Styles
assets/js/main.js               Behaviour, form, contact details (FORM_ENDPOINT, RM_CONTACT)
assets/js/manifest.js           Videos, hero, founders: the file you edit most
media/<section>/videos|posters|images   One folder per section, README inside each
```
Sections with media folders: home, about, founders, behind-the-scenes and each of the seven services.

## Add a video
1. Copy `video-1.mp4` into `media/<section>/videos/` and a poster into `media/<section>/posters/`.
2. In `assets/js/manifest.js`, set `src` and `poster` for that slot, e.g. `"media/sangeet-entry/videos/video-1.mp4"`.
Each section has six slots. Empty slots show a "coming soon" placeholder.

## Founders
Edit the `founders` list in `assets/js/manifest.js` (name, role, bio, photo).

## Enquiry form
Set `FORM_ENDPOINT` in `assets/js/main.js` (for example a Formspree URL). Until then the form says plainly that nothing was sent.

## Publish on GitHub Pages
1. Create a repository and upload the contents of this folder to the root.
2. Settings > Pages > Deploy from branch > `main` / root.
3. Replace `YOUR-DOMAIN` in `sitemap.xml` and `robots.txt`.
