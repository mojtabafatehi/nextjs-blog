import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // یا هر سایز مورد نیاز شما
    },
  },
};

export default nextConfig;
