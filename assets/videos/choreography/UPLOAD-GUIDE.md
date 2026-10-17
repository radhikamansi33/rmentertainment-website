# Choreography: video upload guide

Upload **six videos** into this folder, one per slot below.

| Slot | File name | What to upload | Poster image | Done |
|------|-----------|----------------|--------------|------|
| 1 | `video-1.mp4` | Couple dance | `posters/video-1.jpg` | [ ] |
| 2 | `video-2.mp4` | Bride or groom solo | `posters/video-2.jpg` | [ ] |
| 3 | `video-3.mp4` | Family performance | `posters/video-3.jpg` | [ ] |
| 4 | `video-4.mp4` | Storytelling sequence | `posters/video-4.jpg` | [ ] |
| 5 | `video-5.mp4` | Group formations and transitions | `posters/video-5.jpg` | [ ] |
| 6 | `video-6.mp4` | Beginner-friendly rehearsal session | `posters/video-6.jpg` | [ ] |

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
2. Find `"choreography"` under `sections`.
3. Change `"live": false` to `"live": true` for each slot you uploaded.

Slots left on `false` show a tidy "coming soon" tile on the website.
