import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/notion-widgets' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/notion-widgets' : '',
};

export default nextConfig;
