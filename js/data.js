/* Orange Bird — mock data. No backend, no persistence (sessionStorage only for demo actions). */

const USERS = [
  {
    "id": 1,
    "name": "AI Art Man",
    "handle": "aiartman",
    "avatar": "assets/logo orange bird.png",
    "bio": "Daily AI art drops. Prompt tinkerer. Building strange little worlds.",
    "location": "The Grid",
    "site": "aiartman.art",
    "followers": 12400,
    "following": 312,
    "verified": true,
    "joined": "March 2021",
    "accent": "#FF7A00"
  },
  {
    "id": 2,
    "name": "Celistima",
    "handle": "celistima",
    "avatar": "assets/logo orange bird.png",
    "bio": "Art curator. I collect quiet, beautiful things and write about them.",
    "location": "Lisbon",
    "site": "celistima.gallery",
    "followers": 8930,
    "following": 481,
    "verified": true,
    "joined": "July 2020",
    "accent": "#9B51E0"
  },
  {
    "id": 3,
    "name": "Fantasy AI",
    "handle": "fantasy_ai_author",
    "avatar": "assets/logo orange bird.png",
    "bio": "Epic fantasy worlds, one prompt at a time. Dragons welcome.",
    "location": "Aetheria",
    "site": "fantasyai.world",
    "followers": 21700,
    "following": 204,
    "verified": true,
    "joined": "January 2020",
    "accent": "#EB5757"
  },
  {
    "id": 4,
    "name": "Lofi Promt",
    "handle": "lofipromt",
    "avatar": "assets/logo orange bird.png",
    "bio": "Chill prompts and softer palettes. Press play, then create.",
    "location": "Osaka",
    "site": "lofipromt.fm",
    "followers": 6410,
    "following": 389,
    "verified": false,
    "joined": "September 2021",
    "accent": "#2D9CDB"
  },
  {
    "id": 5,
    "name": "Maxvoao",
    "handle": "maxvoao",
    "avatar": "assets/logo orange bird.png",
    "bio": "Marketplace artist. Premium prompts, fair prices, no gatekeeping.",
    "location": "Berlin",
    "site": "maxvoao.studio",
    "followers": 15800,
    "following": 512,
    "verified": true,
    "joined": "May 2019",
    "accent": "#27AE60"
  },
  {
    "id": 6,
    "name": "Raj",
    "handle": "raj",
    "avatar": "assets/logo orange bird.png",
    "bio": "Creator on Orange Bird. Learning in public, collecting good art. 🐦🧡",
    "location": "India",
    "site": "",
    "followers": 128,
    "following": 94,
    "verified": false,
    "joined": "November 2026",
    "accent": "#1DA1F2",
    "isMe": true
  }
];

