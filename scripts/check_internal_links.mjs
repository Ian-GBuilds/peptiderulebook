#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const siteUrl = 'https://peptiderulebook.com';
const assetExts = new Set(['.css', '.svg', '.ico', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.js', '.json', '.xml']);

const htmlFiles = [];
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const path = join(dir, e.name);
    if (e.isDirectory()) await walk(path);
    else if (e.name.endsWith('.html')) htmlFiles.push(path);
  }
}
await walk(dist);

const linkRegex = /(?:href|src)="([^"]+)"/g;
const internal = new Set();

for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf-8');
  let m;
  while ((m = linkRegex.exec(content)) !== null) {
    let url = m[1];
    if (url.startsWith(siteUrl)) url = url.slice(siteUrl.length) || '/';
    if (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) continue;
    if (url.startsWith('/')) {
      const clean = url.split('#')[0];
      if (clean !== '/404/') internal.add(clean);
    }
  }
}

function exists(path) {
  const rel = path.replace(/^\//, '');
  if (!rel) return existsSync(join(dist, 'index.html'));
  const filePath = join(dist, rel);
  const ext = extname(rel);
  if (assetExts.has(ext)) return existsSync(filePath);
  if (ext === '.html') return existsSync(filePath);
  if (rel === '404') return existsSync(join(dist, '404.html'));
  return existsSync(join(filePath, 'index.html')) || existsSync(`${filePath}.html`);
}

const missing = [];
for (const path of internal) {
  if (!exists(path)) missing.push(path);
}

if (missing.length > 0) {
  console.error('Missing internal link targets:');
  for (const m of missing) console.error(' -', m);
  process.exit(1);
} else {
  console.log(`Checked ${htmlFiles.length} HTML files and ${internal.size} internal links — all targets found.`);
}
