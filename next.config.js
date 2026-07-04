/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pinna la root per il file tracing: evita che Next inferisca una workspace
  // root errata a causa di lockfile presenti in cartelle superiori (es. ~/).
  outputFileTracingRoot: __dirname,
    images: {
    // Le cover SVG sono first-party (in /public, create da noi): abilitare
    // dangerouslyAllowSVG e' sicuro qui. La CSP blocca script/oggetti nell'SVG.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