const IMAGES = [
  {
    "id": 1,
    "file": "aiartman__14050821_134814396.jpg",
    "path": "assets/images/aiartman__14050821_134814396.jpg",
    "title": "Neon Dreamscape",
    "category": "aiart",
    "author": "aiartman",
    "userId": 1,
    "prompt": "ultra-detailed AI artwork, neon lighting, cinematic composition, 8k",
    "tags": "#AIArt #DigitalArt"
  },
  {
    "id": 2,
    "file": "aiartman__14050821_134814772.jpg",
    "path": "assets/images/aiartman__14050821_134814772.jpg",
    "title": "Chrome Horizon",
    "category": "aiart",
    "author": "aiartman",
    "userId": 1,
    "prompt": "ultra-detailed AI artwork, neon lighting, cinematic composition, 8k",
    "tags": "#AIArt #DigitalArt"
  },
  {
    "id": 3,
    "file": "aiartman__14050821_134815272.jpg",
    "path": "assets/images/aiartman__14050821_134815272.jpg",
    "title": "Electric Bloom",
    "category": "aiart",
    "author": "aiartman",
    "userId": 1,
    "prompt": "ultra-detailed AI artwork, neon lighting, cinematic composition, 8k",
    "tags": "#AIArt #DigitalArt"
  },
  {
    "id": 4,
    "file": "aiartman__14050821_134815772.jpg",
    "path": "assets/images/aiartman__14050821_134815772.jpg",
    "title": "Midnight Circuit",
    "category": "aiart",
    "author": "aiartman",
    "userId": 1,
    "prompt": "ultra-detailed AI artwork, neon lighting, cinematic composition, 8k",
    "tags": "#AIArt #DigitalArt"
  },
  {
    "id": 5,
    "file": "aiartman__14050821_134816272.jpg",
    "path": "assets/images/aiartman__14050821_134816272.jpg",
    "title": "Solar Drift",
    "category": "aiart",
    "author": "aiartman",
    "userId": 1,
    "prompt": "ultra-detailed AI artwork, neon lighting, cinematic composition, 8k",
    "tags": "#AIArt #DigitalArt"
  },
  {
    "id": 6,
    "file": "aiartman__14050821_134816771.jpg",
    "path": "assets/images/aiartman__14050821_134816771.jpg",
    "title": "Glass Garden",
    "category": "aiart",
    "author": "aiartman",
    "userId": 1,
    "prompt": "ultra-detailed AI artwork, neon lighting, cinematic composition, 8k",
    "tags": "#AIArt #DigitalArt"
  },
  {
    "id": 7,
    "file": "aiartman__14050821_134817271.jpg",
    "path": "assets/images/aiartman__14050821_134817271.jpg",
    "title": "Signal Lost",
    "category": "aiart",
    "author": "aiartman",
    "userId": 1,
    "prompt": "ultra-detailed AI artwork, neon lighting, cinematic composition, 8k",
    "tags": "#AIArt #DigitalArt"
  },
  {
    "id": 8,
    "file": "fantasy_ai_author_14050821_125310522.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125310522.jpg",
    "title": "The Ember Throne",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 9,
    "file": "fantasy_ai_author_14050821_125310925.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125310925.jpg",
    "title": "Dragons of the Pale Moon",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 10,
    "file": "fantasy_ai_author_14050821_125311473.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125311473.jpg",
    "title": "Ruins of Aetheria",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 11,
    "file": "fantasy_ai_author_14050821_125311923.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125311923.jpg",
    "title": "The Last Skyward City",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 12,
    "file": "fantasy_ai_author_14050821_125312422.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125312422.jpg",
    "title": "Whispering Forest",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 13,
    "file": "fantasy_ai_author_14050821_125312922.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125312922.jpg",
    "title": "Crown of Ash",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 14,
    "file": "fantasy_ai_author_14050821_125313423.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125313423.jpg",
    "title": "The Wandering Mage",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 15,
    "file": "fantasy_ai_author_14050821_125313923.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125313923.jpg",
    "title": "Valley of Fallen Stars",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 16,
    "file": "fantasy_ai_author_14050821_125314423.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125314423.jpg",
    "title": "The Obsidian Gate",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 17,
    "file": "fantasy_ai_author_14050821_125314926.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125314926.jpg",
    "title": "Songs of the Deep",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 18,
    "file": "fantasy_ai_author_14050821_125315565.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125315565.jpg",
    "title": "The Gilded Griffin",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 19,
    "file": "fantasy_ai_author_14050821_125315926.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125315926.jpg",
    "title": "Winterhold Keep",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 20,
    "file": "fantasy_ai_author_14050821_125316430.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125316430.jpg",
    "title": "The Shattered Crown",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 21,
    "file": "fantasy_ai_author_14050821_125316926.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125316926.jpg",
    "title": "Lanterns of Elarion",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 22,
    "file": "fantasy_ai_author_14050821_125317431.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125317431.jpg",
    "title": "The Sea Serpent's Oath",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 23,
    "file": "fantasy_ai_author_14050821_125317933.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125317933.jpg",
    "title": "Throne of Thorns",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 24,
    "file": "fantasy_ai_author_14050821_125318431.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125318431.jpg",
    "title": "The Lunar Oracle",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 25,
    "file": "fantasy_ai_author_14050821_125318934.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125318934.jpg",
    "title": "Ashes of the Old Kingdom",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 26,
    "file": "fantasy_ai_author_14050821_125319435.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125319435.jpg",
    "title": "The Crystal Pass",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 27,
    "file": "fantasy_ai_author_14050821_125319931.jpg",
    "path": "assets/images/fantasy_ai_author_14050821_125319931.jpg",
    "title": "Where the Sky Ends",
    "category": "fantasy",
    "author": "fantasy_ai_author",
    "userId": 3,
    "prompt": "epic fantasy concept art, dramatic lighting, highly detailed, matte painting",
    "tags": "#Fantasy #AIArt"
  },
  {
    "id": 28,
    "file": "lofipromt_14050821_125822454.jpg",
    "path": "assets/images/lofipromt_14050821_125822454.jpg",
    "title": "Rainy Window Study",
    "category": "lofi",
    "author": "lofipromt",
    "userId": 4,
    "prompt": "lofi aesthetic illustration, soft grain, muted palette, cozy atmosphere",
    "tags": "#LofiPrompts #Lofi"
  },
  {
    "id": 29,
    "file": "lofipromt_14050821_125822883.jpg",
    "path": "assets/images/lofipromt_14050821_125822883.jpg",
    "title": "Midnight Train",
    "category": "lofi",
    "author": "lofipromt",
    "userId": 4,
    "prompt": "lofi aesthetic illustration, soft grain, muted palette, cozy atmosphere",
    "tags": "#LofiPrompts #Lofi"
  },
  {
    "id": 30,
    "file": "lofipromt_14050821_125823384.jpg",
    "path": "assets/images/lofipromt_14050821_125823384.jpg",
    "title": "Coffee & Cassettes",
    "category": "lofi",
    "author": "lofipromt",
    "userId": 4,
    "prompt": "lofi aesthetic illustration, soft grain, muted palette, cozy atmosphere",
    "tags": "#LofiPrompts #Lofi"
  },
  {
    "id": 31,
    "file": "lofipromt_14050821_125823886.jpg",
    "path": "assets/images/lofipromt_14050821_125823886.jpg",
    "title": "Rooftop at Dusk",
    "category": "lofi",
    "author": "lofipromt",
    "userId": 4,
    "prompt": "lofi aesthetic illustration, soft grain, muted palette, cozy atmosphere",
    "tags": "#LofiPrompts #Lofi"
  },
  {
    "id": 32,
    "file": "lofipromt_14050821_125824388.jpg",
    "path": "assets/images/lofipromt_14050821_125824388.jpg",
    "title": "Snowfall in Kyoto",
    "category": "lofi",
    "author": "lofipromt",
    "userId": 4,
    "prompt": "lofi aesthetic illustration, soft grain, muted palette, cozy atmosphere",
    "tags": "#LofiPrompts #Lofi"
  },
  {
    "id": 33,
    "file": "lofipromt_14050821_125824887.jpg",
    "path": "assets/images/lofipromt_14050821_125824887.jpg",
    "title": "The Quiet Library",
    "category": "lofi",
    "author": "lofipromt",
    "userId": 4,
    "prompt": "lofi aesthetic illustration, soft grain, muted palette, cozy atmosphere",
    "tags": "#LofiPrompts #Lofi"
  },
  {
    "id": 34,
    "file": "lofipromt_14050821_125825386.jpg",
    "path": "assets/images/lofipromt_14050821_125825386.jpg",
    "title": "Neon Alley Walk",
    "category": "lofi",
    "author": "lofipromt",
    "userId": 4,
    "prompt": "lofi aesthetic illustration, soft grain, muted palette, cozy atmosphere",
    "tags": "#LofiPrompts #Lofi"
  },
  {
    "id": 35,
    "file": "lofipromt_14050821_125825883.jpg",
    "path": "assets/images/lofipromt_14050821_125825883.jpg",
    "title": "Sunday Morning Static",
    "category": "lofi",
    "author": "lofipromt",
    "userId": 4,
    "prompt": "lofi aesthetic illustration, soft grain, muted palette, cozy atmosphere",
    "tags": "#LofiPrompts #Lofi"
  },
  {
    "id": 36,
    "file": "lofipromt_14050821_125826389.jpg",
    "path": "assets/images/lofipromt_14050821_125826389.jpg",
    "title": "Paper Lanterns",
    "category": "lofi",
    "author": "lofipromt",
    "userId": 4,
    "prompt": "lofi aesthetic illustration, soft grain, muted palette, cozy atmosphere",
    "tags": "#LofiPrompts #Lofi"
  },
  {
    "id": 37,
    "file": "maxvoao_14050821_125952853.jpg",
    "path": "assets/images/maxvoao_14050821_125952853.jpg",
    "title": "Crimson Wanderer",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 99
  },
  {
    "id": 38,
    "file": "maxvoao_14050821_125953260.jpg",
    "path": "assets/images/maxvoao_14050821_125953260.jpg",
    "title": "Aurora Portrait",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 166
  },
  {
    "id": 39,
    "file": "maxvoao_14050821_125953765.jpg",
    "path": "assets/images/maxvoao_14050821_125953765.jpg",
    "title": "Desert Bloom",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 233
  },
  {
    "id": 40,
    "file": "maxvoao_14050821_125954261.jpg",
    "path": "assets/images/maxvoao_14050821_125954261.jpg",
    "title": "Steel & Silk",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 300
  },
  {
    "id": 41,
    "file": "maxvoao_14050821_125954764.jpg",
    "path": "assets/images/maxvoao_14050821_125954764.jpg",
    "title": "The Cartographer",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 367
  },
  {
    "id": 42,
    "file": "maxvoao_14050821_125955263.jpg",
    "path": "assets/images/maxvoao_14050821_125955263.jpg",
    "title": "Golden Hour Ghost",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 434
  },
  {
    "id": 43,
    "file": "maxvoao_14050821_125955767.jpg",
    "path": "assets/images/maxvoao_14050821_125955767.jpg",
    "title": "Painted Soldier",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 501
  },
  {
    "id": 44,
    "file": "maxvoao_14050821_125956264.jpg",
    "path": "assets/images/maxvoao_14050821_125956264.jpg",
    "title": "Velvet Static",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 568
  },
  {
    "id": 45,
    "file": "maxvoao_14050821_125956786.jpg",
    "path": "assets/images/maxvoao_14050821_125956786.jpg",
    "title": "The Alchemist",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 635
  },
  {
    "id": 46,
    "file": "maxvoao_14050821_125957263.jpg",
    "path": "assets/images/maxvoao_14050821_125957263.jpg",
    "title": "Neon Ronin",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 702
  },
  {
    "id": 47,
    "file": "maxvoao_14050821_125957763.jpg",
    "path": "assets/images/maxvoao_14050821_125957763.jpg",
    "title": "Glasswing",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 769
  },
  {
    "id": 48,
    "file": "maxvoao_14050821_125958267.jpg",
    "path": "assets/images/maxvoao_14050821_125958267.jpg",
    "title": "The Storyteller",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 836
  },
  {
    "id": 49,
    "file": "maxvoao_14050821_125958785.jpg",
    "path": "assets/images/maxvoao_14050821_125958785.jpg",
    "title": "Copper Sky",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 903
  },
  {
    "id": 50,
    "file": "maxvoao_14050821_125959762.jpg",
    "path": "assets/images/maxvoao_14050821_125959762.jpg",
    "title": "Afterglow",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 970
  },
  {
    "id": 51,
    "file": "maxvoao_14050821_130000263.jpg",
    "path": "assets/images/maxvoao_14050821_130000263.jpg",
    "title": "The Silent City",
    "category": "marketplace",
    "author": "maxvoao",
    "userId": 5,
    "prompt": "premium character art prompt, intricate details, studio lighting, trending on artstation",
    "tags": "#Marketplace #AIArt",
    "price": 137
  },
  {
    "id": 52,
    "file": "celistima_14050821_132620834.jpg",
    "path": "assets/images/celistima_14050821_132620834.jpg",
    "title": "Quiet Grandeur",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  },
  {
    "id": 53,
    "file": "celistima_14050821_132621235.jpg",
    "path": "assets/images/celistima_14050821_132621235.jpg",
    "title": "A Study in Gold",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  },
  {
    "id": 54,
    "file": "celistima_14050821_132621732.jpg",
    "path": "assets/images/celistima_14050821_132621732.jpg",
    "title": "The Blue Hour",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  },
  {
    "id": 55,
    "file": "celistima_14050821_132622230.jpg",
    "path": "assets/images/celistima_14050821_132622230.jpg",
    "title": "Fragments of Summer",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  },
  {
    "id": 56,
    "file": "celistima_14050821_132622744.jpg",
    "path": "assets/images/celistima_14050821_132622744.jpg",
    "title": "Portrait of a Stranger",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  },
  {
    "id": 57,
    "file": "celistima_14050821_132623229.jpg",
    "path": "assets/images/celistima_14050821_132623229.jpg",
    "title": "Stillness",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  },
  {
    "id": 58,
    "file": "celistima_14050821_132623729.jpg",
    "path": "assets/images/celistima_14050821_132623729.jpg",
    "title": "The Long Way Home",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  },
  {
    "id": 59,
    "file": "celistima_14050821_132624229.jpg",
    "path": "assets/images/celistima_14050821_132624229.jpg",
    "title": "Bloom",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  },
  {
    "id": 60,
    "file": "celistima_14050821_132624729.jpg",
    "path": "assets/images/celistima_14050821_132624729.jpg",
    "title": "Velvet Light",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  },
  {
    "id": 61,
    "file": "celistima_14050821_132625314.jpg",
    "path": "assets/images/celistima_14050821_132625314.jpg",
    "title": "After the Rain",
    "category": "celistima",
    "author": "celistima",
    "userId": 2,
    "prompt": "fine art photography style, soft directional light, elegant composition",
    "tags": "#ArtCuration #FineArt",
    "note": "Selected for its restrained palette and sense of quiet."
  }
];

