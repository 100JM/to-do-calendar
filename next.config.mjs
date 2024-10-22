/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'k.kakaocdn.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '100jm-to-do-calendar.vercel.app',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'to-do-calendar-six.vercel.app',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;