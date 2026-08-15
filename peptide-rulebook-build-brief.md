# Peptide Rulebook — Standalone Website, Editorial, SEO/AEO, and Short-Form Social Build Brief

## 1. How to use this document

This document is the complete build and operating specification for **Peptide Rulebook**, an evidence-first peptide regulatory intelligence publication and database. A coding agent should be able to create the first production-ready version of the site using only this brief.

Requirement language:

- **MUST** means required at launch.
- **SHOULD** means implement unless technically unreasonable.
- **MAY** means a later enhancement.

The content engine is assumed to exist separately. The website MUST use an API-agnostic content adapter so a headless CMS, database, API, or local development fixtures can supply the same normalized objects.

## 2. Product definition

### Working brand

- **Name:** Peptide Rulebook
- **Tagline:** What the rules say. What changed. What it means.
- **One-line promise:** A source-linked tracker for peptide approvals, compounding decisions, enforcement, advertising rules, and jurisdiction-specific status.
- **Primary conversion:** Free “Rule Change Alert” email.
- **Secondary conversions:** Follow a substance, jurisdiction, or regulatory topic; follow social channels.

### Mission

Make peptide-related regulatory information understandable without confusing an advisory vote with an approval, a proposed rule with an effective rule, or “research use only” labeling with authorization for human use.

### Editorial thesis

Most peptide-regulation misinformation comes from collapsing distinct concepts into one word: “legal.” Peptide Rulebook must replace that false binary with precise, date-stamped status fields.

### Portfolio boundary

Peptide Rulebook owns the **regulatory status, compounding, enforcement, and health-claims compliance lens**.

- Peptide News Network may report a regulatory event as news.
- Peptide Rulebook maintains the durable, versioned status record and jurisdiction map.
- LetsTalkPeps may explain a compound’s general evidence.
- Peptide Rulebook explains only the approval, compounding, marketing, sport, import, or jurisdictional status needed to understand the rule.
- Do not republish the same article across domains. Link to the canonical owner.

### Explicit non-goals

- No legal advice, representation, or compliance certification.
- No individualized pharmacy, prescribing, importing, dispensing, or enforcement advice.
- No efficacy rankings or treatment recommendations.
- No vendor directory, sourcing assistance, couponing, or gray-market links.
- No claim that a compound is “FDA approved” unless the specific product, indication, route, and approval record support the statement.
- No claim that a committee recommendation, docket status, Category 1 nomination, shortage, or state-law silence creates approval.
- No universal “legal/illegal” badge without jurisdiction, activity, date, and source.

## 3. Audience and jobs to be done

### Primary audience: informed consumers and journalists

- Wants to know whether a viral regulatory claim is accurate.
- Needs plain language and direct links to official records.
- Must understand the difference between approved drugs, investigational substances, compounded preparations, and research chemicals.

### Secondary audience: clinicians, pharmacists, clinic operators, and compliance staff

- Needs timely status tracking and change alerts.
- Uses the site for orientation and source discovery, not as a substitute for counsel or regulator guidance.

### Tertiary audience: attorneys, policy researchers, and industry analysts

- Needs version history, official documents, dates, jurisdictions, and provenance.

### Core user journeys

1. Search a peptide and see a date-stamped U.S. status matrix.
2. Understand what an FDA advisory committee vote did and did not do.
3. Track a jurisdiction or regulator.
4. Compare 503A, 503B, approved-drug, shortage, and research-use concepts.
5. Verify a viral claim against the official record.
6. Subscribe to changes for a substance or topic.

## 4. Brand and visual direction

### Voice

- Precise, neutral, skeptical, and readable.
- Use short sentences around status changes.
- State uncertainty and pending actions explicitly.
- Separate “what happened,” “what is effective,” and “what may happen next.”
- Use “the committee recommended” instead of “FDA approved” when that is what occurred.
- Avoid sensational enforcement language.

### Visual identity

- Modern regulatory desk: off-white, ink navy, safety orange, muted green, and neutral gray.
- Use official-document excerpts, timelines, status matrices, flow diagrams, jurisdiction maps, and docket cards.
- Avoid gavels, handcuffs, police tape, syringes, and alarmist red graphics.

### Status vocabulary

