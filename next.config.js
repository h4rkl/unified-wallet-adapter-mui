/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add transpilePackages if components are from other packages
  transpilePackages: [],
  // Ensure Next.js can find and process all required files
  webpack: (config) => {
    // Add any webpack customizations if needed
    return config;
  },
};

export default nextConfig;
