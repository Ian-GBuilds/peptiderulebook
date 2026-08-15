export function makeTitle(pageTitle: string | undefined, siteName: string): string {
  if (!pageTitle || pageTitle === siteName) return siteName;
  return `${pageTitle} | ${siteName}`;
}

export function makeDescription(desc: string | undefined, fallback: string): string {
  return desc?.trim() || fallback;
}

export function makeCanonical(path: string | undefined, siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '');
  const clean = (path || '').replace(/^\//, '').replace(/\/$/, '');
  return clean ? `${base}/${clean}/` : `${base}/`;
}