Every status badge MUST contain or sit beside jurisdiction and “as of” date.

Allowed controlled statuses include:

- **Approved product — specific indication/route**
- **Not an approved drug**
- **Investigational**
- **Compounding pathway available under stated conditions**
- **Under agency evaluation**
- **Advisory recommendation only**
- **Proposed rule or guidance**
- **Final/effective action**
- **Shortage-dependent status**
- **Safety-risk list**
- **Enforcement action recorded**
- **Status not determined from authoritative sources**

Never use **legal**, **cleared**, or **allowed** without defining the activity and conditions.

## 5. Information architecture

### Required sitemap

```text
Homepage (/)
├── Substance Status (/substances)
│   └── Substance status record (/substances/{substance-slug})
├── Rulebook (/rules)
│   ├── FDA approval explained (/rules/fda-approval)
│   ├── 503A compounding (/rules/503a)
│   ├── 503B outsourcing facilities (/rules/503b)
│   ├── Drug shortages (/rules/drug-shortages)
│   ├── Research-use-only labels (/rules/research-use-only)
│   ├── Health advertising claims (/rules/health-claims)
│   └── Rule explainer (/rules/{rule-slug})
├── Jurisdictions (/jurisdictions)
│   ├── United States federal (/jurisdictions/us-federal)
│   └── State record (/jurisdictions/us/{state-slug})
├── Trackers (/trackers)
│   ├── FDA peptide compounding tracker (/trackers/fda-compounding)
│   ├── Enforcement tracker (/trackers/enforcement)
│   ├── Warning-letter tracker (/trackers/warning-letters)
│   └── Drug-shortage tracker (/trackers/drug-shortages)
├── Updates (/updates)
│   └── Regulatory update (/updates/{update-slug})
├── Documents (/documents)
│   └── Document record (/documents/{document-id-or-slug})
├── Claim Check (/claim-check)
│   └── Regulatory claim verdict (/claim-check/{claim-slug})
├── Newsletter (/newsletter)
├── Search (/search)
├── About (/about)
│   ├── Editorial standards (/about/editorial-standards)
│   ├── Status methodology (/about/status-methodology)
│   ├── Corrections (/about/corrections)
│   ├── Funding and conflicts (/about/funding)
│   └── Author/reviewer (/authors/{slug})
├── Contact (/contact)
├── Privacy (/privacy)
├── Terms (/terms)
└── Legal and medical disclaimer (/disclaimer)
```

### Header navigation

1. Substance Status
2. Rulebook
3. Jurisdictions
4. Trackers
5. Updates
6. Search icon
7. **Get Alerts** CTA

### Footer navigation

- **Database:** Substances, Jurisdictions, Documents, Trackers
- **Learn:** Rulebook, Claim Check, Updates
- **Standards:** Methodology, Editorial Standards, Corrections, Funding
- **Company:** About, Contact, Newsletter
- **Legal:** Disclaimer, Privacy, Terms
- **Network:** LetsTalkPeps and Peptide News Network

### URL and indexation rules

- Permanent entity URLs, lowercase and hyphenated.
- No dates in update URLs; date remains a structured field.
- Every old slug gets a 301 redirect when renamed.
- Filter/facet combinations are `noindex,follow` unless an editor creates a curated landing page.
- Internal search and personalized watchlists are `noindex`.
- State pages do not launch as thin placeholders. Publish only after official sources, scope, date, and reviewer are available.

## 6. Required page templates

### Homepage

MUST include:

1. Search: “Search a peptide, rule, agency, or jurisdiction.”
2. Latest verified rule changes with effective-status labels.
3. Popular substance status records.
4. “Approval is not compounding” educational strip.
5. Current federal tracker summaries.
6. Claim Check cards.
7. Methodology and source-provenance module.
8. Rule Change Alert signup.

### Substance status record

Required order:

1. Canonical substance name, synonyms, CAS/UNII when verified.
2. One-sentence status answer with U.S. federal jurisdiction and “as of” date.
3. Status matrix by activity:
   - FDA-approved product status
   - Investigational-drug status if public
   - 503A bulk-substance status
   - 503B bulk-substance status
   - Drug-shortage relevance
   - Safety-risk list status
   - Import/marketing/enforcement notes when authoritative records exist
   - WADA status when relevant, labeled as sport rules rather than general law
