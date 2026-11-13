# Orange Bird

A complete static social-media site for “Orange Bird” — a small, old-Twitter-style
network for AI art, fantasy worlds, lofi prompts and prompt bundles. Everything is
plain HTML, CSS and JavaScript. There is no build step, no backend and no external
dependencies.

## Run it

From this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/index.html>.

You can also open `index.html` directly in a browser, though the lightbox and some
session features behave best when served over HTTP.

## The 30 pages

| Group | Pages |
| --- | --- |
| A — public | `index.html`, `login.html`, `signup.html`, `about.html` |
| B — main app | `home.html`, `explore.html`, `notifications.html`, `messages.html`, `bookmarks.html` |
| C — content | `compose.html`, `post-detail.html`, `gallery.html`, `search.html`, `hashtag.html` |
| D — profile | `profile.html`, `edit-profile.html`, `user.html`, `followers.html`, `following.html` |
| E — services | `services.html`, `service-ai-art.html`, `service-fantasy.html`, `service-lofi.html`, `service-marketplace.html`, `service-curation.html` |
| F — utility | `settings.html`, `help.html`, `privacy.html`, `terms.html`, `404.html` |

Every page has its own `<title>` and meta description. The five service pages map
to the six services through the hub: the sixth service, **My Gallery**, is merged
into the **Media** tab of `profile.html` (`profile.html#media`).

## Folder structure

```
.
├── *.html                 # 30 pages
├── css/
│   ├── style.css          # tokens, reset, typography, buttons
│   ├── layout.css         # navbar, 3-column shell, footer
│   ├── components.css     # cards, feeds, gallery, lightbox, forms
│   └── responsive.css     # 1100 / 900 / 700 / 600 / 420px breakpoints
├── js/
│   ├── data.js            # users, all 61 images, posts, hashtags, messages
│   ├── main.js            # shared shell, icons, storage, likes/bookmarks
│   ├── feed.js            # page renderers and interactions
│   └── auth.js            # mock login/signup validation
├── assets/
│   ├── logo orange bird.png
│   ├── images/            # 61 JPG artworks
│   └── profile/           # add your own photos here (see below)
└── README.md
```

## Images

The 61 JPGs in `assets/images/` are used across the site and all of them appear in
`gallery.html`. They fall into five collections:

| Collection | Prefix | Count |
| --- | --- | --- |
| AI Art Studio | `aiartman_` | 7 |
| Art Curation | `celistima_` | 10 |
| Fantasy Worlds | `fantasy_ai_author_` | 20 |
| Lofi Prompts | `lofipromt_` | 9 |
| Prompt Marketplace | `maxvoao_` | 15 |

The logo is shown in the top navbar, the public landing hero, the footer and as the
default avatar.

### Adding your own photos later

The design expects personal photos, but none were supplied. The site currently uses
the Orange Bird logo as the avatar placeholder. To add your own:

1. Put your profile photo (square, ideally 400×400 or larger) in `assets/profile/`.
   A common name is `assets/profile/raj.jpg`.
2. Put an optional banner image there too, for example
   `assets/profile/banner.jpg` (1500×500 works well).
3. Open `js/data.js` and update the user with `"isMe": true` in the `USERS` array
   (the entry named “Raj” near the top of the file):
   - `avatar: "assets/profile/raj.jpg"`
   - `banner: "assets/profile/banner.jpg"` (optional)
4. Refresh the site. The navbar, sidebar, composer, profile and post cards all read
   the same profile object.

You can also change the display name, handle, bio, location, site and join date in
that same object. Changes made through **Edit profile** or **Settings** are stored in
`sessionStorage` and reset when the tab is closed.

## Demo behaviour

- Login and signup are mock forms. Valid input redirects to `home.html`; nothing is
  sent anywhere and no real account is created.
- Likes, reposts, bookmarks, follows, new posts, replies, profile edits and settings
  use `sessionStorage`. They intentionally reset on tab close.
- The composer saves a draft while you type and redirects to the new post on publish.
- Gallery filters, the lightbox (arrow keys and Escape work), search, hashtags,
  profile tabs, message threads and the demo marketplace are all client-side.
- “Buy” buttons show a confirmation only; no payment is taken.
- Unknown post IDs or user handles redirect to `404.html`.

## Responsive layout

- Desktop: three columns (navigation, content, discovery).
- Below 1000px: the right discovery column hides.
- Below 900px: the shell becomes one column, the right sidebar is removed, and the
  left navigation becomes an off-canvas drawer opened by the menu button.
- Below 700px: two-column galleries and tighter cards.
- Below 600px: single-column forms, a fixed bottom navigation bar and compact feeds.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). The JavaScript uses
standard ES5-compatible syntax with a few modern DOM helpers and `URLSearchParams`.
