# UVA Wise SGA Website

The official website for the **Student Government Association** of the University
of Virginia's College at Wise — the voice of the Highland Cavalier student body.

This is a lightweight, dependency-free static website (plain HTML, CSS, and
JavaScript). There is no build step, so it's fast to edit and easy to host —
including free hosting on GitHub Pages.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Landing page, mission overview, upcoming events, quick links |
| About | `about.html` | Mission, values, structure, and history of SGA |
| Leadership | `leadership.html` | Executive board, senators, and staff support |
| Events | `events.html` | Upcoming meetings, elections, and campus events |
| Get Involved | `get-involved.html` | Run for office, join a committee, charter a club, request funding, FAQ |
| Contact | `contact.html` | Contact form and office details |

## Project structure

```
.
├── index.html          # Home
├── about.html
├── leadership.html
├── events.html
├── get-involved.html
├── contact.html
├── css/
│   └── styles.css      # Design system + all page styles
├── js/
│   └── main.js         # Mobile nav, scroll reveal, form handling
├── assets/
│   └── logo.svg        # SGA crest / favicon
└── .nojekyll           # Tells GitHub Pages to serve files as-is
```

## Viewing the site locally

Because it's plain static files, you can simply open `index.html` in a browser.
To preview it exactly as it will be served (with correct relative paths), run a
tiny local server from the project root:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying with GitHub Pages

1. Push this repository to GitHub (the `main` branch).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*.
4. Choose the `main` branch and the `/ (root)` folder, then **Save**.
5. After a minute, your site will be live at
   `https://<username>.github.io/<repo-name>/`.

## Editing content

The site is written to be edited by students with a little HTML familiarity —
no frameworks required.

- **Update officers/senators:** edit the `.officer` cards in `leadership.html`.
  The two-letter initials in `.avatar` are just placeholders; swap them for a
  photo `<img>` if you'd like.
- **Add or change events:** copy an `.event` block in `events.html` (and the
  preview on `index.html`) and update the date, title, and details.
- **Campus photo banner (home page):** the `<section class="photo-banner">` on
  `index.html` is a single full-width panoramic slot. Replace the `<span class="ph">…</span>`
  placeholder with an image, e.g.
  `<img src="assets/campus/banner.jpg" alt="The UVA Wise campus" />`.
  Put the photo in `assets/campus/`. A wide landscape image (roughly 1600×600 or
  larger) works best — it's cropped to fill the banner.
- **Colors and branding:** the palette is **dark blue, red, white, and black**,
  defined as `:root` variables at the top of `css/styles.css` (`--navy`, `--red`,
  `--black`; white is the page background).
- **Contact form:** the form in `contact.html` currently shows a friendly
  confirmation message on the front end only — it does **not** send email yet.
  To make it deliver messages, connect it to a form service (e.g. Formspree,
  Getform, or a Google Form) by updating the `<form>` action, or wire up the
  handler in `js/main.js`.

## Notes

- Officers, senators, committees, mission, meeting time, office location,
  phone number, advisor, and event names reflect the **2026–2027 UVA Wise SGA**,
  sourced from the SGA's own materials and the College's official SGA webpage
  (Fridays at 1 p.m. in the Dogwood Room; office on the 3rd floor of the Slemp
  Student Center; 276-328-0213; advisor Mikaela Logan).
- Member **photos** are not yet included — each card shows the member's initials
  as a placeholder avatar until photos are added.
- The logo in `assets/logo.svg` is a clean SVG **recreation** of the SGA's
  column-capital mark (navy on white), matching the official navy/red/white
  identity. To use the exact official artwork, drop a `.png` or `.svg` export
  into `assets/` and update the `<img src>` references.
- Specific **event dates** (other than the weekly Friday meeting) are shown as
  seasonal labels (e.g., "Fall '26") and are confirmed each semester.
- The contact form is front-end only; see "Editing content" above to connect it
  to a form service.
- The site is responsive (works on phones, tablets, and desktops) and built with
  accessibility in mind (skip link, semantic landmarks, keyboard-friendly nav,
  and reduced-motion support).
