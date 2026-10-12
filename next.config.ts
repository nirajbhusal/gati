import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Capacitor (Android / iOS wrappers)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
