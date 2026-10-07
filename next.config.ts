import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Everything under public/work is pre-encoded as WebP at its display size
    // by scripts/build_assets.py, so the optimizer would only re-encode it.
    // Skipping it also stops `next dev` spawning a sharp worker per core.
    unoptimized: true,
  },
  experimental: {
    // Cover images morph from the work list into the project page.
    viewTransition: true,
  },
};

export default nextConfig;
