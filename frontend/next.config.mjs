/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
    async rewrites() {
        return [
            {
                source: '/backend/:path*',
                destination: 'https://salmon-kingfisher-952621.hostingersite.com/:path*',
            },
        ];
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 604800,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/storage/**',
            },
            {
                protocol: 'https',
                hostname: 'salmon-kingfisher-952621.hostingersite.com'
            },
            {
                protocol: 'https',
                hostname: 'avatars.planningcenteronline.com',
            }
        ],
    },
};

export default nextConfig;