4. “What this means” and “What this does not mean.”
5. Timeline of official actions.
6. Controlling documents with type, agency, docket, publication/effective dates, and archive.
7. State-level notes, if reviewed.
8. Common misinformation and corrected wording.
9. Last verified, next review, reviewer, version history, and alerts CTA.

### Rule explainer

Use:

1. Direct answer
2. Who or what the rule applies to
3. Controlling law, regulation, guidance, or agency record
4. Definitions
5. Decision flowchart
6. Examples that do not imply individualized legal advice
7. Common mistakes
8. What can change the answer
9. Related statuses and official sources

### Regulatory update

Required separation:

- **Event date**
- **Publication date**
- **Effective date**, if any
- **Status:** proposed, advisory, final, stayed, withdrawn, superseded, or effective
- **What happened**
- **What changed today**
- **What did not change**
- **Next procedural step**
- **Affected records**
- **Controlling document**
- **Independent context sources**

### Regulatory Claim Check

1. Viral or common claim
2. Verdict: accurate, partly accurate, misleading, unsupported, outdated, or not verifiable
3. Correct wording
4. Controlling source
5. Date and jurisdiction
6. Why the confusion occurs
7. Update history

### Document record

- Title
- Issuing body
- Document type
- Docket/citation/identifier
- Publication, effective, expiration, and withdrawal dates
- Current status
- Official URL and archived copy/link
- Plain-language summary
- Provisions/sections used by the site
- Related substances, rules, jurisdictions, and updates
- Supersedes/superseded-by relationships

## 7. Content and data model

### Shared `Source`

```text
id, title, issuing_body_or_authors, source_type, jurisdiction,
official_status, docket_or_citation, publication_date, effective_date,
expiration_date, withdrawn_date, updated_date, url, official_pdf_url,
archive_url, access_date, is_controlling, is_primary_record,
supersedes_source_id, superseded_by_source_id, notes
```

### `Substance`

```text
id, slug, canonical_name, synonyms, unii, cas_number, identity_notes,
status_ids, document_ids, event_ids, rule_ids, jurisdiction_ids,
last_verified, next_review_at, reviewer_id, change_log
```

### `StatusAssertion`

```text
id, substance_id, jurisdiction_id, activity, status_value, status_label,
qualification, controlling_source_ids, secondary_source_ids,
valid_from, valid_to, as_of_date, confidence, reviewer_id,
reviewed_at, superseded_by_assertion_id
```

### `RegulatoryEvent`

```text
id, slug, title, event_type, agency, jurisdiction, event_date,
publication_date, effective_date, procedural_status, description,
what_changed, what_did_not_change, next_step, substance_ids,
rule_ids, document_ids, author_id, legal_reviewer_id, date_modified
```

### `Rule`

```text
id, slug, name, jurisdiction, authority_type, scope, direct_answer,
definitions, decision_logic, controlling_source_ids, examples,
limitations, last_verified, next_review_at, legal_reviewer_id
```

### `Article`

```text
id, slug, title, dek, direct_answer, key_takeaways, body, content_type,
jurisdiction_ids, substance_ids, rule_ids, event_ids, source_ids,
author_id, fact_checker_id, legal_reviewer_id, date_published,
date_modified, last_verified, next_review_at, change_log, faq_items,
social_atoms, status
```

### `SocialAtom`

```text
id, source_content_id, platform, hook, script, caption, on_screen_text,
status_assertion_ids, source_ids, jurisdiction, as_of_date, disclosure,
visual_brief, cta, approved_by, scheduled_at, published_url, metrics
```

## 8. Editorial and source standard

### Controlling-source rule

Every regulatory assertion MUST cite the official record that actually controls or documents the status. Each substantive article SHOULD also link one or two independent secondary sources when available for context and interpretation.

Examples:

- FDA approval → approval letter, label, and Drugs@FDA record.
- Advisory committee action → official meeting page, voting record, transcript, and briefing materials.
- Federal rule → official Federal Register/GovInfo text and effective date.
- Compounding status → FDA bulk-substance lists, guidance, docket, shortage list, and applicable statutory/regulatory text.
- State rule → state statute/regulation and board order/guidance.
- Warning letter → agency-hosted letter.
- Public company disclosure → SEC filing; a press release may supplement but not replace it.

