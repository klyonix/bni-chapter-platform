# BNI Azpire — Power Teams

A **power team portfolio** for **BNI Azpire, Greater Coimbatore** — showcasing
the chapter's power teams and their members. Built as a statically-exported
Next.js site and hosted on GitHub Pages.

> **Status:** Project scaffold. The structure and deployment pipeline are ready;
> product features are intentionally **not** implemented yet.

> **Scope:** This is a portfolio for the power teams of a single chapter (BNI
> Azpire). It is **not** a multi-chapter platform and does not manage BNI
> chapters.

**Hosted by [KlyONIX Tech Consulting Pvt Ltd](https://klyonix.com).**
Production domain: **https://azpire.klyonix.in**

---

## Overview

The site presents the **power teams** of BNI Azpire and the **members** within
each team from a single codebase. Routing and data are structured so new power
teams and members are added as data, not as bespoke code.

Planned (future) capabilities: power team pages, member profiles, QR landing
pages, referral tracking, visitor registration, and analytics. None of these
are built yet — see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

### Planned URL architecture

```
/                  Home (BNI Azpire power teams)
/civil             Power team: Civil
/manufacturing     Power team: Manufacturing
/healthcare        Power team: Healthcare
/finance           Power team: Finance
/member/[slug]     Individual member profile
```

---

## Tech stack

| Area           | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | Next.js 15 (App Router)                            |
| Language       | TypeScript (strict)                                |
| Styling        | Tailwind CSS 3                                     |
| Linting        | ESLint (`eslint-config-next`) + `eslint-config-prettier` |
| Formatting     | Prettier (+ `prettier-plugin-tailwindcss`)         |
| Git hooks      | Husky + lint-staged (pre-commit)                   |
| CI/CD          | GitHub Actions                                     |
| Hosting        | GitHub Pages (static export)                       |
| Rendering      | Static Site Generation via `output: 'export'`      |

---

## Project structure

```
bni-chapter-platform/
├─ .github/workflows/deploy.yml   # CI/CD: build, export, deploy to Pages
├─ .husky/pre-commit              # runs lint-staged
├─ docs/                          # architecture & project docs
├─ public/                        # static assets (copied verbatim to output)
│  ├─ images/                     # includes og-default.png (OpenGraph)
│  ├─ icons/
│  ├─ members/
│  ├─ favicon.ico                 # favicon placeholder — replace with real asset
│  ├─ CNAME                       # custom domain for GitHub Pages
│  └─ .nojekyll                   # disable Jekyll processing on Pages
├─ src/
│  ├─ app/                        # App Router (layout, pages, metadata)
│  ├─ components/                 # reusable UI components
│  ├─ layouts/                    # shared layout wrappers
│  ├─ lib/                        # business logic / data access
│  ├─ hooks/                      # React hooks
│  ├─ data/                       # static/seed data
│  ├─ types/                      # shared TypeScript types
│  ├─ styles/                     # globals.css (Tailwind entry)
│  └─ utils/                      # pure utilities
├─ next.config.mjs                # static export configuration
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

Empty folders are kept in version control via `.gitkeep` placeholders.

---

## Local development

**Prerequisites:** Node.js 20+ and npm.

```bash
# 1. Install dependencies (also sets up Husky hooks via "prepare")
npm install

# 2. Start the dev server
npm run dev
```

Open http://localhost:3000.

### Useful scripts

| Script                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the development server.                      |
| `npm run build`        | Production build + static export to `out/`.        |
| `npm run serve`        | Serve the exported `out/` locally to preview.      |
| `npm run lint`         | Run ESLint.                                        |
| `npm run lint:fix`     | Run ESLint with autofix.                           |
| `npm run format`       | Format the codebase with Prettier.                 |
| `npm run format:check` | Check formatting without writing.                  |
| `npm run typecheck`    | Type-check with `tsc --noEmit`.                    |

---

## Build & static export

```bash
npm run build
```

Because `next.config.mjs` sets `output: 'export'`, the build produces a fully
static site in the **`out/`** directory — no Node server required. Preview it
locally with:

```bash
npm run serve   # serves ./out on http://localhost:3000
```

Notes:

- `images.unoptimized: true` — GitHub Pages has no image optimization server.
- `trailingSlash: true` — emits `route/index.html` so clean URLs resolve on Pages.
- `public/CNAME`, `public/.nojekyll`, and the favicon are copied into `out/`
  automatically.

---

## Deployment (GitHub Pages)

Deployment is automated. **Every push to `main`** triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which:

1. Installs dependencies (`npm ci`)
2. Lints and type-checks
3. Builds and exports the static site to `out/`
4. Uploads the artifact and deploys it to GitHub Pages

### One-time repository setup

1. Push this repository to **`https://github.com/klyonix/bni-chapter-platform`**.
2. In GitHub: **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.
3. Push to `main` (or run the workflow manually) to trigger the first deploy.

### First push (from a local clone of this scaffold)

```bash
git init
git add .
git commit -m "chore: initialize BNI Chapter Platform scaffold"
git branch -M main
git remote add origin https://github.com/klyonix/bni-chapter-platform.git
git push -u origin main
```

> A committed `package-lock.json` is included so `npm ci` works in CI on the
> first run. Commit lockfile changes whenever you update dependencies.

---

## Custom domain: `azpire.klyonix.in`

The repo is domain-ready. `public/CNAME` already contains `azpire.klyonix.in`,
so GitHub Pages will bind the domain on deploy.

### GitHub side

1. **Settings → Pages → Custom domain** → confirm `azpire.klyonix.in` is set
   (it should populate automatically from the `CNAME` file).
2. Enable **Enforce HTTPS** once the certificate is provisioned (may take a few
   minutes to an hour after DNS resolves).

### GoDaddy DNS records

`azpire` is a **subdomain**, so add a single **CNAME** record in GoDaddy
(Domains → `klyonix.in` → DNS → Records):

| Type  | Name (Host) | Value                    | TTL      |
| ----- | ----------- | ------------------------ | -------- |
| CNAME | `azpire`    | `klyonix.github.io`      | 1 hour   |

Notes:

- The CNAME **target is the GitHub Pages host** `klyonix.github.io` (the org's
  Pages domain), **not** the repository — GitHub routes to the right repo using
  the `CNAME` file in the deployment.
- Do **not** add an A record for a subdomain; A records (`185.199.108.153`, etc.)
  are only for apex/root domains.
- After saving, verify with `dig azpire.klyonix.in +short` — it should resolve
  through `klyonix.github.io`. DNS propagation can take up to a few hours.
- Keep the `public/CNAME` file in the repo; deleting it will unset the custom
  domain on the next deploy.

---

## Metadata & branding

Global metadata (title template, description, favicon, and OpenGraph/Twitter
defaults) lives in [`src/app/layout.tsx`](src/app/layout.tsx). Replace the
placeholders when brand assets are ready:

- `public/favicon.ico` — placeholder brand mark.
- `public/images/og-default.png` — placeholder 1200×630 OpenGraph image.

---

## License

Released under the [MIT License](LICENSE). © 2026 KlyONIX Tech Consulting Pvt Ltd.
