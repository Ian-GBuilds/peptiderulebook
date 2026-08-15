# Peptide Rulebook — Design System

## Direction

The site is a **reference desk / annotated regulatory document**: a credible, source-linked surface that feels like working with a well-organized file of official papers, stamps, and marginalia. The aesthetic refuses the generic AI-SaaS look (no Inter-only typography, no blue/purple gradients, no glass cards, no bouncing motion) and instead borrows from physical regulatory artifacts: warm paper, ink navy type, hairline rules, colored approval stamps, and a baseline grid.

## Color strategy

Restrained neutral ground with functional color used like regulatory stamps: small, bordered, and meaningful.

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Ground | `ground` | `#F7F4EC` | page background |
| Paper | `paper` | `#FDFBF6` | cards, header, footer, raised surfaces |
| Ink | `ink` | `#0D1B2A` | primary text, headings, links |
| Ink muted | `ink-muted` | `#4A5568` | secondary text, captions |
| Hairline | `hairline` | `#D9D3C6` | borders, dividers, rules |
| Accent | `accent` | `#C84C1B` | CTA, active link underline, primary action |
| Accent dark | `accent-dark` | `#9F3A14` | accent hover |
| Stamp green | `stamp-green` | `#2A5C46` | approved / final effective |
| Stamp green bg | `stamp-green-bg` | `#E8F0EB` | approved badge background |
| Stamp amber | `stamp-amber` | `#9C6F12` | advisory / proposed / partly accurate |
| Stamp amber bg | `stamp-amber-bg` | `#F5ECD6` | advisory badge background |
| Stamp red | `stamp-red` | `#A92525` | enforcement / prohibited / misleading |
| Stamp red bg | `stamp-red-bg` | `#F7E5E5` | enforcement badge background |
| Stamp blue | `stamp-blue` | `#2F5C8A` | resolved / secondary |
| Stamp blue bg | `stamp-blue-bg` | `#E6EEF5` | resolved badge background |

## Typography

- **Body / UI**: `Source Sans 3` (humanist sans, not Inter).
- **Display / headings**: `Source Serif 4` (transitional serif with a document feel).
- **Metadata / dates / docket numbers / badges**: `Sometype Mono`.

Scale is defined by Tailwind defaults; headings stay under `3rem` on mobile and `3.75rem` on desktop. Display tracking does not exceed `-0.02em`. Body measure is capped at `70ch` for reading passages.

## Spacing

8px baseline grid. Sections are separated by `py-10` to `py-16`; related items sit tight. More space above a heading than below it. Hairline rules (`border-hairline`) separate sections instead of heavy backgrounds.

## Components

### Layout
- Header: `bg-paper`, `border-b hairline`, no shadow.
- Footer: `bg-paper`, `border-t hairline`, no shadow.
- Page background: `bg-ground`.

### Cards
- `bg-paper`, `border border-hairline`, `rounded-sm` (2px), no shadow.
- Hover: `hover:border-ink/30 hover:bg-white` with a `transition-colors`.
- No nested cards; related items stack with hairline dividers.

### Buttons
- Primary: `bg-ink text-paper hover:bg-accent-dark`, squared corners (`rounded-sm`).
- Secondary: `bg-paper border-hairline text-ink hover:border-ink/40`.
- Focus: `focus:outline-none focus:ring-2 focus:ring-accent/50`.

### Badges / stamps
- Bordered rectangles with `rounded-sm`, mono type, uppercase tracking.
- Color pairs: `bg-stamp-*-bg text-stamp-* border-stamp-*/30`.
- Never gray text on colored backgrounds.

### Tables
- `border border-hairline`, header `bg-paper`, rows divided by `hairline`.
- Mono dates and docket identifiers.

### Timeline
- Vertical hairline; circular markers in `accent` with a paper ring.
- Date labels in mono uppercase.

### Forms
- Inputs: `bg-paper border-hairline rounded-sm focus:border-accent focus:ring-accent/30`.
- Placeholder text `ink-muted`.

### Search modal
- Backdrop `ink/30`, modal `bg-paper border-hairline rounded-sm`.
- Results highlight via `bg-ground` hover.

### Disclaimer banner
- Amber stamp treatment: `bg-stamp-amber-bg border-l-4 border-stamp-amber` (the only place a colored left border is used, because it is a stamp-like alert).
- Must remain visible on every record page.

## Motion

One authored entrance: a short fade/slide-up (`animate-reveal`) on the main content area, using a custom `ease-out` curve (`cubic-bezier(0.16, 1, 0.3, 1)`). Hover states transition color and border only. No bounce, elastic, or scale-bouncing effects. Respect `prefers-reduced-motion`.

## Accessibility

- WCAG 2.1 AA target maintained.
- Body text contrast against ground ≥ 16:1.
- All interactive elements have visible focus rings.
- Status badges maintain ≥ 4.5:1 text contrast.
