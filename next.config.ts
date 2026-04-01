import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep puppeteer/chromium as external server packages — not bundled by Turbopack
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],

  // Include @sparticuz/chromium brotli binaries in the serverless bundle.
  // NFT file tracing ignores them (not JS imports), so we add them explicitly.
  outputFileTracingIncludes: {
    '/api/export-pdf': ['./node_modules/@sparticuz/chromium/bin/**/*'],
  },

  // Allow serving images from the public directory without optimisation restrictions
  images: {
    unoptimized: true,
  },

  // Prevent browsers from caching public images — ensures updated files are
  // always re-fetched (no stale thumbnails after replacing e.g. Geberit_Ad_11.jpg)
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, must-revalidate' },
        ],
      },
    ];
  },

  // Silence Turbopack warning (no custom webpack config needed)
  turbopack: {},
};

export default nextConfig;
