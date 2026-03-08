# samir-bettahar.dev

Personal portfolio and blog built with Astro + React + Tailwind.

## Tech Stack
- Astro 5
- React 19
- Tailwind CSS 4
- MDX + Astro Content Collections
- Cloudflare Pages deployment

## Features
- Multilingual portfolio sections (`en`, `fr`, `ar`)
- Blog powered by content collections (`src/content/blog`)
- Per-page and per-post SEO metadata
- Contact form integration via Web3Forms

## Local Development
```bash
pnpm install
pnpm run dev
```

Site runs at `http://localhost:4321`.

## Commands
- `pnpm run dev`: start local dev server
- `pnpm run build`: production build
- `pnpm run preview`: preview production build locally
- `pnpm run check`: Astro type/content checks
- `pnpm run audit:dev`: local Unlighthouse scan against `localhost:4321`

## Public Repo Safety
Before making the repo public, verify:
- No private API tokens/keys are committed
- Deployment config contains no secrets (`wrangler.jsonc` is safe)

## Project Structure
- `src/components`: UI components
- `src/pages`: routes (`/`, `/blog`, etc.)
- `src/content/blog`: blog posts (MDX)
- `public`: static assets
- `scripts`: helper scripts

## Deployment
Configured for static output (`astro build`) and Cloudflare Pages.
