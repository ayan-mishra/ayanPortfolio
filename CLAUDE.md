# CLAUDE.md — ayanPortfolio

AI assistant reference for the **ayanPortfolio** codebase.

---

## Project Overview

Ayan Mishra's personal portfolio website, deployed as a static site to **GitHub Pages** at:
`https://ayan-mishra.github.io/ayanPortfolio/`

Showcases computational health research, systems projects, and academic background.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 + inline styles |
| Components | shadcn/ui, @base-ui/react |
| Data Viz | D3.js 7 |
| Icons | lucide-react |
| Fonts | Geist Sans, Geist Mono (layout), Inter + Fira Code (page) |
| Animation | tw-animate-css, custom CSS keyframes |

---

## Development Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production static build → /out
npm run start    # Serve the production build
npm run lint     # Run ESLint
```

---

## Directory Structure

```
ayanPortfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main portfolio page (all content lives here)
│   │   ├── layout.tsx        # Root layout, metadata, Geist font setup
│   │   ├── globals.css       # CSS variables, Tailwind theme, keyframe animations
│   │   └── favicon.ico
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx                  # Reusable button with CVA variants
│   │       ├── wireframe-dotted-globe.tsx  # D3.js interactive rotating globe
│   │       └── vitruvian-viz.tsx           # UnicornStudio animation embed
│   └── lib/
│       └── utils.ts          # cn() helper (clsx + tailwind-merge)
├── public/
│   ├── HOSAposter.png        # Research poster image
│   └── WRSEF_Entire_Project.pdf  # Research paper PDF
├── .github/
│   └── workflows/
│       ├── deploy.yml        # Primary GitHub Pages deployment
│       └── nextjs.yml        # Full build + deploy pipeline
├── next.config.ts            # Static export + basePath config
├── components.json           # shadcn/ui configuration
├── tsconfig.json             # TypeScript config (strict, path alias @/)
├── eslint.config.mjs         # ESLint (next/core-web-vitals + TypeScript)
└── postcss.config.mjs        # PostCSS + @tailwindcss/postcss
```

---

## Architecture Decisions

### Static Export
`next.config.ts` sets `output: "export"` — the entire site is built to `/out` as plain HTML/CSS/JS. No server-side features (API routes, server components with data fetching) are supported.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ayanPortfolio",
  images: { unoptimized: true },
};
```

`basePath: "/ayanPortfolio"` means all routes and asset paths are prefixed — always use Next.js `<Image>` and `<Link>` rather than raw `<img src="...">` to avoid broken paths.

### Client Components
All interactive components use `'use client'` at the top. The D3 globe and any component using `useState`/`useEffect` must be client components.

---

## Key Components

### `src/app/page.tsx` — Main Portfolio Page
The entire portfolio content is in a single file. Data is defined as typed arrays at the top of the file:

- `researchItems: ResearchItem[]` — research papers and systems projects
- `pipelineSteps` — research workflow visualization steps
- `techCategories` — tech stack groups for the animated carousel
- `researchInterests` — string array of research focus areas

**To add a new research item**, append to `researchItems` following the `ResearchItem` type:
```typescript
type ResearchItem = {
  title: string;
  venue?: string;
  status?: string;
  summary: string;
  abstract?: string;
  paperPath?: string;       // path under /public, e.g. "/paper.pdf"
  link?: string;            // external URL
  techStack?: string[];
  category: "research" | "systems";
  dataset?: string;
  metrics?: { label: string; value: string }[];
  downloadOnly?: boolean;   // true = PDF download only, no link preview
};
```

### `src/components/ui/wireframe-dotted-globe.tsx` — D3 Globe
- Uses `geoOrthographic` projection with rotation animation via `requestAnimationFrame`
- Fetches TopoJSON world data from CDN on mount
- Props: `width`, `height`, `className`
- Point-in-polygon collision detection prevents dot overlap on land masses

