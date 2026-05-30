import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.avdvvn.org" },
    ],
  },
};

export default nextConfig;
