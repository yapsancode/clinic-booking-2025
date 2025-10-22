import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // ✅ Add this for optimized Docker builds
  eslint: {
    // ✅ Don't run ESLint during production builds (Docker, CI, etc.)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Don't block builds on type errors (you'll still see them in dev)
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pekldkqktiigepbpzqjg.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
