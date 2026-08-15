export interface Source {
  id: string;
  title: string;
  issuing_body_or_authors: string;
  source_type: string;
  jurisdiction: string;
  official_status?: string;
  docket_or_citation?: string;
  publication_date?: string;
  effective_date?: string;
  expiration_date?: string;
  withdrawn_date?: string;
  updated_date?: string;
  url?: string;
  official_pdf_url?: string;
  archive_url?: string;
  access_date: string;
  is_controlling: boolean;
  is_primary_record: boolean;
  supersedes_source_id?: string;
  superseded_by_source_id?: string;
  notes?: string;
}

export interface StatusAssertion {
  id: string;
  substance_id?: string;
  jurisdiction_id: string;
  activity: string;
  status_value: string;
  status_label: string;
  qualification?: string;
  controlling_source_ids: string[];
  secondary_source_ids?: string[];
  valid_from?: string;
  valid_to?: string;
  as_of_date: string;
  confidence: 'high' | 'medium' | 'low';
  reviewer_id: string;
  reviewed_at: string;
  superseded_by_assertion_id?: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  source_ids: string[];
  procedural_status?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Substance {
  id: string;
  slug: string;
  canonical_name: string;
  synonyms: string[];
  unii?: string;
  cas_number?: string;
  identity_notes: string;
  status_assertions: StatusAssertion[];
  timeline: TimelineEvent[];
  document_ids: string[];
  rule_ids: string[];
  jurisdiction_ids: string[];
  faq_items?: FaqItem[];
  last_verified: string;
  next_review_at: string;
  reviewer_id: string;
  change_log?: string[];
}

export interface Rule {
  id: string;
  slug: string;
  name: string;
  jurisdiction: string;
  authority_type: string;
  scope: string;
  direct_answer: string;
  definitions: { term: string; definition: string }[];
  decision_logic: string;
  examples: string[];
  limitations: string[];
  controlling_source_ids: string[];
  last_verified: string;
  next_review_at: string;
  legal_reviewer_id: string;
}

export interface Update {
  id: string;
  slug: string;
  title: string;
  dek: string;
  direct_answer: string;
  key_takeaways: string[];
  body: string;
  content_type: 'update';
  event_date?: string;
  publication_date: string;
  effective_date?: string;
  procedural_status: string;
  what_changed: string;
  what_did_not_change: string;
  next_step?: string;
  affected_substance_slugs: string[];
  affected_rule_slugs: string[];
  document_ids: string[];
  author_id: string;
  fact_checker_id?: string;
  legal_reviewer_id: string;
  date_published: string;
  date_modified: string;
  last_verified: string;
  next_review_at: string;
  hero_image?: string;
  hero_alt?: string;
  faq_items?: FaqItem[];
  status: 'published';
}

export interface ClaimCheck {
  id: string;
  slug: string;
  title: string;
  claim: string;
  verdict: 'accurate' | 'partly accurate' | 'misleading' | 'unsupported' | 'outdated' | 'not verifiable';
  correct_wording: string;
  controlling_source_ids: string[];
  date: string;
  jurisdiction: string;
  why_confusion: string;
  update_history?: { date: string; note: string }[];
  affected_substance_slugs?: string[];
  affected_rule_slugs?: string[];
  author_id: string;
  legal_reviewer_id: string;
  last_verified: string;
}

export interface SourceDocument {
  id: string;
  slug: string;
  title: string;
  issuing_body: string;
  document_type: string;
  docket_or_citation?: string;
  publication_date?: string;
  effective_date?: string;
  expiration_date?: string;
  withdrawn_date?: string;
  current_status?: string;
  official_url?: string;
  official_pdf_url?: string;
  archive_url?: string;
  plain_language_summary: string;
  provisions?: string[];
  related_substance_slugs?: string[];
  related_rule_slugs?: string[];
  related_jurisdiction_slugs?: string[];
  related_update_slugs?: string[];
  supersedes_document_id?: string;
  superseded_by_document_id?: string;
}

export interface Jurisdiction {
  id: string;
  slug: string;
  name: string;
  type: 'federal' | 'state' | 'international';
  summary: string;
  scope_notes: string;
  key_agencies: { name: string; url?: string }[];
  document_ids?: string[];
  substance_slugs?: string[];
  state?: string;
  country?: string;
  review_status: 'complete' | 'pending' | 'partial';
}

export interface Tracker {
  id: string;
  slug: string;
  name: string;
  description: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string>[];
  source_ids: string[];
  last_updated: string;
  next_update_at: string;
}

export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials?: string;
  conflicts?: string;
  is_public: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  description: string;
  twitter?: string;
  github?: string;
  header_nav: { label: string; href: string }[];
  footer_nav: { label: string; href: string }[];
}
