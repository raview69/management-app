import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/pages/:path*",
  //     },
  //   ]
  // },

  reactStrictMode: false,
}

export default nextConfig
