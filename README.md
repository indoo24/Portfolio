# Yousef Mohamed Kandeel — Portfolio

Personal portfolio for Yousef Mohamed Kandeel, Flutter Developer and Software Engineer.
A statically generated Next.js site with case studies for selected mobile projects.

- **Stack:** Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4,
  Motion (mobile menu only, loaded on demand), Lucide icons.
- **Rendering:** every route is prerendered at build time. `ensureStatic = "navigation"` in
  `src/app/layout.tsx` makes the build fail if anything starts rendering per request.
- **No backend, database or CMS.** Content lives in typed TypeScript files.

## Requirements

- Node.js **20.9 or newer** (developed on Node 22)
- npm 10+
- Network access during `npm run build` (fonts are downloaded once by `next/font` and then
  self-hosted with the site)

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command                | What it does                                                       |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run dev`          | Development server with hot reload                                 |
| `npm run build`        | Production build (static prerendering of every page and image)     |
| `npm start`            | Serves the production build on port 3000                           |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules)                |
| `npm run typecheck`    | Generates route types and runs `tsc --noEmit`                      |
| `npm run format`       | Formats the codebase with Prettier (+ Tailwind class sorting)      |
| `npm run format:check` | Verifies formatting without writing                                |
| `npm run check`        | `format:check` + `lint` + `typecheck` — run this before every push |
| `npm run images`       | Converts screenshots into optimized WebP (see below)               |

## Project structure

```
src/
  app/
    layout.tsx                 Root layout, fonts, global metadata
    page.tsx                   Home page (+ Person/WebSite JSON-LD)
    projects/[slug]/           Case-study pages and their social images
    opengraph-image.tsx        Generated social card for the home page
    sitemap.ts, robots.ts      Generated from the content and site URL
    icon.svg, not-found.tsx
    globals.css                Design tokens (colors, type scale, motion)
  components/
    layout/                    Header, mobile menu (+ lazily loaded panel), footer
    sections/                  Hero, Work, About, Skills, Contact
    project/                   ProjectCard, ProjectCover, ScreenshotGallery, ScreenshotStrip,
                               ArchitectureDiagram
    ui/                        ButtonLink, Container, SectionHeading, TagList, icons
  content/                     ← all site copy and data
    profile.ts                 Name, title, links, résumé, availability, hero log, navigation
    projects.ts                Projects and case studies
    about.ts                   About text, principles, experience
    skills.ts                  Skill groups and where each skill was used
    types.ts                   Types for all of the above
  lib/                         Site URL resolution, JSON-LD and OG image helpers
  assets/og/                   Fonts used to render social images (OFL)
