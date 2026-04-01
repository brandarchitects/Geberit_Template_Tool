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

  // Silence Turbopack warning (no custom webpack config needed)
  turbopack: {},
};

export default nextConfig;
