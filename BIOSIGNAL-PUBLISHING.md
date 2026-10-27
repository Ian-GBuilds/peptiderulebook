# Biosignal publishing contract

This site receives articles from the Biosignal dashboard. The dashboard clones
this repository, writes a markdown file, commits, and pushes. Your deploy takes
it from there.

Everything below is what this site must guarantee for that to work. It is
written to be self-contained: you do not need to know anything about the
dashboard's internals to satisfy it.

Copy this file into the repository (or paste it into `CLAUDE.md`) so that anyone
working here — human or agent — knows what must not break.

---

## 1. Where articles live

Articles live in one directory, at a path relative to the repository root. That
path is registered in the dashboard.

The dashboard writes files as:

```
{content_path}/{YYYY-MM-DD}-{slug}.md
```

for example `src/content/articles/2026-07-19-semaglutide-cardiac-outcomes.md`.

Requirements:

- The directory **must exist in the repository**. An empty directory is fine —
  commit a `.gitkeep` if needed.
- The path must have **no leading or trailing whitespace**. This has caused real
  outages: a path of `myglptalk/src/content /articles` creates a directory whose
  name ends in a space, the file commits successfully, and the article is
  invisible forever.
- Your loader must match files in that directory, including the date prefix in
  the filename.

## 2. File extension

**Your content loader must accept `.md`.**

You may also accept `.mdx` for hand-authored articles that embed components. You
may not accept *only* `.mdx` — the dashboard writes `.md`, and a loader
filtering for `.mdx` alone will silently ignore every published article.

If your loader looks like this, it is wrong:

```ts
.filter((f) => f.endsWith(".mdx"))        // ✗ ignores dashboard publishes
```

```ts
.filter((f) => /\.mdx?$/.test(f))         // ✓ accepts both
```

For an Astro `glob()` loader, `['**/*.md', '!README.md']` satisfies the
contract. Use `['**/*.md', '**/*.mdx', '!README.md']` only if this site also
has hand-authored `.mdx` articles — accepting `.mdx` is permitted, never
required.

## 3. Frontmatter you will receive

YAML fenced by `---`, followed by a blank line and the markdown body.

**Always sent:**

| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `dek` | string | One-sentence summary. Also use it as the meta/OG description. |
| `date` | `YYYY-MM-DD` | Publication date. Matches the filename prefix. |
| `category` | string | One of your declared values — see §5. |
| `tags` | string[] | May be empty. |
| `sources` | `{title, url}[]` | May be empty. |
| `draft` | boolean | See §6. |

**Sometimes sent:** `updated`, `hero`, `heroAlt`, `featured`.

A real published file:

```markdown
---
title: Semaglutide cuts cardiac risk by 20% in new trial
dek: A 17,600-patient NEJM trial reports the first hard cardiovascular outcome data for semaglutide.
date: 2026-07-19
category: clinical-trials
tags:
  - semaglutide
  - cardiovascular
sources:
  - title: Semaglutide and Cardiovascular Outcomes
    url: https://www.nejm.org/doi/full/10.1056/NEJMoa2307563
draft: false
---

Article body starts here.
```

## 4. The rule that matters most

**Your schema may mark a field required only if it appears in the "always sent"
list above. Every other field must be optional or carry a default.**

This is the whole contract in one sentence. If you add a required field the
dashboard does not send, every dashboard publish fails your build.

Correct:

```ts
title: z.string(),                                  // ✓ always sent
dek: z.string(),                                    // ✓ always sent
date: z.coerce.date(),                              // ✓ always sent
category: z.enum(CATEGORIES),                       // ✓ always sent
tags: z.array(z.string()).default([]),              // ✓ defaulted
author: z.string().default('Editorial'),            // ✓ defaulted — fine to add
reviewedBy: z.string().optional(),                  // ✓ optional — fine to add
```

Wrong:

```ts
author: z.string(),                                 // ✗ required, never sent
heroImage: z.string(),                              // ✗ required, only sometimes sent
```

Adding a required field is the most likely way this site silently stops
accepting articles. The failure surfaces as a **build error on this site**, not
as an error in the dashboard.

## 5. Categories

Declare your category values in one place:

```ts
export const CATEGORIES = ['research', 'clinical-trials', 'regulation'] as const;
```

The dashboard stores these differently — as a map from the editorial name an
editor picks to the value written into frontmatter:

```json
[
  { "name": "Research Digest",  "site_category": "research" },
  { "name": "Clinical Trials",  "site_category": "clinical-trials" },
  { "name": "Regulatory & FDA", "site_category": "regulation" }
]
```

Several editorial names may map to one `site_category`; that is intentional and
lets editors use richer labels than the site's URL-safe values. What must match
is the **set of `site_category` values** on the dashboard side and the
`CATEGORIES` enum here.

Categories are per-site by design — a telehealth publication and a peptide
research publication have genuinely different sections. There is no shared
vocabulary to conform to.

Two requirements:

- Use an **enum**, not a bare string. `category: z.string()` accepts anything,
  so a mismatch renders a broken page instead of failing the build.
- Your enum must contain **every** `site_category` value registered in the
  dashboard for this site. The dashboard rejects a publish whose category is not
  in its own map, but it cannot see your enum — keeping the two aligned is a
  manual step, and a value present in the dashboard but missing here will fail
  this site's build.

## 6. Drafts must be hidden

`draft: true` must be excluded from:

- article listings and category pages
- RSS/Atom feeds
- `sitemap.xml`
- search indexes

The dashboard writes `draft: false` when publishing, so in normal operation you
will not receive drafts. But a site that ignores the flag will leak unpublished
work the moment one appears, and drafts do appear during editing.

Filter on read, not just on render — a draft excluded from the article page but
present in the sitemap is still leaked.

## 7. Independence

This site must build and deploy without the dashboard:

- No environment variables supplied by the dashboard.
- No runtime calls back to the dashboard or its database.
- A push to the default branch triggers the deploy.

The dashboard's only interaction with this repository is: clone, write a file,
commit, push. If the site needs anything else from us at build or run time, the
contract is broken.

---

## Verifying conformance

Before registering a site — or after changing a schema, loader, or content path
— confirm all five:

1. **Write a test file by hand** at `{content_path}/2026-01-01-contract-test.md`
   containing exactly the frontmatter in §3 and a paragraph of body text.
2. **Build the site.** It must succeed. A schema error here means a required
   field was added that the dashboard does not send (§4).
3. **Confirm the article renders** — visible in listings and at its own URL.
   Committing is not the same as rendering, and this is the failure mode that
   has actually occurred.
4. **Flip `draft: true`, rebuild.** The article must disappear from listings,
   feeds, and the sitemap (§6).
5. **Delete the test file** and commit.

Step 3 is the one that catches real problems. Every publishing failure in this
network so far has taken the form "the file landed and nobody could see it," and
only a rendered page disproves that.

## Common failure modes

| Symptom | Cause |
|---|---|
| Article commits, never appears | Loader filters `.mdx` only (§2), or `content_path` has a stray space (§1) |
| Build fails after a dashboard publish | Schema requires a field the dashboard does not send (§4) |
| Category renders as broken or blank | Site enum missing a value registered in the dashboard (§5) |
| Unpublished article visible in sitemap | `draft` not filtered on every read path (§6) |
