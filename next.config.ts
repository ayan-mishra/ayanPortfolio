import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ayanPortfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
