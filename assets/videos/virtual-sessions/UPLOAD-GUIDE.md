# Virtual Sessions: video upload guide

This section shows **four videos**, one per slot below. To add more, add a slot for each in `assets/data/media-manifest.js`.

| Slot | File name | What to upload | Poster image | Done |
|------|-----------|----------------|--------------|------|
| 1 | `video-1.mp4` | Online session sample | `posters/video-1.jpg` | [x] |
| 2 | `video-2.mp4` | Choreography breakdown | `posters/video-2.jpg` | [x] |
| 3 | `video-3.mp4` | Family practice call | `posters/video-3.jpg` | [x] |
| 4 | `video-4.mp4` | Client feedback | `posters/video-4.jpg` | [x] |

## Video requirements
- Format: MP4 (H.264 video, AAC audio)
- Shape: landscape 16:9, 1080p at most
- Size: aim for under 25 MB each so phones load quickly
- Name: exactly `video-1.mp4` to `video-4.mp4`
- Poster image (first frame or best still): `posters/video-1.jpg` to `posters/video-4.jpg`
- Only genuine R & M footage. Never competitor or stock performances.
- Keep original full-quality files outside this repository.

## After uploading
1. Open `assets/data/media-manifest.js`.
2. Find `"virtual-sessions"` under `sections`.
3. Change `"live": false` to `"live": true` for each slot you uploaded.

Slots left on `false` show a tidy "coming soon" tile on the website.
