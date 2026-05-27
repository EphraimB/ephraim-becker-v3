/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <--- Add this line
  images: {
    unoptimized: true, // Required for static export
  },
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.168', '192.168.1.168:3000', '192.168.1.168:8000'],
};

module.exports = nextConfig;
