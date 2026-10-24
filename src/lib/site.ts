/**
 * Resolves the canonical origin used for metadata, sitemap and robots.
 *
 * Order of precedence:
 * 1. NEXT_PUBLIC_SITE_URL — set this once the production domain is final.
 * 2. VERCEL_PROJECT_PRODUCTION_URL — provided automatically by Vercel builds.
 * 3. URL — provided automatically by Netlify builds.
 * 4. http://localhost:3000 — local development fallback.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${stripTrailingSlash(vercel)}`;

  const netlify = process.env.URL;
  if (netlify) return stripTrailingSlash(netlify);

  return "http://localhost:3000";
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
