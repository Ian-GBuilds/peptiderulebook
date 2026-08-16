# Peptide Rulebook

A source-linked tracker for peptide approvals, compounding decisions, enforcement, advertising rules, and jurisdiction-specific status. **What the rules say. What changed. What it means.**

- **Production**: https://peptiderulebook.com
- **Stack**: Astro (static) + React islands + Tailwind v4, deployed on Vercel.

## Interactive features

The reference content is now explorable, not just readable:

- **Substance Explorer** (`/substances` and homepage) — live search across names, brand names, and aliases; status facet chips (approved, not-approved, investigational, discontinued, compounding pathway, safety risk, WADA-prohibited, had a shortage); activity segmented filter (FDA / 503A / 503B / shortage / WADA); sort by name / recently verified / most statuses; match highlighting and result counts.
- **Compare tool** — select up to 3 peptides into a sticky tray, then open a side-by-side comparison drawer across every regulatory activity. Selection persists across navigation via `sessionStorage`.
- **Status-at-a-glance matrix** (homepage) — every peptide × activity as color-coded regulatory-stamp dots, with hover tooltips showing the qualified status and a legend.
- **Interactive claim checks** (`/claim-check` and homepage) — read the claim, form a view, then "Reveal the verdict" for the fact-checked answer, correct wording, and why the confusion exists.
- **FAQ accordions** on substance detail pages.

All interactivity is implemented as Astro React islands (`client:load` / `client:visible`) so pages stay static, fast, and SEO-friendly.

## Functional entry points

| Path | Description |
| --- | --- |
| `/` | Home: latest updates, interactive status matrix, substance explorer, claim checks, trackers |
| `/substances` | Searchable/filterable/comparable substance directory |
| `/substances/[slug]` | Substance record: status matrix, timeline, sources, FAQ accordion |
| `/rules`, `/rules/[slug]` | Rulebook entries (503A, 503B, FDA approval, shortages, health claims, RUO) |
| `/claim-check`, `/claim-check/[slug]` | Interactive claim checks |
| `/jurisdictions`, `/trackers`, `/updates`, `/documents` | Supporting reference sections |

## Data architecture

- **Content**: flat JSON fixtures under `src/content/{substances,rules,updates,claims,documents,jurisdictions,trackers,authors}` loaded via `src/data/adapter.ts`. Types in `src/data/types.ts`.
- **No runtime database** — fully static build. Client interactivity operates on data serialized into island props.
- Shared island logic (status→stamp tone mapping, facets, activity columns) lives in `src/components/status-utils.ts`.

## Interactive components (React islands)

- `SubstanceExplorer.tsx` — search + filter + sort + compare tray
- `CompareDrawer.tsx` — side-by-side comparison modal
- `StatusOverviewMatrix.tsx` — homepage status matrix with hover tooltips
- `ClaimCardInteractive.tsx` — reveal-the-verdict claim cards
- `FaqAccordion.tsx` — expandable FAQ

## Development

```sh
npm install
npm run dev        # local dev at localhost:4321
npm run build      # static build to ./dist
npm run preview    # preview the build
npm test           # astro check + build + fixture/link validation
```

## Deployment

- **Platform**: Vercel (auto-deploys from `main`).
- **Status**: ✅ Active
- **Last updated**: 2026-08-16 — added interactive explorer, compare, status matrix, claim reveals, and FAQ accordions while preserving the reference-desk design system (see `DESIGN.md`).
