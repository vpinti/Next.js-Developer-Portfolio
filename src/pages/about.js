import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import profilePic from '../../public/images/profile/developer-pic-2.jpg'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import TransitionEffect from '@/components/TransitionEffect'

const AnimatedNumbers = ({value}) => {
    const ref = useRef(null)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {duration: 3000})
    const isInView = useInView(ref, {once: true})

    useEffect(() => {
        if(isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        springValue.on('change', latest => {
            if(ref.current && latest.toFixed(0) <= value) {
                ref.current.textContent = latest.toFixed(0)
            }
        })
    }, [springValue, value])

    return <span ref={ref}></span>
}

const about = () => {
  return (
    <>
    <Head>
        <title>Vittorio Pinti | About</title>
        <meta name='description' content='About Vittorio Pinti: Senior Backend Developer — experience, technical skills and professional background.'/>
        <meta property='og:title' content='Vittorio Pinti | About' />
        <meta property='og:description' content='Senior Backend Developer: experience, skills and professional background.' />
    </Head>

    <TransitionEffect />

    <main className='flex w-full flex-col items-center justify-center dark:text-light'>
        <Layout className='pt-16'>
            <AnimatedText text='Passion Fuels Purpose!' className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8' />
            <div className='grid w-full grid-cols-8 gap-16 sm:gap-8'>
                <div className='col-span-3 xl:col-span-4 flex flex-col items-start justify-start md:order-2 md:col-span-8'>
                    <h2 className='mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75'>Biography</h2>
                    <p className='font-medium'>
                        Hi, I&apos;m Vittorio Pinti, a Senior Backend Developer with over 8 years of experience building
                        enterprise PHP web applications, with a strong focus on application security and DevSecOps:
                        integrating security into CI/CD pipelines and building to OWASP guidelines.
                    </p>
                    <p className='my-4 font-medium'>
                        At Prestiter I proposed and led, as owner, the migration of the entire codebase from Zend
                        Framework 1 to PHP 8.2 &#x2D; coordinating the team and delivering on deadline &#x2D; and
                        designed a Laravel-style database migration system integrated into the CI/CD pipelines. I&apos;m
                        also the author of Pulsar (an open-source PHP MVC framework) and Conduit (an experimental network
                        protocol written in C).
                    </p>
                    <p className='font-medium'>
                        Oracle Cloud Infrastructure certified, I keep sharpening my security skills through hands-on
                        cyber paths (SOC, Security Engineering, DevSecOps), with a strong emphasis on TDD, OWASP and code
                        quality. A background in industrial quality control gave me process rigor and attention to
                        detail.
                    </p>
                </div>
                <div className='col-span-3 xl:col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light md:order-1 md:col-span-8'>
                    <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light'/>
                    <Image src={profilePic} alt='Vittorio Pinti' className='w-full h-auto rounded-2xl' 
                    priority
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' 
                    />
                </div>
                <div className='col-span-2 xl:col-span-8 xl:flex-row flex flex-col items-end justify-between xl:items-center md:order-3'>
                    <div className='flex flex-col items-end justify-center xl:items-center'>
                        <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5l xs:text-4xl'>
                            <AnimatedNumbers value={8} />+
                        </span>
                        <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>years of experience</h2>
                    </div>

                    <div className='flex flex-col items-end justify-center xl:items-center'>
                        <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5l xs:text-4xl'>
                        <AnimatedNumbers value={4} />+
                        </span>
                        <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>open-source projects</h2>
                    </div>

                    <div className='flex flex-col items-end justify-center xl:items-center'>
                        <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5l xs:text-4xl'>
                        <AnimatedNumbers value={3} />+
                        </span>
                        <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>cybersecurity paths</h2>
                    </div>

                </div>
            </div>
            <Skills />
            <Experience />
            <Education />
        </Layout>
    </main>
    </>
  )
}

export default about