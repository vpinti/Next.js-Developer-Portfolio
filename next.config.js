/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pinna la root per il file tracing: evita che Next inferisca una workspace
  // root errata a causa di lockfile presenti in cartelle superiori (es. ~/).
  outputFileTracingRoot: __dirname,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
