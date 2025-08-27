// Import the necessary modules
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable in development to avoid caching issues
});

const initializeBundleAnalyzer = require("@next/bundle-analyzer");
const withBundleAnalyzer = initializeBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER_ENABLED === "true",
});

/** @type {import('next').NextConfig} */
const baseConfig = {
  output: "standalone",
  devIndicators: false,
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
    domains: ["ik.imagekit.io"],
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

// Combine all plugins with base config
module.exports = withPWA(withBundleAnalyzer(baseConfig));
