#!/usr/bin/env node
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, '..', 'src', 'content');

function loadDir(name) {
  const dir = join(contentDir, name);
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf-8')));
}

const substances = loadDir('substances');
const rules = loadDir('rules');
const updates = loadDir('updates');
const claims = loadDir('claims');
const documents = loadDir('documents');
const jurisdictions = loadDir('jurisdictions');
const trackers = loadDir('trackers');
const authors = loadDir('authors');

const documentIds = new Set(documents.map((d) => d.id));
const substanceSlugs = new Set(substances.map((s) => s.slug));
const ruleSlugs = new Set(rules.map((r) => r.slug));
const jurisdictionSlugs = new Set(jurisdictions.map((j) => j.slug));
const authorIds = new Set(authors.map((a) => a.id));

let errors = [];

function assert(cond, msg) {
  if (!cond) errors.push(msg);
}

function isDate(str) {
  return typeof str === 'string' && !isNaN(Date.parse(str));
}

// Counts
assert(substances.length === 10, `Expected 10 substances, got ${substances.length}`);
assert(rules.length === 6, `Expected 6 rules, got ${rules.length}`);
assert(updates.length === 5, `Expected 5 updates, got ${updates.length}`);
assert(claims.length === 4, `Expected 4 claim checks, got ${claims.length}`);
assert(trackers.length === 3, `Expected 3 trackers, got ${trackers.length}`);
assert(jurisdictions.length >= 2, `Expected at least 2 jurisdictions, got ${jurisdictions.length}`);
assert(authors.length >= 2, `Expected at least 2 authors, got ${authors.length}`);

// Substance assertions
for (const s of substances) {
  assert(s.status_assertions.length > 0, `Substance ${s.slug} has no status assertions`);
  for (const a of s.status_assertions) {
    assert(a.jurisdiction_id, `Substance ${s.slug} assertion ${a.id} missing jurisdiction_id`);
    assert(a.activity, `Substance ${s.slug} assertion ${a.id} missing activity`);
    assert(a.as_of_date && isDate(a.as_of_date), `Substance ${s.slug} assertion ${a.id} missing/invalid as_of_date`);
    assert(a.controlling_source_ids && a.controlling_source_ids.length > 0, `Substance ${s.slug} assertion ${a.id} missing controlling sources`);
    assert(a.reviewer_id, `Substance ${s.slug} assertion ${a.id} missing reviewer_id`);
    assert(a.status_label, `Substance ${s.slug} assertion ${a.id} missing status_label`);
    for (const sid of a.controlling_source_ids) {
      assert(documentIds.has(sid), `Substance ${s.slug} assertion ${a.id} references missing document ${sid}`);
    }
  }
  assert(isDate(s.last_verified), `Substance ${s.slug} missing last_verified`);
  assert(isDate(s.next_review_at), `Substance ${s.slug} missing next_review_at`);
  assert(s.reviewer_id && authorIds.has(s.reviewer_id), `Substance ${s.slug} reviewer ${s.reviewer_id} not found`);
  for (const did of s.document_ids) {
    assert(documentIds.has(did), `Substance ${s.slug} references missing document ${did}`);
  }
  for (const rid of s.rule_ids) {
    assert(ruleSlugs.has(rid), `Substance ${s.slug} references missing rule ${rid}`);
  }
  for (const jid of s.jurisdiction_ids) {
    assert(jurisdictionSlugs.has(jid), `Substance ${s.slug} references missing jurisdiction ${jid}`);
  }
}

// Rules
for (const r of rules) {
  assert(r.direct_answer, `Rule ${r.slug} missing direct_answer`);
  assert(r.controlling_source_ids && r.controlling_source_ids.length > 0, `Rule ${r.slug} missing controlling sources`);
  assert(isDate(r.last_verified), `Rule ${r.slug} missing last_verified`);
  assert(isDate(r.next_review_at), `Rule ${r.slug} missing next_review_at`);
  assert(r.legal_reviewer_id && authorIds.has(r.legal_reviewer_id), `Rule ${r.slug} legal reviewer not found`);
  for (const sid of r.controlling_source_ids) {
    assert(documentIds.has(sid), `Rule ${r.slug} references missing document ${sid}`);
  }
}

