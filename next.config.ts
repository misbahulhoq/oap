import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  allowedDevOrigins: ["192.168.31.27"],
};

export default nextConfig;