const POSTS = [
  {
    "id": 1,
    "userId": 1,
    "text": "Neon Dreamscape — #AIArt #DigitalArt",
    "image": "assets/images/aiartman__14050821_134814396.jpg",
    "imageId": 1,
    "likes": 55,
    "replies": 9,
    "reposts": 4,
    "time": "6h",
    "category": "aiart"
  },
  {
    "id": 2,
    "userId": 1,
    "text": "Chrome Horizon — #AIArt #DigitalArt",
    "image": "assets/images/aiartman__14050821_134814772.jpg",
    "imageId": 2,
    "likes": 92,
    "replies": 16,
    "reposts": 7,
    "time": "11h",
    "category": "aiart"
  },
  {
    "id": 3,
    "userId": 1,
    "text": "Electric Bloom — #AIArt #DigitalArt",
    "image": "assets/images/aiartman__14050821_134815272.jpg",
    "imageId": 3,
    "likes": 129,
    "replies": 23,
    "reposts": 10,
    "time": "16h",
    "category": "aiart"
  },
  {
    "id": 4,
    "userId": 1,
    "text": "Midnight Circuit — #AIArt #DigitalArt",
    "image": "assets/images/aiartman__14050821_134815772.jpg",
    "imageId": 4,
    "likes": 166,
    "replies": 30,
    "reposts": 13,
    "time": "21h",
    "category": "aiart"
  },
  {
    "id": 5,
    "userId": 1,
    "text": "Solar Drift — #AIArt #DigitalArt",
    "image": "assets/images/aiartman__14050821_134816272.jpg",
    "imageId": 5,
    "likes": 203,
    "replies": 3,
    "reposts": 16,
    "time": "4h",
    "category": "aiart"
  },
  {
    "id": 6,
    "userId": 1,
    "text": "Glass Garden — #AIArt #DigitalArt",
    "image": "assets/images/aiartman__14050821_134816771.jpg",
    "imageId": 6,
    "likes": 240,
    "replies": 10,
    "reposts": 19,
    "time": "9h",
    "category": "aiart"
  },
  {
    "id": 7,
    "userId": 1,
    "text": "Signal Lost — #AIArt #DigitalArt",
    "image": "assets/images/aiartman__14050821_134817271.jpg",
    "imageId": 7,
    "likes": 277,
    "replies": 17,
    "reposts": 22,
    "time": "14h",
    "category": "aiart"
  },
  {
    "id": 8,
    "userId": 3,
    "text": "The Ember Throne — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125310522.jpg",
    "imageId": 8,
    "likes": 314,
    "replies": 24,
    "reposts": 25,
    "time": "19h",
    "category": "fantasy"
  },
  {
    "id": 9,
    "userId": 3,
    "text": "Dragons of the Pale Moon — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125310925.jpg",
    "imageId": 9,
    "likes": 351,
    "replies": 31,
    "reposts": 28,
    "time": "2h",
    "category": "fantasy"
  },
  {
    "id": 10,
    "userId": 3,
    "text": "Ruins of Aetheria — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125311473.jpg",
    "imageId": 10,
    "likes": 388,
    "replies": 4,
    "reposts": 31,
    "time": "7h",
    "category": "fantasy"
  },
  {
    "id": 11,
    "userId": 3,
    "text": "The Last Skyward City — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125311923.jpg",
    "imageId": 11,
    "likes": 425,
    "replies": 11,
    "reposts": 34,
    "time": "12h",
    "category": "fantasy"
  },
  {
    "id": 12,
    "userId": 3,
    "text": "Whispering Forest — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125312422.jpg",
    "imageId": 12,
    "likes": 42,
    "replies": 18,
    "reposts": 37,
    "time": "17h",
    "category": "fantasy"
  },
  {
    "id": 13,
    "userId": 3,
    "text": "Crown of Ash — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125312922.jpg",
    "imageId": 13,
    "likes": 79,
    "replies": 25,
    "reposts": 40,
    "time": "22h",
    "category": "fantasy"
  },
  {
    "id": 14,
    "userId": 3,
    "text": "The Wandering Mage — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125313423.jpg",
    "imageId": 14,
    "likes": 116,
    "replies": 32,
    "reposts": 43,
    "time": "5h",
    "category": "fantasy"
  },
  {
    "id": 15,
    "userId": 3,
    "text": "Valley of Fallen Stars — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125313923.jpg",
    "imageId": 15,
    "likes": 153,
    "replies": 5,
    "reposts": 46,
    "time": "10h",
    "category": "fantasy"
  },
  {
    "id": 16,
    "userId": 3,
    "text": "The Obsidian Gate — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125314423.jpg",
    "imageId": 16,
    "likes": 190,
    "replies": 12,
    "reposts": 49,
    "time": "15h",
    "category": "fantasy"
  },
  {
    "id": 17,
    "userId": 3,
    "text": "Songs of the Deep — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125314926.jpg",
    "imageId": 17,
    "likes": 227,
    "replies": 19,
    "reposts": 52,
    "time": "20h",
    "category": "fantasy"
  },
  {
    "id": 18,
    "userId": 3,
    "text": "The Gilded Griffin — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125315565.jpg",
    "imageId": 18,
    "likes": 264,
    "replies": 26,
    "reposts": 55,
    "time": "3h",
    "category": "fantasy"
  },
  {
    "id": 19,
    "userId": 3,
    "text": "Winterhold Keep — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125315926.jpg",
    "imageId": 19,
    "likes": 301,
    "replies": 33,
    "reposts": 58,
    "time": "8h",
    "category": "fantasy"
  },
  {
    "id": 20,
    "userId": 3,
    "text": "The Shattered Crown — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125316430.jpg",
    "imageId": 20,
    "likes": 338,
    "replies": 6,
    "reposts": 61,
    "time": "13h",
    "category": "fantasy"
  },
  {
    "id": 21,
    "userId": 3,
    "text": "Lanterns of Elarion — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125316926.jpg",
    "imageId": 21,
    "likes": 375,
    "replies": 13,
    "reposts": 64,
    "time": "18h",
    "category": "fantasy"
  },
  {
    "id": 22,
    "userId": 3,
    "text": "The Sea Serpent's Oath — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125317431.jpg",
    "imageId": 22,
    "likes": 412,
    "replies": 20,
    "reposts": 67,
    "time": "1h",
    "category": "fantasy"
  },
  {
    "id": 23,
    "userId": 3,
    "text": "Throne of Thorns — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125317933.jpg",
    "imageId": 23,
    "likes": 29,
    "replies": 27,
    "reposts": 70,
    "time": "6h",
    "category": "fantasy"
  },
  {
    "id": 24,
    "userId": 3,
    "text": "The Lunar Oracle — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125318431.jpg",
    "imageId": 24,
    "likes": 66,
    "replies": 34,
    "reposts": 73,
    "time": "11h",
    "category": "fantasy"
  },
  {
    "id": 25,
    "userId": 3,
    "text": "Ashes of the Old Kingdom — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125318934.jpg",
    "imageId": 25,
    "likes": 103,
    "replies": 7,
    "reposts": 76,
    "time": "16h",
    "category": "fantasy"
  },
  {
    "id": 26,
    "userId": 3,
    "text": "The Crystal Pass — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125319435.jpg",
    "imageId": 26,
    "likes": 140,
    "replies": 14,
    "reposts": 79,
    "time": "21h",
    "category": "fantasy"
  },
  {
    "id": 27,
    "userId": 3,
    "text": "Where the Sky Ends — #Fantasy #AIArt",
    "image": "assets/images/fantasy_ai_author_14050821_125319931.jpg",
    "imageId": 27,
    "likes": 177,
    "replies": 21,
    "reposts": 82,
    "time": "4h",
    "category": "fantasy"
  },
  {
    "id": 28,
    "userId": 4,
    "text": "Rainy Window Study — #LofiPrompts #Lofi",
    "image": "assets/images/lofipromt_14050821_125822454.jpg",
    "imageId": 28,
    "likes": 214,
    "replies": 28,
    "reposts": 85,
    "time": "9h",
    "category": "lofi"
  },
  {
    "id": 29,
    "userId": 4,
    "text": "Midnight Train — #LofiPrompts #Lofi",
    "image": "assets/images/lofipromt_14050821_125822883.jpg",
    "imageId": 29,
    "likes": 251,
    "replies": 35,
    "reposts": 88,
    "time": "14h",
    "category": "lofi"
  },
  {
    "id": 30,
    "userId": 4,
    "text": "Coffee & Cassettes — #LofiPrompts #Lofi",
    "image": "assets/images/lofipromt_14050821_125823384.jpg",
    "imageId": 30,
    "likes": 288,
    "replies": 8,
    "reposts": 1,
    "time": "19h",
    "category": "lofi"
  },
  {
    "id": 31,
    "userId": 4,
    "text": "Rooftop at Dusk — #LofiPrompts #Lofi",
    "image": "assets/images/lofipromt_14050821_125823886.jpg",
    "imageId": 31,
    "likes": 325,
    "replies": 15,
    "reposts": 4,
    "time": "2h",
    "category": "lofi"
  },
  {
    "id": 32,
    "userId": 4,
    "text": "Snowfall in Kyoto — #LofiPrompts #Lofi",
    "image": "assets/images/lofipromt_14050821_125824388.jpg",
    "imageId": 32,
    "likes": 362,
    "replies": 22,
    "reposts": 7,
    "time": "7h",
    "category": "lofi"
  },
  {
    "id": 33,
    "userId": 4,
    "text": "The Quiet Library — #LofiPrompts #Lofi",
    "image": "assets/images/lofipromt_14050821_125824887.jpg",
    "imageId": 33,
    "likes": 399,
    "replies": 29,
    "reposts": 10,
    "time": "12h",
    "category": "lofi"
  },
  {
    "id": 34,
    "userId": 4,
    "text": "Neon Alley Walk — #LofiPrompts #Lofi",
    "image": "assets/images/lofipromt_14050821_125825386.jpg",
    "imageId": 34,
    "likes": 436,
    "replies": 2,
    "reposts": 13,
    "time": "17h",
    "category": "lofi"
  },
  {
    "id": 35,
    "userId": 4,
    "text": "Sunday Morning Static — #LofiPrompts #Lofi",
    "image": "assets/images/lofipromt_14050821_125825883.jpg",
    "imageId": 35,
    "likes": 53,
    "replies": 9,
    "reposts": 16,
    "time": "22h",
    "category": "lofi"
  },
  {
    "id": 36,
    "userId": 4,
    "text": "Paper Lanterns — #LofiPrompts #Lofi",
    "image": "assets/images/lofipromt_14050821_125826389.jpg",
    "imageId": 36,
    "likes": 90,
    "replies": 16,
    "reposts": 19,
    "time": "5h",
    "category": "lofi"
  },
  {
    "id": 37,
    "userId": 5,
    "text": "Crimson Wanderer — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125952853.jpg",
    "imageId": 37,
    "likes": 127,
    "replies": 23,
    "reposts": 22,
    "time": "10h",
    "category": "marketplace"
  },
  {
    "id": 38,
    "userId": 5,
    "text": "Aurora Portrait — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125953260.jpg",
    "imageId": 38,
    "likes": 164,
    "replies": 30,
    "reposts": 25,
    "time": "15h",
    "category": "marketplace"
  },
  {
    "id": 39,
    "userId": 5,
    "text": "Desert Bloom — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125953765.jpg",
    "imageId": 39,
    "likes": 201,
    "replies": 3,
    "reposts": 28,
    "time": "20h",
    "category": "marketplace"
  },
  {
    "id": 40,
    "userId": 5,
    "text": "Steel & Silk — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125954261.jpg",
    "imageId": 40,
    "likes": 238,
    "replies": 10,
    "reposts": 31,
    "time": "3h",
    "category": "marketplace"
  },
  {
    "id": 41,
    "userId": 5,
    "text": "The Cartographer — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125954764.jpg",
    "imageId": 41,
    "likes": 275,
    "replies": 17,
    "reposts": 34,
    "time": "8h",
    "category": "marketplace"
  },
  {
    "id": 42,
    "userId": 5,
    "text": "Golden Hour Ghost — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125955263.jpg",
    "imageId": 42,
    "likes": 312,
    "replies": 24,
    "reposts": 37,
    "time": "13h",
    "category": "marketplace"
  },
  {
    "id": 43,
    "userId": 5,
    "text": "Painted Soldier — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125955767.jpg",
    "imageId": 43,
    "likes": 349,
    "replies": 31,
    "reposts": 40,
    "time": "18h",
    "category": "marketplace"
  },
  {
    "id": 44,
    "userId": 5,
    "text": "Velvet Static — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125956264.jpg",
    "imageId": 44,
    "likes": 386,
    "replies": 4,
    "reposts": 43,
    "time": "1h",
    "category": "marketplace"
  },
  {
    "id": 45,
    "userId": 5,
    "text": "The Alchemist — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125956786.jpg",
    "imageId": 45,
    "likes": 423,
    "replies": 11,
    "reposts": 46,
    "time": "6h",
    "category": "marketplace"
  },
  {
    "id": 46,
    "userId": 5,
    "text": "Neon Ronin — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125957263.jpg",
    "imageId": 46,
    "likes": 40,
    "replies": 18,
    "reposts": 49,
    "time": "11h",
    "category": "marketplace"
  },
  {
    "id": 47,
    "userId": 5,
    "text": "Glasswing — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125957763.jpg",
    "imageId": 47,
    "likes": 77,
    "replies": 25,
    "reposts": 52,
    "time": "16h",
    "category": "marketplace"
  },
  {
    "id": 48,
    "userId": 5,
    "text": "The Storyteller — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125958267.jpg",
    "imageId": 48,
    "likes": 114,
    "replies": 32,
    "reposts": 55,
    "time": "21h",
    "category": "marketplace"
  },
  {
    "id": 49,
    "userId": 5,
    "text": "Copper Sky — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125958785.jpg",
    "imageId": 49,
    "likes": 151,
    "replies": 5,
    "reposts": 58,
    "time": "4h",
    "category": "marketplace"
  },
  {
    "id": 50,
    "userId": 5,
    "text": "Afterglow — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_125959762.jpg",
    "imageId": 50,
    "likes": 188,
    "replies": 12,
    "reposts": 61,
    "time": "9h",
    "category": "marketplace"
  },
  {
    "id": 51,
    "userId": 5,
    "text": "The Silent City — #Marketplace #AIArt",
    "image": "assets/images/maxvoao_14050821_130000263.jpg",
    "imageId": 51,
    "likes": 225,
    "replies": 19,
    "reposts": 64,
    "time": "14h",
    "category": "marketplace"
  },
  {
    "id": 52,
    "userId": 2,
    "text": "Quiet Grandeur — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132620834.jpg",
    "imageId": 52,
    "likes": 262,
    "replies": 26,
    "reposts": 67,
    "time": "19h",
    "category": "celistima"
  },
  {
    "id": 53,
    "userId": 2,
    "text": "A Study in Gold — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132621235.jpg",
    "imageId": 53,
    "likes": 299,
    "replies": 33,
    "reposts": 70,
    "time": "2h",
    "category": "celistima"
  },
  {
    "id": 54,
    "userId": 2,
    "text": "The Blue Hour — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132621732.jpg",
    "imageId": 54,
    "likes": 336,
    "replies": 6,
    "reposts": 73,
    "time": "7h",
    "category": "celistima"
  },
  {
    "id": 55,
    "userId": 2,
    "text": "Fragments of Summer — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132622230.jpg",
    "imageId": 55,
    "likes": 373,
    "replies": 13,
    "reposts": 76,
    "time": "12h",
    "category": "celistima"
  },
  {
    "id": 56,
    "userId": 2,
    "text": "Portrait of a Stranger — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132622744.jpg",
    "imageId": 56,
    "likes": 410,
    "replies": 20,
    "reposts": 79,
    "time": "17h",
    "category": "celistima"
  },
  {
    "id": 57,
    "userId": 2,
    "text": "Stillness — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132623229.jpg",
    "imageId": 57,
    "likes": 27,
    "replies": 27,
    "reposts": 82,
    "time": "22h",
    "category": "celistima"
  },
  {
    "id": 58,
    "userId": 2,
    "text": "The Long Way Home — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132623729.jpg",
    "imageId": 58,
    "likes": 64,
    "replies": 34,
    "reposts": 85,
    "time": "5h",
    "category": "celistima"
  },
  {
    "id": 59,
    "userId": 2,
    "text": "Bloom — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132624229.jpg",
    "imageId": 59,
    "likes": 101,
    "replies": 7,
    "reposts": 88,
    "time": "10h",
    "category": "celistima"
  },
  {
    "id": 60,
    "userId": 2,
    "text": "Velvet Light — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132624729.jpg",
    "imageId": 60,
    "likes": 138,
    "replies": 14,
    "reposts": 1,
    "time": "15h",
    "category": "celistima"
  },
  {
    "id": 61,
    "userId": 2,
    "text": "After the Rain — #ArtCuration #FineArt",
    "image": "assets/images/celistima_14050821_132625314.jpg",
    "imageId": 61,
    "likes": 175,
    "replies": 21,
    "reposts": 4,
    "time": "20h",
    "category": "celistima"
  },
  {
    "id": 100,
    "userId": 6,
    "text": "Just joined Orange Bird. Excited to meet the artists here. 🐦 What should I explore first? #OrangeBird",
    "image": "",
    "imageId": null,
    "likes": 12,
    "replies": 3,
    "reposts": 1,
    "time": "12m",
    "category": "text"
  },
  {
    "id": 101,
    "userId": 6,
    "text": "Collecting my favourite pieces from the community into one place. Start with #Fantasy and #LofiPrompts — you will not regret it.",
    "image": "",
    "imageId": null,
    "likes": 8,
    "replies": 2,
    "reposts": 0,
    "time": "1h",
    "category": "text"
  }
];

