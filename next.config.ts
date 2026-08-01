import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.avdvvn.org" },
    ],
  },
};

export default nextConfig;
