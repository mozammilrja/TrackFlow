/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ use standalone for Clerk support
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