### Source hierarchy

1. Statute, regulation, court order, official publication, or signed agency action.
2. Agency database, list, docket, meeting record, label, warning letter, guidance, or enforcement document.
3. State board or licensing authority publication.
4. Professional standards incorporated or referenced by applicable rules.
5. Independent regulatory journalism or named-expert analysis.
6. Company statement, trade-group statement, or practitioner commentary.

Lower levels never override higher levels.

### Core primary-source stack

- [FDA Human Drug Compounding](https://www.fda.gov/drugs/human-drug-compounding)
- [FDA bulk drug substances used in compounding](https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding)
- [FDA compounding policies and rules](https://www.fda.gov/drugs/human-drug-compounding/human-drug-compounding-policies-and-rules)
- [FDA substances presenting potential significant safety risks](https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks)
- [Drugs@FDA data](https://www.fda.gov/drugs/drug-approvals-and-databases/drugsfda-data-files) and [openFDA drug APIs](https://open.fda.gov/apis/drug/)
- [FDA Drug Shortages](https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm)
- [Federal Register](https://www.federalregister.gov/) and its [public API](https://www.federalregister.gov/developers/documentation/api/v1)
- [GovInfo](https://www.govinfo.gov/) for official federal publications
- [Regulations.gov](https://www.regulations.gov/) for dockets and comments
- [eCFR](https://www.ecfr.gov/) and [U.S. Code](https://uscode.house.gov/)
- State legislatures, state administrative codes, boards of pharmacy, and medical boards
- [USP compounding standards](https://www.usp.org/compounding), with licensing/access limitations respected
- [FTC Health Products Compliance Guidance](https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance)
- [WADA Prohibited List](https://www.wada-ama.org/en/resources/world-anti-doping-program/prohibited-list) only for sport-rule status

### Approved secondary context sources

Use one or two when they add independent interpretation:

- Reuters or Associated Press for major events
- Regulatory Affairs Professionals Society / Regulatory Focus
- ASHP and NABP educational or policy material
- Named legal analysis from recognized health-law institutions
- High-quality trade reporting that links to the official record

Do not use secondary reporting to assign a controlling status.

### Versioning rules

- Status is never timeless. Store `valid_from`, `valid_to`, and `as_of_date`.
- Never silently overwrite a status assertion. Supersede it and retain history.
- Every page displays when it was last verified.
- Fast-moving federal pages review every 30–90 days.
- State pages review at least every 180 days and immediately upon official alert.
- Proposed, advisory, and final actions must have visibly different badges and colors.
- If status cannot be verified, say so; do not infer legality from absence.

### Required review

- A qualified regulatory/legal reviewer MUST approve status methodology and high-risk interpretations before publication.
- Automated ingestion may open a draft but cannot publish a status change.
- Corrections must show old wording, corrected wording, date, and reason when material.

## 9. Content strategy and topic clusters

### Editorial mix

- 45% durable substance and rule records
- 25% regulatory updates linked into durable records
- 15% Claim Checks
- 10% jurisdiction pages and maps
- 5% methodology/transparency

### Pillar 1: Approval and authorization language

Hub: `/rules/fda-approval`

Spokes:

- Approved drug versus active ingredient
- Approval by indication, route, strength, and product
- Investigational status
- Advisory committee recommendations
- Expanded access
- Off-label prescribing versus unapproved products
- Research-use-only labeling
- Foreign approval versus U.S. approval

### Pillar 2: Compounding framework

Hubs: `/rules/503a` and `/rules/503b`

Spokes:

- What 503A and 503B mean
- Bulk drug-substance conditions
- USP/NF monographs
- Clinical-need and bulks lists
- Drug shortages and copy restrictions
- Category/list terminology and its limits
- Outsourcing-facility registration versus product approval
- State-law overlays

### Pillar 3: Enforcement and health claims

Hub: `/rules/health-claims`

Spokes:

- FDA warning letters
- FTC substantiation requirements
- Express versus implied claims
- Social influencer disclosures
- “Clinically proven,” “generic,” and “same active ingredient” wording
- Import alerts, recalls, and seizures
- How to read an enforcement letter

### Pillar 4: Substance status database

Hub: `/substances`

Prioritize substances already generating public confusion. Do not publish a record until identity, jurisdiction, status categories, and official sources are verified.

### Pillar 5: State and jurisdiction differences

Hub: `/jurisdictions`

Start with a federal overview and a small number of fully reviewed state pages. Expand only with legal review and reliable monitoring. Avoid 50 thin state pages at launch.

## 10. SEO implementation

### Search intent families

- “is {peptide} FDA approved”
- “can {peptide} be compounded”
- “503A vs 503B peptides”
- “FDA peptide list”
- “what did FDA vote on {peptide}”
- “research use only meaning”
- “{substance} legal status” with jurisdictional qualification
- “FDA warning letter {company/substance}”

### On-page requirements

- Direct jurisdiction-qualified answer in the first 100 words.
- Prominent “as of” and last-verified dates.
- Status matrix in accessible HTML.
- “What this does not mean” box near the top.
- Official source links beside the assertion they support.
- Procedural timeline and version history.
- Descriptive H2 questions with answer-first blocks.
- Clear author and reviewer credentials/conflicts.
- No headline that converts a proposal or recommendation into a final action.

### Technical SEO

- Static or server rendering; regulatory text and status tables MUST be in initial HTML.
- XML sitemap index split by substances, rules, jurisdictions, documents, updates, and videos.
- RSS/Atom feeds for all updates and optional substance-specific feeds.
- Canonicals, lowercase URLs, clean redirects, accessible breadcrumbs.
- `noindex,follow` for internal search, raw filters, saved watchlists, drafts, and duplicate archives.
- Curated filter landing pages require unique explanatory content and official-source coverage.
- Target LCP under 2.5 seconds, INP under 200 ms, CLS under 0.1.
- Generate an automated broken-link report; official-document link rot is a priority defect.
- Archive official URLs where lawful and link to official copies first.

### Structured data

Use accurate JSON-LD matching visible content:

- `Organization`, `WebSite`, `Person`, and `ProfilePage`
- `Article`/`NewsArticle`
- `BreadcrumbList`
- `Dataset` for downloadable trackers with description, license, temporal coverage, and distribution
- `VideoObject` for embedded original videos
- `ItemList` for real tracker tables

Do not claim `LegalService`, attorney status, ratings, or government affiliation unless factually true.

## 11. AEO/GEO requirements

### Answer structure

Every status page MUST answer in this order:

1. **Jurisdiction**
2. **Activity being evaluated**
3. **Current status**
4. **As-of date**
5. **Qualification/conditions**
6. **Controlling source**
7. **What the status does not imply**

Example pattern:

> As of [date], in [jurisdiction], [substance/product] has [specific status] for [activity]. This does not mean [common mistaken inference]. The controlling record is [agency/document].

### Citation-friendly content

- One status assertion per paragraph.
- Repeat dates and jurisdiction where ambiguity is possible.
- Define acronyms at first use.
- Put procedural posture in the sentence, not only a badge.
- Use stable substance, agency, docket, and document identifiers.
- Render timelines and tables as semantic HTML with text equivalents.

### Entity graph

Connect:

```text
Substance ↔ StatusAssertion ↔ Jurisdiction
StatusAssertion ↔ Rule ↔ ControllingDocument
RegulatoryEvent ↔ Agency ↔ Docket
RegulatoryEvent ↔ Superseded/Superseding Event
```

### AEO measurement

Track a fixed monthly query set. Score whether AI/search answers preserve:

- Correct jurisdiction
- Correct status and activity
- Correct procedural posture
- Correct date
- Correct distinction between approval and compounding
- Citation to Peptide Rulebook and/or the controlling official source

An answer that mentions the brand but loses the qualification is a failure.

## 12. Instagram, TikTok, and YouTube Shorts plan

### Publishing baseline

- Instagram: 2 Reels + 2 carousels weekly; Stories on active news days
- TikTok: 4 videos weekly, including rapid response when official documents publish
- YouTube Shorts: 3–4 weekly
- One material rule change can generate an update video, a correction-to-misinformation video, a timeline carousel, and a durable explainer

### Content series

1. **Status Check:** one substance, one activity, one jurisdiction, one date.
2. **What Changed / What Didn’t:** two-column rule-change format.
3. **Approval Is Not Compounding:** recurring terminology correction.
4. **Docket in 60 Seconds:** explain procedural posture and next step.
5. **Map Minute:** one state or jurisdiction difference.
6. **Claim Watch:** evaluate viral regulatory wording.
7. **Read the Letter:** annotate a warning letter or official notice.
8. **Rulebook Basics:** 503A, 503B, shortages, labels, and enforcement.

### Short-video template

```text
0–2 sec: Quote the confusing claim
2–8 sec: State the correct status with date/jurisdiction
8–25 sec: Show the controlling official record
25–40 sec: Explain what changed and what did not
40–50 sec: State the next procedural step
50–60 sec: CTA to the live status record and alert signup
```

### Example hooks

- “No, that committee vote did not approve the peptide.”
- “Three different things are being called ‘FDA approved’ here.”
- “This rule is proposed. It is not effective.”
- “A shortage can change compounding conditions without approving a new drug.”
- “Research-use-only is a label, not permission for human use.”

### Instagram-specific

- Carousels are the core save/share format.
- Recommended 8 slides: claim → verdict → controlling source → timeline → what changed → what did not → next step → source/CTA.
- Stories may show document screenshots, polls about terminology, and change alerts.
- Put jurisdiction and “as of” date on every status card.

### TikTok-specific

- Favor clear face-to-camera or annotated-document delivery.
- Health or regulatory qualifications MUST appear in voice and on screen, not only the caption.
- Do not promote or facilitate regulated-goods transactions.
- Do not respond to “where can I buy it?” or “how can I get it?” with sourcing guidance.
- Label realistic AI-generated people/scenes.

### YouTube Shorts-specific

- Searchable titles: “BPC-157 FDA Status: What the 2026 Vote Actually Means.”
- First description lines state jurisdiction and as-of date.
- Link directly to the versioned status page.
- Embed the Short on that page with a transcript and `VideoObject` markup.
- Default to 45–75 seconds; use up to three minutes for process explainers where the extra context prevents a misleading summary.

### Social evidence standard

Every status post MUST show:

- Issuing agency/body
- Document or docket identifier when available
- Jurisdiction
- Event/publication/effective date as applicable
- Procedural status
- Direct source path
- Educational/not-legal-advice disclosure where appropriate

### Community management

- Answer definitions and source-location questions.
- Do not offer individual legal/compliance advice.
- Do not interpret a person’s specific prescription, shipment, pharmacy, clinic, or legal exposure.
- Escalate material factual challenges to editorial review and correct publicly when warranted.
- Remove sourcing solicitations and unsafe use instructions.

## 13. Content-engine workflow

1. **Monitor:** FDA pages/feeds, Federal Register API, Regulations.gov, GovInfo/eCFR, drug shortages, warning letters, advisory calendars, and reviewed state sources.
2. **Ingest:** create immutable source/document records with hashes, timestamps, and identifiers.
3. **Diff:** detect changes in lists, guidance, status text, dates, and linked documents.
4. **Classify:** proposed, advisory, final, effective, stayed, withdrawn, expired, or superseded.
5. **Map impact:** identify affected substances, rules, jurisdictions, and existing status assertions.
6. **Draft:** produce a change memo containing “changed,” “unchanged,” “next step,” and citations.
7. **Human verification:** open the official document and verify operative language.
8. **Legal/regulatory review:** approve material status changes and ambiguous interpretations.
9. **Publish:** supersede old assertion, preserve history, update pages/sitemaps/feeds, and notify followers.
10. **Repurpose:** create social atoms only from approved assertions.

The system MUST NOT automatically publish a changed legal/regulatory status based solely on a text diff, news article, social post, or company statement.

## 14. Search, filters, trackers, and alerts

### Search

Search substance names/synonyms, rules, agencies, jurisdictions, dockets, document identifiers, and updates.

### Filters

- Jurisdiction
- Agency
- Activity/status category
- Procedural status
- Document type
- Effective date
- Substance
- Last verified

### Alerts

Users MAY follow a substance, jurisdiction, rule, or tracker. Collect email and alert preferences only; avoid health details.

Every alert states:

- What changed
- What did not change
- Effective date/procedural posture
- Link to official source
- Link to versioned site record

### Data export

Trackers MAY expose CSV/JSON with:

- Stable IDs
- Field definitions
- Generated timestamp
- Source URLs
- Coverage limitations
- License/terms
- Correction contact

## 15. Conversion and monetization guardrails

### Newsletter

Promise: material peptide rule changes, explained only after official-source verification.

### Potential revenue

- Free consumer alerts
- Professional alert tier
- API/data licensing
- Custom regulatory briefings with appropriate professional oversight
- Clearly separated sponsorships from relevant professional services

Do not sell “compliance certification.” Do not accept paid status changes, favorable interpretations, or sponsored substance pages. Pharmacies, clinics, compounders, vendors, or law firms may sponsor clearly labeled inventory only if editorial independence is contractually protected and conflicts are displayed.

## 16. Analytics and success metrics

### Website

- Non-branded regulatory search traffic
- Status-page engagement and return visits
- Alert signup and retention
- Official-source outbound clicks
- Time from official action to verified update
- Percentage of records within review interval
- Correction rate and correction speed
- Zero-result searches revealing missing entities

### AEO

- AI/search answers retaining jurisdiction, date, activity, and procedural posture
- Correct citations and brand mentions
- Referral traffic to status records

### Social

- Saves/shares per reach
- Completion rate
- Clicks to official-source pages
- Alert signups
- Frequency of misinformation corrected in comments or follow-up content

Do not optimize for panic-driven impressions.

## 17. Compliance and safety requirements

- Site-wide legal and medical disclaimers.
- Clear statement that the site is not a regulator, law firm, pharmacy, or healthcare provider.
- No government seals, confusing visual affiliation, or official-sounding certification.
- No individualized legal or medical advice.
- No regulated-product sales, affiliate links to peptide sellers, or sourcing directions.
- No reproduction of paywalled/proprietary standards beyond permitted quotation and summary.
- Respect document terms, copyright, and API rate limits.
- Provide correction, takedown, privacy, and contact workflows.
- If comments exist, moderate sourcing, unsafe instructions, false legal claims, and impersonation.

## 18. Build requirements and acceptance criteria

### Recommended implementation

- Type-safe component framework with server rendering/static generation.
- API-agnostic repository and development fixtures.
- Relational or graph-friendly model for versioned status assertions.
- Immutable event/document records and auditable assertion history.
- Accessible maps/timelines with text/table alternatives.
- Search and filters that work on mobile and by keyboard.
- Automated sitemaps, feeds, metadata, structured data, and social images.
- Preview and editorial approval states; drafts/previews blocked from indexing.
- Automated tests for route integrity, dates, status labels, citations, supersession, and broken links.

### Launch fixture set

- 10 substance records
- 6 rule explainers
- 5 regulatory updates
- 4 Claim Checks
- 3 tracker views
- 2 jurisdiction pages beyond federal only if fully sourced
- 3 document records
- 2 author/reviewer profiles

Never ship fabricated officials, attorneys, credentials, laws, regulatory events, status records, citations, or effective dates as production content.

### Definition of done

- All required routes and templates render responsively.
- Every status assertion has jurisdiction, activity, date, controlling source, reviewer, and version.
- Proposed/advisory/final/effective states are visually and textually distinct.
- All indexable pages have unique metadata, canonical, breadcrumbs, and applicable valid JSON-LD.
- Primary content exists in initial HTML.
- Search, filters, trackers, version history, and source links work.
- Sitemap, RSS, robots.txt, 404, redirects, privacy, terms, disclaimers, corrections, and funding pages exist.
- No broken links in fixture content.
- Social export cannot be generated from an unapproved status assertion.

## 19. Reference standards for builders and editors

- [Google: helpful, reliable, people-first content and YMYL trust](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: crawling and indexing](https://developers.google.com/search/docs/crawling-indexing)
- [Google: structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google: Dataset structured data support](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [YouTube Shorts upload guidance](https://support.google.com/youtube/answer/12921536)
- [TikTok Community Guidelines](https://www.tiktok.com/community-guidelines)
- [FTC Health Products Compliance Guidance](https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance)
- [Federal Register API documentation](https://www.federalregister.gov/developers/documentation/api/v1)