public/projects/<slug>/        Optimized project screenshots (WebP)
scripts/optimize-images.mjs    Screenshot → WebP converter
```

## Updating content

All copy lives in `src/content/`; components never contain personal details.

- **Contact details, social links, title:** `src/content/profile.ts`.
- **Résumé:** set `resumeUrl` in `profile.ts`. Set it to `null` to hide every résumé link. To
  host the file yourself, put it at `public/resume.pdf` and use `resumeUrl: "/resume.pdf"`.
- **"Open to roles & freelance work" badge:** `availability.open` in `profile.ts`.
- **Projects:** `src/content/projects.ts`. A project with a `caseStudy` gets a page at
  `/projects/<slug>`, a row in "Selected work", a sitemap entry and a social image automatically.
  Projects without one appear under "More projects".
- **Store links:** `links.googlePlay` on a project adds a "Google Play" link to its card and
  case study.
- **Project status label:** `status` (`client`, `freelance`, `personal`, `in-development`,
  `concept`); the labels live in `statusLabels` in `projects.ts`.
- **About, principles and experience:** `src/content/about.ts`.
- **Skills:** `src/content/skills.ts`. `usedIn` lists the projects where a skill appears.

Keep every statement verifiable. Don't add metrics, user counts, store listings or
client names unless there is a source for them.

## Adding or replacing screenshots

Each project can have `screenshots` and/or a `diagram` in `src/content/projects.ts`:

- **`format: "slides"`** — landscape presentation images (1440 × 1080) with the app screen and
  notes, as used for Scenario Omni Channel and AlEyada. The first slide is the home-page card
  visual.
- **`format: "phones"`** — portrait device screenshots on a transparent background (720 × 1280),
  as used for Saloonsa POS, Intelligent Todo and Bahaa Discover. The first three appear on a
  case-study card; compact cards show all of them in a scrollable row.
- **`diagram`** — the architecture diagram. It appears on the case-study page, and on the card
  when a project has no screenshots.

Case-study pages show every screenshot in a gallery; each one opens full size in a new tab.

To add or replace screenshots:

1. Put the raw PNG/JPG files in a folder **outside `public/`**, named the way you want them
   published (e.g. `doctor-search.png`), and run:

   ```bash
   npm run images -- ~/path/to/screens aleyada 1440   # slides: keep full width
   npm run images -- ~/path/to/screens saloonsa-pos 720  # phones
   ```

   Files are converted to WebP and written to `public/projects/<slug>/`, and the script prints
   each file's size.

2. Add them to the project in `src/content/projects.ts`, in display order:

   ```ts
   screenshots: {
     format: "phones",
     images: [
       phone("saloonsa-pos/cashier", "Arabic cashier screen with service categories and prices."),
     ],
     caption: "Screens from the Android app.",
   },
   ```

   `slide()` and `phone()` fill in the path and standard dimensions. Write alt text that says what
   the screen shows. If an image has different dimensions, pass a full object
   (`{ src, alt, width, height }`) instead.

Don't commit raw PNGs into `public/`, because everything there is deployed. Remove or blur real
customer data before publishing.

## Contact form (optional)

The site uses a `mailto:` link and a "Copy email" button, which work without any backend. To add a
form later, use a hosted form endpoint rather than building a backend:

- **Netlify Forms** — free on Netlify; add `data-netlify="true"` to a static form.
- **Formspree** or **Web3Forms** — any host; post the form to their endpoint.
- **Vercel + Resend** — a Route Handler that sends email through Resend (requires an API key).

Show a success or failure message only after the endpoint responds.

## SEO configuration

The production URL is set in **`.env.production`** (committed):

```bash
NEXT_PUBLIC_SITE_URL=https://portfolio-three-ecru-39.vercel.app
```

When you add a custom domain, change that line (or set the same variable in the Vercel dashboard,
which takes precedence) and redeploy.

The canonical origin is resolved in `src/lib/site.ts`, in this order:

1. `NEXT_PUBLIC_SITE_URL` — from the environment or `.env.production`
2. `VERCEL_PROJECT_PRODUCTION_URL` — set automatically on Vercel
3. `URL` — set automatically on Netlify
4. `http://localhost:3000` — local fallback

Canonical links, Open Graph URLs, `sitemap.xml`, `robots.txt` and JSON-LD all derive from it, so
changing the domain only needs that variable and a redeploy.

## Deployment

The site has no runtime secrets. The only environment variable is `NEXT_PUBLIC_SITE_URL`, which
`.env.production` already provides.

**Live site:** <https://portfolio-three-ecru-39.vercel.app/> (Vercel, deploys from `main`).

### Vercel (recommended)

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository. The Next.js preset is detected
   automatically (build: `npm run build`, output handled by Vercel).
3. To use a custom domain, add it under **Settings → Domains**, then update
   `NEXT_PUBLIC_SITE_URL` in `.env.production` and push.

### Netlify

1. **Add new site → Import an existing project** and choose the repository.
2. Netlify detects Next.js and applies its Next.js runtime automatically. Build command
   `npm run build`; leave the publish directory as suggested.
3. Optionally set `NEXT_PUBLIC_SITE_URL`.

### Any Node.js host

```bash
npm ci
npm run build
npm start            # serves on PORT (default 3000)
```

### Publishing changes

Both Vercel and Netlify redeploy on every push to the production branch and create preview
deployments for pull requests. Run `npm run check && npm run build` locally before pushing.

After the first production deploy, submit `https://<your-domain>/sitemap.xml` in Google Search
Console.

## Design notes

- **Colors:** defined as tokens in `src/app/globals.css`. Every text color meets WCAG AA
  (≥ 4.5:1) on every surface; the lime accent is used only for actions, focus and status.
- **Type:** Instrument Serif (headings), Hanken Grotesk (body), JetBrains Mono (labels), all
  self-hosted through `next/font`.
- **Motion:**
  - The hero entrance and section reveals are CSS-only. Reveals use scroll-driven animations and
    fall back to static content where unsupported.
  - Motion powers only the mobile menu, and its code is fetched when the menu is first used.
  - Everything respects `prefers-reduced-motion`, and all content is visible without JavaScript.

## Credits

- Fonts: Instrument Serif, Hanken Grotesk and JetBrains Mono — SIL Open Font License.
- GitHub and LinkedIn marks: [Simple Icons](https://simpleicons.org) (CC0).
