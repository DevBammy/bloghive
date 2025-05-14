/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uqxxsxwbbckifxjxpevn.supabase.co',
        pathname: '/storage/v1/object/public/**', // Adjust if your path is different
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
