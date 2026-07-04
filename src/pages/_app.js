import '@/styles/globals.css'
import {Montserrat} from "next/font/google"
import Head from 'next/head'
import NavBar from '../components/NavBar'
import Footer from '@/components/Footer'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont'
})

export default function App({ Component, pageProps }) {

  const router = useRouter()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1b1b1b" />
        <meta property="og:site_name" content="Vittorio Pinti" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className={`${montserrat.variable} font-mont  dark:bg-dark bg-light w-full min-h-screen`}>
        <NavBar />
        <AnimatePresence mode='wait'>
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
        <Footer />
      </main>
      <SpeedInsights />
      <Analytics />
    </>
  )
}