const HASHTAGS = [
  {
    "tag": "#AIArt",
    "count": 2840
  },
  {
    "tag": "#Fantasy",
    "count": 1960
  },
  {
    "tag": "#LofiPrompts",
    "count": 1240
  },
  {
    "tag": "#Marketplace",
    "count": 980
  },
  {
    "tag": "#ArtCuration",
    "count": 760
  },
  {
    "tag": "#OrangeBird",
    "count": 412
  },
  {
    "tag": "#DigitalArt",
    "count": 2310
  },
  {
    "tag": "#PromptEngineering",
    "count": 640
  }
];

const NOTIFICATIONS = [
  {
    "id": 1,
    "type": "like",
    "userId": 1,
    "text": "liked your post",
    "detail": "Collecting my favourite pieces from the community…",
    "time": "2m",
    "unread": true
  },
  {
    "id": 2,
    "type": "follow",
    "userId": 2,
    "text": "followed you",
    "detail": "",
    "time": "18m",
    "unread": true
  },
  {
    "id": 3,
    "type": "mention",
    "userId": 3,
    "text": "mentioned you in a post",
    "detail": "@raj the Ember Throne series is for you 🐉",
    "time": "1h",
    "unread": true
  },
  {
    "id": 4,
    "type": "like",
    "userId": 4,
    "text": "liked your post",
    "detail": "Just joined Orange Bird. Excited to meet the artists…",
    "time": "3h",
    "unread": false
  },
  {
    "id": 5,
    "type": "repost",
    "userId": 5,
    "text": "reposted your post",
    "detail": "Collecting my favourite pieces from the community…",
    "time": "5h",
    "unread": false
  },
  {
    "id": 6,
    "type": "follow",
    "userId": 3,
    "text": "followed you",
    "detail": "",
    "time": "1d",
    "unread": false
  },
  {
    "id": 7,
    "type": "mention",
    "userId": 4,
    "text": "mentioned you in a post",
    "detail": "New lofi pack for @raj and everyone else who asked",
    "time": "1d",
    "unread": false
  },
  {
    "id": 8,
    "type": "like",
    "userId": 2,
    "text": "liked your post",
    "detail": "Just joined Orange Bird. Excited to meet the artists…",
    "time": "2d",
    "unread": false
  }
];

