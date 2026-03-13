/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
    images: {
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
            }
        ],
    },
};

export default nextConfig;
