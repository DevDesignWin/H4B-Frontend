import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com'], // Add your image domains here
  },
  experimental: {
    serverComponentsExternalPackages: ['three'],
  },
};

export default nextConfig;
