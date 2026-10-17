# Sangeet Entry: video upload guide

Upload **six videos** into this folder, one per slot below. `video-6.mp4` was edited to remove another company's branding: cropped to 1148x588 (bottom text strip and top-right logo) and trimmed before its end card. Re-check if the source is replaced.

| Slot | File name | What to upload | Poster image | Done |
|------|-----------|----------------|--------------|------|
| 1 | `video-1.mp4` | Couple grand entry (full clip) | `posters/video-1.jpg` | [x] |
| 2 | `video-2.mp4` | Family and friends entrance | `posters/video-2.jpg` | [x] |
| 3 | `video-3.mp4` | Story-led or theme-led choreography | `posters/video-3.jpg` | [x] |
| 4 | `video-4.mp4` | Ensemble formations | `posters/video-4.jpg` | [x] |
| 5 | `video-5.mp4` | Rehearsal clip | `posters/video-5.jpg` | [x] |
| 6 | `video-6.mp4` | Short teaser, 15 to 30 seconds | `posters/video-6.jpg` | [x] |

## Video requirements
- Format: MP4 (H.264 video, AAC audio)
- Shape: landscape 16:9, 1080p at most
- Size: aim for under 25 MB each so phones load quickly
- Name: exactly `video-1.mp4` to `video-6.mp4`
- Poster image (first frame or best still): `posters/video-1.jpg` to `posters/video-6.jpg`
- Only genuine R & M footage. Never competitor or stock performances.
- Keep original full-quality files outside this repository.

## After uploading
1. Open `assets/data/media-manifest.js`.
2. Find `"sangeet-entry"` under `sections`.
3. Change `"live": false` to `"live": true` for each slot you uploaded.

Slots left on `false` show a tidy "coming soon" tile on the website.
