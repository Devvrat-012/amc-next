/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  
  experimental: {
    turbopack: false,
  },
  images: {
    domains: ["demo.alignmycareer.com", "localhost"],
  },
};

export default nextConfig;
