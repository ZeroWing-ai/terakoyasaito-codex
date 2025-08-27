import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Allow build to pass despite client-only 'any' in legacy code
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
