/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pinna la root per il file tracing: evita che Next inferisca una workspace
  // root errata a causa di lockfile presenti in cartelle superiori (es. ~/).
  outputFileTracingRoot: __dirname,
  // SOLO DEV (nessun effetto su Vercel/produzione). Se apri il dev via 0.0.0.0
  // o IP LAN invece di localhost, senza queste origin Next blocca l'HMR
  // cross-origin -> Fast Refresh fallisce -> il browser fa reload periodici.
  // Aggiungi qui il tuo IP LAN (es. '192.168.1.x') se apri il dev da altri device.
  allowedDevOrigins: ['0.0.0.0', '127.0.0.1'],
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
