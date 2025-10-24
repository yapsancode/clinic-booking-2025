import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pekldkqktiigepbpzqjg.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },

  async redirects() {
    return [
      // Redirect old Fly domain → main domain
      {
        source: "/:path*",
        has: [{ type: "host", value: "clinic-booking-2025.fly.dev" }],
        destination: "https://klinikmekar.com/:path*",
        permanent: true,
      },
      // Redirect www → non-www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.klinikmekar.com" }],
        destination: "https://klinikmekar.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
