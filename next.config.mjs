/**
 * Next.js configuration — configured for a fully static export
 * suitable for GitHub Pages hosting on a custom domain (azpire.klyonix.in).
 *
 * `output: 'export'` produces a static `out/` directory (no Node server).
 * Because the site is served from the ROOT of a custom domain, no
 * basePath / assetPrefix is required. If you ever host under a project
 * path (e.g. username.github.io/bni-chapter-platform), set BASE_PATH.
 */

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
