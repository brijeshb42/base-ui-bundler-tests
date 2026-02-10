import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  // Use empty turbopack config to allow default behavior
  // Next.js 16+ uses Turbopack by default which doesn't support custom webpack splitChunks
  turbopack: {},
};

export default nextConfig;
