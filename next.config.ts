import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "digitglance.com", "www.digitglance.com"],
    },
  },
};

export default nextConfig;