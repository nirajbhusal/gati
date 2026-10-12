import type { NextConfig } from "next";

/** Set GITHUB_PAGES=true in CI so assets resolve under /gati/ on GitHub Pages. */
const basePath = process.env.GITHUB_PAGES === "true" ? "/gati" : "";

const nextConfig: NextConfig = {
  // Static export for Capacitor (Android / iOS wrappers) and GitHub Pages
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
