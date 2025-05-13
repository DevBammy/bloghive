/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uqxxsxwbbckifxjxpevn.supabase.co',
        pathname: '/storage/v1/object/public/**', // Adjust if your path is different
      },
    ],
  },
};

export default nextConfig;
