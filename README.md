# Vector Equity Research website

Professional website for **Vector Equity Research** with:

- **Public site:** home, courses, course detail pages, research library, about, contact and disclaimer.
- **Products:** *Road Map to Equity Research* (11 modules plus a career bonus, ₹677) and *Sector Expertise: Gold & Jewellery Research* (30 modules, ₹999), plus five seeded research notes (full sector report, KPI framework, PNG Jewellers deep-dive, Q4 FY26 concall summary, gold seasonality framework).
- **Client accounts:** sign up, log in, enrol in courses, track enrolment status, open unlocked courses and materials, read members-only research, edit profile/password.
- **Admin console** (`/admin`): edit every text and image on the site, upload images, change colours/fonts/corner style, show/hide home sections, manage courses (pricing, curriculum, materials), publish research, approve enrolments, manage users, read contact messages, and download a backup.

Built with Node.js + Express + EJS. All data lives in `data/db.json` and uploaded images in `data/uploads/`, so no database server is needed.

## Run locally

```bash
npm install
npm start            # http://localhost:3000
npm test             # end-to-end tests
```

On first start an admin account is created. Set `ADMIN_EMAIL` / `ADMIN_PASSWORD` beforehand, or a random password is printed in the console and saved to `data/admin-credentials.txt`. Log in at **/admin/login**, then go to **My account** to set your own email and password (the file is deleted automatically).

## How to change the website

| I want to… | Go to |
|---|---|
| Change headings, paragraphs, hero/about/founder images | Admin → **Site content** |
| Edit highlight numbers, method steps, testimonials, FAQs | Admin → **Sections & lists** |
| Change colours, fonts, roundness | Admin → **Theme & format** (live preview) |
| Change logo, contact details, WhatsApp button, social links, show/hide sections, disclaimer | Admin → **Settings** |
| Edit course price, description, curriculum, cover image, student materials | Admin → **Courses** |
| Publish a report (public or members-only) | Admin → **Research → New report** |
| Upload images and copy their URL | Admin → **Media library** |
| Approve a paid enrolment | Admin → **Enrolments** → Approve |

Long text fields support simple formatting: `## Heading`, `- bullet`, `1. numbered`, `**bold**`, `*italic*`, `[link](https://…)`.

### Enrolment flow

1. Client signs up and clicks **Enrol now** → request is *pending* and they see your payment instructions (edit in Settings).
2. You collect payment (UPI/bank) and click **Approve** in Admin → Enrolments.
3. The course unlocks in their dashboard with the modules and the materials links you added (Zoom, recordings, Drive folders…).

Free courses (price 0) unlock instantly. You can also grant access directly from Admin → Users → Manage.

## Deploying on Render

This repo includes a `render.yaml` Blueprint.

1. Sign in at [render.com](https://render.com) with GitHub.
2. **New → Blueprint**, pick this repository, and confirm.
3. Nothing to type: the admin email is set to chandorkaryash12@gmail.com, and Render generates the admin password and `SESSION_SECRET`.
4. Click **Apply**. After the build finishes, your site is live at `https://vector-equity-research.onrender.com` (the exact URL is shown in the dashboard).
5. Get your admin password: open the service → **Environment** → reveal **ADMIN_PASSWORD**. Log in at `/admin/login`, then set your own password in **Admin → My account**.
6. Optional: add your own domain under **Settings → Custom Domains**.

Content and uploaded images are stored on the attached 1 GB disk (`/var/data`), so they survive redeploys. The Starter instance plus disk costs roughly US$7–8/month; free instances cannot keep a disk, so edits would be lost.

Every push to `main` redeploys automatically. Back up by downloading Admin → Dashboard → *download all site data*.

### Other hosts

Any Node 18+ host works: set `NODE_ENV=production`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, point `DATA_DIR` at a persistent disk, and serve over HTTPS.

## Project layout

```
server.js              app setup, first-admin bootstrap
src/seed.js            default content, courses and research (first run only)
src/contentSchema.js   list of editable text/image fields
src/routes/            public, auth, client dashboard, admin
views/                 EJS templates (admin/ for the console)
public/                CSS, JS, logo and course artwork
test/app.test.js       end-to-end tests
```