const CONVERSATIONS = [
  {
    "id": 1,
    "userId": 1,
    "unread": 2,
    "time": "2m",
    "messages": [
      {
        "from": 1,
        "text": "Hey Raj! Welcome to Orange Bird.",
        "time": "09:41"
      },
      {
        "from": 6,
        "text": "Thanks! Your neon series is unreal.",
        "time": "09:43"
      },
      {
        "from": 1,
        "text": "Appreciate it. If you want, I can share the prompt for Neon Dreamscape.",
        "time": "09:44"
      }
    ]
  },
  {
    "id": 2,
    "userId": 2,
    "unread": 1,
    "time": "1h",
    "messages": [
      {
        "from": 2,
        "text": "I curated a small collection you might like. Quiet, warm, a little strange.",
        "time": "08:12"
      },
      {
        "from": 6,
        "text": "Send it over — that is exactly my kind of thing.",
        "time": "08:20"
      },
      {
        "from": 2,
        "text": "It is in the Art Curation service page. Tell me which one stays with you.",
        "time": "08:21"
      }
    ]
  },
  {
    "id": 3,
    "userId": 3,
    "unread": 0,
    "time": "4h",
    "messages": [
      {
        "from": 3,
        "text": "The Ember Throne series is live. Twenty worlds, one prompt family.",
        "time": "06:02"
      },
      {
        "from": 6,
        "text": "The pale moon dragons are my favourite.",
        "time": "06:10"
      },
      {
        "from": 3,
        "text": "Good choice. More coming this weekend.",
        "time": "06:12"
      }
    ]
  },
  {
    "id": 4,
    "userId": 4,
    "unread": 0,
    "time": "1d",
    "messages": [
      {
        "from": 4,
        "text": "Rainy Window Study is free to use. Credit appreciated.",
        "time": "Yesterday"
      },
      {
        "from": 6,
        "text": "Thank you! I will link back to your profile.",
        "time": "Yesterday"
      }
    ]
  }
];

