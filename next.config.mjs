/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'projetfilrouge.s3.amazonaws.com'
      }
    ]
  }
}

export default nextConfig