### `src/components/ui/vitruvian-viz.tsx` — UnicornStudio Embed
- Loads the UnicornStudio external script and renders an animation scene
- Contains branding-removal logic via periodic DOM queries — do not modify unless the UnicornStudio API changes

### `src/components/ui/button.tsx` — Button Component
Built with `class-variance-authority` (CVA). Available variants:
`default | destructive | outline | secondary | ghost | link`
Available sizes: `default | sm | lg | icon`

### `src/lib/utils.ts` — Utilities
Single export: `cn(...inputs)` — merges Tailwind classes safely using `clsx` + `tailwind-merge`. Always use `cn()` when conditionally applying Tailwind classes.

---

## Styling Conventions

### Color Palette (Dark Theme)
| Token | Value | Usage |
|-------|-------|-------|
| Page background | `#05070f` | Outermost wrapper |
| Card background | `#0b0f1a` | Section/card containers |
| Card border | `#1e2a45` | Default borders |
| Blue accent | `#3b82f6` | Highlights, active states |
| Muted text | `#94a3b8` | Secondary labels |
| Body text | `#e2e8f0` | Primary content text |

### Approach
- **Tailwind classes** for layout, spacing, responsive breakpoints, flex/grid
- **Inline `style` props** for theme colors and dynamic hover effects (the codebase uses `onMouseEnter`/`onMouseLeave` handlers with `useState` for hover-based border/shadow changes)
- **CSS custom properties** in `globals.css` for Tailwind theme tokens (OKLCH color space)
- **`cn()` utility** for conditional class merging

### Animations
Defined as CSS `@keyframes` in `globals.css`:
- `carousel-scroll` — infinite horizontal scroll for tech stack (40s duration)
- `ecg-wave` — ECG line drawing animation (3s loop, used in research pipeline)

---

## Data Conventions

All page content is **inline TypeScript data** in `page.tsx` — there is no CMS, database, or external data fetching. To update content, edit the data arrays directly in `page.tsx`.

Hover interaction state is managed with `useState` per-item index (e.g., `hoveredIndex: number | null`).

---

## CI/CD & Deployment

**Platform:** GitHub Pages
**Deployed branch:** `master`
**Build output directory:** `/out`

### deploy.yml (primary)
```
Push to master → npm ci → npm run build → upload /out → deploy to Pages
```

Permissions required: `contents: read`, `pages: write`, `id-token: write`

### nextjs.yml (full pipeline)
- Auto-detects package manager from lock files
- Caches `~/.npm` and `.next/cache`
- Separate `build` and `deploy` jobs with concurrency protection

> Only push to `master` when the site is ready to go live. Feature work should stay on feature branches.

---

## Git Workflow

- **`master`** — production branch, auto-deploys to GitHub Pages on push
- **Feature branches** — use descriptive names, e.g. `claude/add-claude-documentation-WCH5z`
- Never force-push to `master`
- Commit messages should follow conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`

---

## Adding New Content

### New Research Paper
1. Add entry to `researchItems` array in `src/app/page.tsx`
2. If there's a PDF, place it in `/public/` and set `paperPath: "/filename.pdf"`
3. Set `category: "research"` and fill `metrics[]` for the stat badges

### New Systems/Software Project
1. Add entry to `researchItems` with `category: "systems"`
2. Include `techStack[]` for the tech badge row
3. Use `link` for external URLs (GitHub repo, live demo)

### New Static Asset
Place files in `/public/`. Reference them with paths starting at `/` — Next.js handles the `basePath` prefix automatically when using the `<Image>` component or when assets are referenced in code via string literals that Next.js processes.

> **Note:** For raw `<img>` tags or CSS `url()`, prepend `/ayanPortfolio` manually since the basePath is only injected by Next.js components.

---

## Contact Info (in codebase)
- Email: mishra.ayan1@gmail.com
- GitHub: github.com/ayan-mishra
- LinkedIn: linkedin.com/in/ayanmishra-/