const REPLIES = [
  {
    "id": 10,
    "postId": 1,
    "userId": 2,
    "text": "Saved. The palette is exactly what I have been trying to describe.",
    "time": "2h",
    "likes": 5
  },
  {
    "id": 11,
    "postId": 1,
    "userId": 3,
    "text": "The composition is so clean. What prompt family did you use?",
    "time": "5h",
    "likes": 6
  },
  {
    "id": 12,
    "postId": 1,
    "userId": 4,
    "text": "I would hang this on a wall. Immediately.",
    "time": "8h",
    "likes": 7
  },
  {
    "id": 20,
    "postId": 2,
    "userId": 3,
    "text": "The composition is so clean. What prompt family did you use?",
    "time": "2h",
    "likes": 8
  },
  {
    "id": 21,
    "postId": 2,
    "userId": 4,
    "text": "I would hang this on a wall. Immediately.",
    "time": "5h",
    "likes": 9
  },
  {
    "id": 22,
    "postId": 2,
    "userId": 5,
    "text": "Every time I think I have a favourite, you post another one.",
    "time": "8h",
    "likes": 10
  },
  {
    "id": 30,
    "postId": 3,
    "userId": 4,
    "text": "I would hang this on a wall. Immediately.",
    "time": "2h",
    "likes": 11
  },
  {
    "id": 31,
    "postId": 3,
    "userId": 5,
    "text": "Every time I think I have a favourite, you post another one.",
    "time": "5h",
    "likes": 12
  },
  {
    "id": 32,
    "postId": 3,
    "userId": 1,
    "text": "This is gorgeous. The light is doing something special here.",
    "time": "8h",
    "likes": 13
  },
  {
    "id": 40,
    "postId": 4,
    "userId": 5,
    "text": "Every time I think I have a favourite, you post another one.",
    "time": "2h",
    "likes": 14
  },
  {
    "id": 41,
    "postId": 4,
    "userId": 1,
    "text": "This is gorgeous. The light is doing something special here.",
    "time": "5h",
    "likes": 15
  },
  {
    "id": 42,
    "postId": 4,
    "userId": 2,
    "text": "Saved. The palette is exactly what I have been trying to describe.",
    "time": "8h",
    "likes": 16
  },
  {
    "id": 50,
    "postId": 5,
    "userId": 1,
    "text": "This is gorgeous. The light is doing something special here.",
    "time": "2h",
    "likes": 17
  },
  {
    "id": 51,
    "postId": 5,
    "userId": 2,
    "text": "Saved. The palette is exactly what I have been trying to describe.",
    "time": "5h",
    "likes": 18
  },
  {
    "id": 52,
    "postId": 5,
    "userId": 3,
    "text": "The composition is so clean. What prompt family did you use?",
    "time": "8h",
    "likes": 19
  },
  {
    "id": 60,
    "postId": 6,
    "userId": 2,
    "text": "Saved. The palette is exactly what I have been trying to describe.",
    "time": "2h",
    "likes": 20
  },
  {
    "id": 61,
    "postId": 6,
    "userId": 3,
    "text": "The composition is so clean. What prompt family did you use?",
    "time": "5h",
    "likes": 21
  },
  {
    "id": 62,
    "postId": 6,
    "userId": 4,
    "text": "I would hang this on a wall. Immediately.",
    "time": "8h",
    "likes": 22
  },
  {
    "id": 70,
    "postId": 7,
    "userId": 3,
    "text": "The composition is so clean. What prompt family did you use?",
    "time": "2h",
    "likes": 23
  },
  {
    "id": 71,
    "postId": 7,
    "userId": 4,
    "text": "I would hang this on a wall. Immediately.",
    "time": "5h",
    "likes": 24
  },
  {
    "id": 72,
    "postId": 7,
    "userId": 5,
    "text": "Every time I think I have a favourite, you post another one.",
    "time": "8h",
    "likes": 25
  },
  {
    "id": 80,
    "postId": 8,
    "userId": 4,
    "text": "I would hang this on a wall. Immediately.",
    "time": "2h",
    "likes": 26
  },
  {
    "id": 81,
    "postId": 8,
    "userId": 5,
    "text": "Every time I think I have a favourite, you post another one.",
    "time": "5h",
    "likes": 27
  },
  {
    "id": 82,
    "postId": 8,
    "userId": 1,
    "text": "This is gorgeous. The light is doing something special here.",
    "time": "8h",
    "likes": 28
  },
  {
    "id": 90,
    "postId": 9,
    "userId": 5,
    "text": "Every time I think I have a favourite, you post another one.",
    "time": "2h",
    "likes": 29
  },
  {
    "id": 91,
    "postId": 9,
    "userId": 1,
    "text": "This is gorgeous. The light is doing something special here.",
    "time": "5h",
    "likes": 2
  },
  {
    "id": 92,
    "postId": 9,
    "userId": 2,
    "text": "Saved. The palette is exactly what I have been trying to describe.",
    "time": "8h",
    "likes": 3
  },
  {
    "id": 100,
    "postId": 10,
    "userId": 1,
    "text": "This is gorgeous. The light is doing something special here.",
    "time": "2h",
    "likes": 4
  },
  {
    "id": 101,
    "postId": 10,
    "userId": 2,
    "text": "Saved. The palette is exactly what I have been trying to describe.",
    "time": "5h",
    "likes": 5
  },
  {
    "id": 102,
    "postId": 10,
    "userId": 3,
    "text": "The composition is so clean. What prompt family did you use?",
    "time": "8h",
    "likes": 6
  },
  {
    "id": 110,
    "postId": 11,
    "userId": 2,
    "text": "Saved. The palette is exactly what I have been trying to describe.",
    "time": "2h",
    "likes": 7
  },
  {
    "id": 111,
    "postId": 11,
    "userId": 3,
    "text": "The composition is so clean. What prompt family did you use?",
    "time": "5h",
    "likes": 8
  },
  {
    "id": 112,
    "postId": 11,
    "userId": 4,
    "text": "I would hang this on a wall. Immediately.",
    "time": "8h",
    "likes": 9
  },
  {
    "id": 120,
    "postId": 12,
    "userId": 3,
    "text": "The composition is so clean. What prompt family did you use?",
    "time": "2h",
    "likes": 10
  },
  {
    "id": 121,
    "postId": 12,
    "userId": 4,
    "text": "I would hang this on a wall. Immediately.",
    "time": "5h",
    "likes": 11
  },
  {
    "id": 122,
    "postId": 12,
    "userId": 5,
    "text": "Every time I think I have a favourite, you post another one.",
    "time": "8h",
    "likes": 12
  }
];

