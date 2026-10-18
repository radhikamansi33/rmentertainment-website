# Video uploads

One folder per website section. Each folder has an `UPLOAD-GUIDE.md` that says exactly which six videos to upload.

| Section | Folder | Videos |
|---------|--------|--------|
| Home page | [`assets/videos/home/`](home/UPLOAD-GUIDE.md) | 6 |
| About page | [`assets/videos/about/`](about/UPLOAD-GUIDE.md) | 6 |
| Founders page | [`assets/videos/founders/`](founders/UPLOAD-GUIDE.md) | 6 |
| Behind the Scenes | [`assets/videos/behind-the-scenes/`](behind-the-scenes/UPLOAD-GUIDE.md) | 6 |
| Sangeet Entry | [`assets/videos/sangeet-entry/`](sangeet-entry/UPLOAD-GUIDE.md) | 6 |
| Varmala Entry | [`assets/videos/varmala-entry/`](varmala-entry/UPLOAD-GUIDE.md) | 7 |
| Haldi & Mehndi Entry | [`assets/videos/haldi-entry/`](haldi-entry/UPLOAD-GUIDE.md) | 6 |
| Choreography | [`assets/videos/choreography/`](choreography/UPLOAD-GUIDE.md) | 7 |
| Special Artists | [`assets/videos/special-artists/`](special-artists/UPLOAD-GUIDE.md) | 3 |
| Virtual Sessions | [`assets/videos/virtual-sessions/`](virtual-sessions/UPLOAD-GUIDE.md) | 3 |
| Technical Rehearsals | [`assets/videos/technical-rehearsals/`](technical-rehearsals/UPLOAD-GUIDE.md) | 10 |
| Rehearsals | [`assets/videos/rehearsals/`](rehearsals/UPLOAD-GUIDE.md) | 6 |
| Client Feedback | [`assets/videos/client-feedback/`](client-feedback/UPLOAD-GUIDE.md) | 4 |

**Total: 76 videos** (the number per section is in the table above).

## Video requirements
- Format: MP4 (H.264 video, AAC audio)
- Shape: landscape 16:9, 1080p at most
- Size: aim for under 25 MB each so phones load quickly
- Name: exactly `video-1.mp4` to `video-6.mp4`
- Poster image (first frame or best still): `posters/video-1.jpg` to `posters/video-6.jpg`
- Only genuine R & M footage. Never competitor or stock performances.
- Keep original full-quality files outside this repository.

## Workflow
1. Open the section's `UPLOAD-GUIDE.md`.
2. Add the videos and posters with the exact file names.
3. Set `"live": true` for each slot in `assets/data/media-manifest.js`.
