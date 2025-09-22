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

  // API optimization
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // API route optimization
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
          },
          {
            key: 'Connection',
            value: 'keep-alive',
          },
          {
            key: 'Keep-Alive',
            value: 'timeout=5, max=1000',
          },
        ],
      },
      {
        source: '/api/batch-operations',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },

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
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          supabase: {
            test: /[\\/]node_modules[\\/]@supabase[\\/]/,
            name: 'supabase',
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

// Combine all plugins with base config
module.exports = withPWA(withBundleAnalyzer(baseConfig));