const CURRENT_USER = USERS.find(function (u) { return u.isMe; });

const CATEGORY_META = {
  aiart:      { label: "AI Art Studio",       short: "AI Art",      handle: "aiartman",          service: "service-ai-art.html",       icon: "sparkles" },
  fantasy:    { label: "Fantasy Worlds",      short: "Fantasy",     handle: "fantasy_ai_author", service: "service-fantasy.html",      icon: "layers" },
  lofi:       { label: "Lofi Prompts",        short: "Lofi",        handle: "lofipromt",         service: "service-lofi.html",         icon: "headphones" },
  marketplace:{ label: "Prompt Marketplace",  short: "Marketplace", handle: "maxvoao",           service: "service-marketplace.html",  icon: "cart" },
  celistima:  { label: "Art Curation",        short: "Curation",    handle: "celistima",         service: "service-curation.html",     icon: "star" }
};

/* ---------- tiny data helpers ---------- */
function obGetUser(id) {
  return USERS.find(function (u) { return u.id === id; }) || CURRENT_USER;
}
function obGetUserByHandle(handle) {
  return USERS.find(function (u) { return u.handle === String(handle || "").replace(/^@/, ""); }) || null;
}
function obGetImage(id) {
  return IMAGES.find(function (img) { return img.id === Number(id); }) || null;
}
function obGetPost(id) {
  return obAllPosts().find(function (p) { return p.id === Number(id); }) || null;
}
function obAllPosts() {
  var extra = [];
  try { extra = JSON.parse(sessionStorage.getItem("ob_posts") || "[]"); } catch (e) { extra = []; }
  return extra.concat(POSTS);
}
function obSavePost(post) {
  try {
    var extra = JSON.parse(sessionStorage.getItem("ob_posts") || "[]");
    extra.unshift(post);
    sessionStorage.setItem("ob_posts", JSON.stringify(extra));
    return true;
  } catch (e) { return false; }
}
function obCounts() {
  var counts = {};
  IMAGES.forEach(function (img) { counts[img.category] = (counts[img.category] || 0) + 1; });
  counts.all = IMAGES.length;
  return counts;
}
