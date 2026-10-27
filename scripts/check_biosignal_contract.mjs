import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// Real build verification: date-prefixed dashboard Markdown must render at
// /articles/slug/ and vanish everywhere when the same file becomes a draft.
const fixture = 'src/content/articles/2026-01-01-biosignal-contract-test.md';
assert(!existsSync(fixture), 'Refusing to overwrite an existing fixture');
const title = 'Biosignal integration fixture';
const body = '# Contract body marker\n\nA temporary integration fixture.\n';
const surfaces = ['dist/articles/index.html', 'dist/index.html', 'dist/search/index.html', 'dist/rss.xml', 'dist/sitemap-0.xml'];
const build = () => execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
try {
  for (const draft of [false, true]) {
    writeFileSync(fixture, `---\ntitle: ${title}\ndek: Temporary verification only.\ndate: 2026-01-01\ncategory: explainer\ntags: []\nsources: []\ndraft: ${draft}\n---\n\n${body}`);
    build();
    assert.equal(existsSync('dist/articles/biosignal-contract-test/index.html'), !draft, 'Article route visibility');
    if (!draft) assert(readFileSync('dist/articles/biosignal-contract-test/index.html', 'utf8').includes('Contract body marker'));
    for (const path of surfaces) {
      const html = readFileSync(path, 'utf8');
      assert.equal(html.includes('/articles/biosignal-contract-test/'), !draft, `${path}: article visibility`);
    }
  }
  console.log('Biosignal contract passed: article rendering, listing, homepage, search, RSS, sitemap, and draft exclusion.');
} finally {
  if (existsSync(fixture)) unlinkSync(fixture);
  build();
}