// Updates
for (const u of updates) {
  assert(u.procedural_status, `Update ${u.slug} missing procedural_status`);
  assert(u.what_changed, `Update ${u.slug} missing what_changed`);
  assert(u.what_did_not_change, `Update ${u.slug} missing what_did_not_change`);
  assert(u.author_id && authorIds.has(u.author_id), `Update ${u.slug} author not found`);
  assert(u.legal_reviewer_id && authorIds.has(u.legal_reviewer_id), `Update ${u.slug} legal reviewer not found`);
  assert(isDate(u.date_published), `Update ${u.slug} missing date_published`);
  assert(isDate(u.last_verified), `Update ${u.slug} missing last_verified`);
  assert(u.hero_image, `Update ${u.slug} missing hero_image`);
  assert(u.hero_alt, `Update ${u.slug} missing hero_alt`);
  for (const sid of u.affected_substance_slugs) {
    assert(substanceSlugs.has(sid), `Update ${u.slug} references missing substance ${sid}`);
  }
  for (const rid of u.affected_rule_slugs) {
    assert(ruleSlugs.has(rid), `Update ${u.slug} references missing rule ${rid}`);
  }
  for (const did of u.document_ids) {
    assert(documentIds.has(did), `Update ${u.slug} references missing document ${did}`);
  }
}

// Claim checks
for (const c of claims) {
  assert(c.verdict, `Claim ${c.slug} missing verdict`);
  assert(c.correct_wording, `Claim ${c.slug} missing correct_wording`);
  assert(c.controlling_source_ids && c.controlling_source_ids.length > 0, `Claim ${c.slug} missing controlling sources`);
  assert(isDate(c.date), `Claim ${c.slug} missing/invalid date`);
  assert(c.jurisdiction, `Claim ${c.slug} missing jurisdiction`);
  assert(c.legal_reviewer_id && authorIds.has(c.legal_reviewer_id), `Claim ${c.slug} legal reviewer not found`);
  for (const sid of c.controlling_source_ids) {
    assert(documentIds.has(sid), `Claim ${c.slug} references missing document ${sid}`);
  }
  for (const sid of c.affected_substance_slugs || []) {
    assert(substanceSlugs.has(sid), `Claim ${c.slug} references missing substance ${sid}`);
  }
  for (const rid of c.affected_rule_slugs || []) {
    assert(ruleSlugs.has(rid), `Claim ${c.slug} references missing rule ${rid}`);
  }
}

// Documents
for (const d of documents) {
  assert(d.title, `Document ${d.slug} missing title`);
  assert(d.issuing_body, `Document ${d.slug} missing issuing_body`);
  assert(d.document_type, `Document ${d.slug} missing document_type`);
  assert(d.plain_language_summary, `Document ${d.slug} missing plain_language_summary`);
}

// Trackers
for (const t of trackers) {
  assert(t.columns && t.columns.length > 0, `Tracker ${t.slug} missing columns`);
  assert(t.rows && t.rows.length > 0, `Tracker ${t.slug} missing rows`);
  assert(isDate(t.last_updated), `Tracker ${t.slug} missing last_updated`);
  assert(isDate(t.next_update_at), `Tracker ${t.slug} missing next_update_at`);
}

if (errors.length > 0) {
  console.error('Fixture validation failed:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
} else {
  console.log('Fixture validation passed.');
  console.log(`Substances: ${substances.length}, Rules: ${rules.length}, Updates: ${updates.length}, Claims: ${claims.length}, Trackers: ${trackers.length}, Documents: ${documents.length}, Jurisdictions: ${jurisdictions.length}, Authors: ${authors.length}`);
}
