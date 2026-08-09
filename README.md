# UVA Wise SGA Website

The official website for the **Student Government Association** at the University
of Virginia's College at Wise.

It's a plain static website (HTML, CSS, and JavaScript) with no build step, so
it's easy to edit and can be hosted almost anywhere: a web server you own,
GitHub Pages, or a static-site host.

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

## Deploying on your own server (nginx)

On an Ubuntu server (for example a DigitalOcean droplet):

```bash
sudo apt update && sudo apt install -y nginx git
sudo git clone https://github.com/bearbrofell20/UVA-Wise-SGA-.git /var/www/uvawise-sga

sudo tee /etc/nginx/sites-available/uvawise-sga >/dev/null <<'CONF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    root /var/www/uvawise-sga;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
CONF

sudo ln -sf /etc/nginx/sites-available/uvawise-sga /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Then visit the server's IP address. To update later, run
`cd /var/www/uvawise-sga && sudo git pull`.

## Editing content

The site is written to be edited by students with a little HTML familiarity.
No frameworks required.

- **Update officers/senators:** edit the `.officer` cards in `leadership.html`.
  Executive Board members use photos in `assets/members/`; senators use two-letter
  initials until photos are added. To add a photo, swap an initials avatar
  (`<div class="avatar">FM</div>`) for
  `<div class="avatar"><img src="assets/members/name.jpg" alt="Name" /></div>`.
- **Add or change events:** copy an `.event` block in `events.html` (and the
  preview on `index.html`) and update the date, title, and details.
- **Campus photo banner (home page):** the `<section class="photo-banner">` on
  `index.html` is a single full-width panoramic slot. Replace the `<span class="ph">…</span>`
  placeholder with an image, e.g.
  `<img src="assets/campus/banner.jpg" alt="The UVA Wise campus" />`.
  Put the photo in `assets/campus/`. A wide landscape image (roughly 1600×600 or
  larger) works best; it's cropped to fill the banner.
- **Colors and branding:** the palette is **dark blue, red, white, and black**,
  defined as `:root` variables at the top of `css/styles.css` (`--navy`, `--red`,
  `--black`; white is the page background).
- **Contact form:** the form in `contact.html` currently shows a friendly
  confirmation message on the front end only. It does **not** send email yet.
  To make it deliver messages, connect it to a form service (e.g. Formspree,
  Getform, or a Google Form) by updating the `<form>` action, or wire up the
  handler in `js/main.js`.

## Notes

- Officers, senators, committees, mission, meeting time, office location,
  phone number, advisor, and event names reflect the **2026–2027 UVA Wise SGA**,
  sourced from the SGA's own materials and the College's official SGA webpage
  (Fridays at 1 p.m. in the Dogwood Room; office on the 3rd floor of the Slemp
  Student Center; 276-328-0213; advisor Mikaela Logan).
- The **Executive Board** cards use real photos (cropped from the board photo);
  the **senators** still show initials until individual photos are added.
- Photos live in `assets/campus/` (banner, aerial, students) and
  `assets/members/` (board photo and officer headshots). The logo is the
  official SGA mark in `assets/logo.png`.
- Specific **event dates** (other than the weekly Friday meeting) are shown as
  seasonal labels (e.g., "Fall '26") and are confirmed each semester.
- The contact form is front-end only; see "Editing content" above to connect it
  to a form service.
- The site is responsive (works on phones, tablets, and desktops) and built with
  accessibility in mind (skip link, semantic landmarks, keyboard-friendly nav,
  and reduced-motion support).
