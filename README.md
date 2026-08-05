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
- **Colors and branding:** all brand colors live in the `:root` variables at the
  top of `css/styles.css` (`--red`, `--navy`, `--gold`).
- **Contact form:** the form in `contact.html` currently shows a friendly
  confirmation message on the front end only — it does **not** send email yet.
  To make it deliver messages, connect it to a form service (e.g. Formspree,
  Getform, or a Google Form) by updating the `<form>` action, or wire up the
  handler in `js/main.js`.

## Notes

- Officer names, event dates, and statistics are **placeholder content** meant to
  be replaced with real information from the current SGA.
- The site is responsive (works on phones, tablets, and desktops) and built with
  accessibility in mind (skip link, semantic landmarks, keyboard-friendly nav,
  and reduced-motion support).
