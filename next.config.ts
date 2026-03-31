import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep puppeteer/chromium as external server packages — not bundled by Turbopack
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],

  // Allow serving images from the public directory without optimisation restrictions
  images: {
    unoptimized: true,
  },

  // Silence Turbopack warning (no custom webpack config needed)
  turbopack: {},
};

export default nextConfig;
