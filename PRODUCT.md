# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 static site with React islands, Tailwind CSS v4, TypeScript. Content sourced from JSON fixtures via an API-agnostic adapter. Deployed to Vercel.

## Users

- **Primary:** Informed consumers and journalists verifying viral peptide regulatory claims.
- **Secondary:** Clinicians, pharmacists, clinic operators, and compliance staff tracking status changes.
- **Tertiary:** Attorneys, policy researchers, and industry analysts needing version history, documents, and provenance.

## Product Purpose

Peptide Rulebook is an evidence-first regulatory intelligence publication and database. It makes peptide-related regulatory information understandable without collapsing distinct concepts into a single “legal/illegal” binary.

## Positioning

A source-linked tracker that replaces the false “is it legal?” binary with precise, date-stamped, jurisdiction-specific status fields tied to controlling documents.

## Operating Context

- Regulatory status changes frequently; every assertion must carry an “as of” date and controlling source.
- Portfolio boundary: regulatory status, compounding, enforcement, and health-claims compliance only.
- Related properties (Peptide News Network, LetsTalkPeps) own news and general evidence; link to them rather than duplicate.
- Primary conversion is a free “Rule Change Alert” email.

## Capabilities and Constraints

- No legal advice, medical advice, compliance certification, or individualized guidance.
- No efficacy rankings, treatment recommendations, vendor directories, or gray-market links.
- Status vocabulary is controlled: every badge must include jurisdiction and date.
- Content model: substances, rules, updates, claim checks, trackers, documents, jurisdictions, authors.
- Launch content: 10 substances, 6 rules, 5 updates, 4 claim checks, 3 trackers, 16 documents, 2 jurisdictions, 2 authors.

## Brand Commitments

- Name: Peptide Rulebook
- Tagline: What the rules say. What changed. What it means.
- Voice: precise, neutral, skeptical, readable; state uncertainty explicitly.
- Visual identity: modern regulatory desk — off-white, ink navy, safety orange, muted green, neutral gray.
- Imagery: official-document excerpts, timelines, status matrices, flow diagrams, jurisdiction maps, docket cards.
- Avoid: gavels, handcuffs, police tape, syringes, alarmist red graphics.

## Evidence on Hand

- Full content fixtures in `src/content/` with controlling sources and reviewer IDs.
- Peptide regulatory documents from FDA, WADA, and California State Board of Pharmacy.
- Existing build brief at `peptide-rulebook-build-brief.md`.

## Product Principles

1. Source-linked over speculative: every status points to a controlling document.
2. Precise over alarmist: distinguish advisory votes, proposed rules, effective rules, and approvals.
3. Jurisdiction-specific over universal: status depends on place and activity.
4. Readable over exhaustive: plain language first, full provenance available.
5. Transparent over authoritative: show uncertainty, pending actions, and review dates.

## Accessibility & Inclusion

Target is WCAG 2.1 AA. Content must remain understandable to non-specialists while precise enough for professionals.
