import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Simple SVGR configuration
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false, // Disable optimization to avoid issues
            titleProp: true,
            ref: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
