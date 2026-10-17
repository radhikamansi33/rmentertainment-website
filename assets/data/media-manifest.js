/*
 * MEDIA MANIFEST  (the file you edit most)
 *
 * VIDEOS: upload files following assets/videos/<section>/UPLOAD-GUIDE.md,
 *         then change "live": false to "live": true for that slot.
 *         Paths are built automatically:
 *           assets/videos/<section>/video-N.mp4
 *           assets/videos/<section>/posters/video-N.jpg
 *
 * HERO:   type "image" (photo beside the home text, shown whole, src = assets/images/hero/poster.jpg),
 *         type "cover" (full-width banner above the home text) or
 *         type "video" (src = assets/videos/home/hero.mp4, poster optional).
 *
 * FOUNDERS: fill in name, role, bio, and photo path
 *         (e.g. assets/images/founders/founder-1.jpg). Leave empty until confirmed.
 *
 * PHOTOS: put photographs in assets/images/gallery/ and list each one in "photos"
 *         (e.g. {"src": "assets/images/gallery/photo-1.jpg", "alt": "Varmala entry",
 *         "section": "varmala-entry"}). All photos appear on Our Work; "section" also
 *         shows the photo on that experience page. Every live video appears on Our Work too.
 */
window.RM_MEDIA = {
  "hero": {
    "type": "image",
    "src": "assets/images/hero/poster.jpg",
    "alt": "R & M Entertainment: aerial artists, live band and dancers on a lit stage. Dream, design, deliver.",
    "poster": ""
  },
  "founders": [
    {
      "name": "Radhika Sharma",
      "role": "Professional dancer",
      "bio": "",
      "photo": "assets/images/founders/founder-1.jpg"
    },
    {
      "name": "Mansi Rawat",
      "role": "Professional dancer",
      "bio": "",
      "photo": "assets/images/founders/founder-2.jpg"
    }
  ],
  "photos": [
    {"src": "assets/images/gallery/special-artists-01.jpg", "alt": "Lion dance performers at a celebration", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-02.jpg", "alt": "Western-themed welcome artists", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-03.jpg", "alt": "Welcome artists in pink ruffled gowns", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-04.jpg", "alt": "Cowboy-themed artists greeting guests", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-05.jpg", "alt": "Floral costume artists", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-06.jpg", "alt": "Royal-themed costume artists", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-07.jpg", "alt": "Carnival feather costume performers", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-08.jpg", "alt": "Punjabi folk performers in colourful turbans", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-09.jpg", "alt": "Statue-style artist in a teal tulle gown", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-10.jpg", "alt": "Performers in red feathered costumes", "section": "special-artists"},
    {"src": "assets/images/gallery/special-artists-11.jpg", "alt": "Jester-themed costume performers", "section": "special-artists"}
  ],
  "sections": {
    "home": [
      {
        "title": "Video 1",
        "live": false
      },
      {
        "title": "Video 2",
        "live": false
      },
      {
        "title": "Video 3",
        "live": false
      },
      {
        "title": "Video 4",
        "live": false
      },
      {
        "title": "Video 5",
        "live": false
      },
      {
        "title": "Video 6",
        "live": false
      }
    ],
    "about": [
      {
        "title": "Video 1",
        "live": false
      },
      {
        "title": "Video 2",
        "live": false
      },
      {
        "title": "Video 3",
        "live": false
      },
      {
        "title": "Video 4",
        "live": false
      },
      {
        "title": "Video 5",
        "live": false
      },
      {
        "title": "Video 6",
        "live": false
      }
    ],
    "founders": [
      {
        "title": "Video 1",
        "live": false
      },
      {
        "title": "Video 2",
        "live": false
      },
      {
        "title": "Video 3",
        "live": false
      },
      {
        "title": "Video 4",
        "live": false
      },
      {
        "title": "Video 5",
        "live": false
      },
      {
        "title": "Video 6",
        "live": false
      }
    ],
    "behind-the-scenes": [
      {
        "title": "Video 1",
        "live": false
      },
      {
        "title": "Video 2",
        "live": false
      },
      {
        "title": "Video 3",
        "live": false
      },
      {
        "title": "Video 4",
        "live": false
      },
      {
        "title": "Video 5",
        "live": false
      },
      {
        "title": "Video 6",
        "live": false
      }
    ],
    "sangeet-entry": [
      {
        "title": "Video 1",
        "live": true
      },
      {
        "title": "Video 2",
        "live": true
      },
      {
        "title": "Video 3",
        "live": true
      },
      {
        "title": "Video 4",
        "live": true
      },
      {
        "title": "Video 5",
        "live": true
      },
      {
        "title": "Video 6",
        "live": true
      }
    ],
    "varmala-entry": [
      {
        "title": "Video 1",
        "live": true
      },
      {
        "title": "Video 2",
        "live": true
      },
      {
        "title": "Video 3",
        "live": true
      },
      {
        "title": "Video 4",
        "live": true
      },
      {
        "title": "Video 5",
        "live": true
      },
      {
        "title": "Video 6",
        "live": true
      }
    ],
    "haldi-entry": [
      {
        "title": "Video 1",
        "live": false
      },
      {
        "title": "Video 2",
        "live": false
      },
      {
        "title": "Video 3",
        "live": false
      },
      {
        "title": "Video 4",
        "live": false
      },
      {
        "title": "Video 5",
        "live": false
      },
      {
        "title": "Video 6",
        "live": false
      }
    ],
    "choreography": [
      {
        "title": "Video 1",
        "live": true
      },
      {
        "title": "Video 2",
        "live": true
      },
      {
        "title": "Video 3",
        "live": true
      },
      {
        "title": "Video 4",
        "live": true
      },
      {
        "title": "Video 5",
        "live": true
      },
      {
        "title": "Video 6",
        "live": true
      }
    ],
    "special-artists": [
      {
        "title": "Video 1",
        "live": true
      },
      {
        "title": "Video 2",
        "live": true
      },
      {
        "title": "Video 3",
        "live": true
      }
    ],
    "virtual-sessions": [
      {
        "title": "Video 1",
        "live": true
      },
      {
        "title": "Video 2",
        "live": true
      },
      {
        "title": "Video 3",
        "live": true
      },
      {
        "title": "Video 4",
        "live": true
      }
    ],
    "technical-rehearsals": [
      {
        "title": "Video 1",
        "live": true
      },
      {
        "title": "Video 2",
        "live": true
      },
      {
        "title": "Video 3",
        "live": true
      },
      {
        "title": "Video 4",
        "live": true
      },
      {
        "title": "Video 5",
        "live": true
      },
      {
        "title": "Video 6",
        "live": true
      }
    ],
    "rehearsals": [
      {
        "title": "Video 1",
        "live": true
      },
      {
        "title": "Video 2",
        "live": true
      },
      {
        "title": "Video 3",
        "live": true
      },
      {
        "title": "Video 4",
        "live": true
      },
      {
        "title": "Video 5",
        "live": true
      },
      {
        "title": "Video 6",
        "live": true
      }
    ]
  }
};
