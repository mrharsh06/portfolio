/** @type {import('next').NextConfig} */
const nextConfig = { distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next-build', transpilePackages: ['lucide-react'], output: 'export', images: { unoptimized: true }, poweredByHeader: false };
export default nextConfig;
