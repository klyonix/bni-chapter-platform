/**
 * Next.js configuration — configured for a fully static export
 * suitable for GitHub Pages hosting on a custom domain (azpire.klyonix.in).
 *
 * `output: 'export'` produces a static `out/` directory (no Node server).
 * Because the site is served from the ROOT of a custom domain, no
 * basePath / assetPrefix is required. If you ever host under a project
 * path (e.g. username.github.io/bni-chapter-platform), set BASE_PATH.
 */

// A missing NEXT_PUBLIC_SITE_URL silently falls back to a placeholder, which would
// ship every canonical tag, OG URL and sitemap entry pointing at the wrong host —
// a failure invisible in the UI and expensive to discover after launch. Fail the
// build instead. Local dev keeps the fallback so `next dev` needs no setup.
if (process.env.CI && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL must be set in CI. Expected https://azpire.klyonix.in — ' +
      'see the env block in .github/workflows/deploy.yml.'
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // GitHub Pages serves static files; the Next.js Image Optimization
  // server is unavailable, so images must be served unoptimized.
  images: {
    unoptimized: true,
  },

  // Emit /route/index.html so clean URLs resolve correctly on static hosts.
  trailingSlash: true,

  // Optional project-path support. Leave BASE_PATH unset for the custom
  // domain (root serving). Only set it for github.io/<repo> style hosting.
  basePath: process.env.BASE_PATH || undefined,
  assetPrefix: process.env.BASE_PATH || undefined,

  reactStrictMode: true,
};

export default nextConfig;
