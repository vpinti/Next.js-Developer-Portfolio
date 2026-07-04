import Head from 'next/head'
import Link from 'next/link'
import AnimatedText from '@/components/AnimatedText'
import { GithubIcon } from '@/components/Icons'
import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import TransitionEffect from '@/components/TransitionEffect'

const projects = () => {

    const FeaturedProject = ({ type, title, summary, tech, github, link, repos }) => {
        return (
            <article className='relative w-full flex flex-col rounded-3xl rounded-br-2xl border border-solid border-dark
                bg-light shadow-2xl p-12 dark:bg-dark dark:border-light
                lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4'
            >
                <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl xs:-right-2 xs:w-full xs:rounded-[1.5rem]' />
                <span className='text-primary dark:text-primaryDark font-medium text-xl xs:text-base'>{type}</span>
                <Link href={github} target='_blank' className='hover:underline underline-offset-2'>
                    <h2 className='my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-2xl'>{title}</h2>
                </Link>
                <p className='my-2 font-medium text-dark dark:text-light sm:text-sm'>{summary}</p>
                {tech && (
                    <ul className='mt-2 flex flex-wrap gap-2'>
                        {tech.map((t) => (
                            <li key={t} className='rounded-full border border-solid border-dark/40 dark:border-light/40 px-3 py-1 text-sm font-medium'>{t}</li>
                        ))}
                    </ul>
                )}
                <div className='mt-4 flex items-center flex-wrap gap-3'>
                    {repos ? (
                        repos.map((r) => (
                            <Link key={r.href} href={r.href} target='_blank'
                                className='flex items-center gap-2 rounded-lg bg-dark text-light py-2 px-4 text-base font-semibold
                                dark:bg-light dark:text-dark'
                                aria-label={`${title} ${r.label} on GitHub`}
                            >
                                <span className='w-5 inline-block'><GithubIcon /></span>{r.label}
                            </Link>
                        ))
                    ) : (
                        <Link href={github} target='_blank' className='w-10' aria-label={`${title} on GitHub`}>{" "}<GithubIcon /></Link>
                    )}
                    {link && (
                        <Link href={link} target='_blank' className='rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold
                            dark:bg-light dark:text-dark sm:px-4 sm:text-base'
                        >Visit Project</Link>
                    )}
                </div>
            </article>
        )
    }

    const Project = ({ title, type, tech, github, link }) => {
        return (
            <article className='relative w-full flex flex-col items-start justify-between rounded-2xl border border-solid border-dark bg-light p-6 dark:bg-dark dark:border-light
                xs:p-4'
            >
                <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark dark:bg-light rounded-br-3xl md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]' />
                <span className='text-primary dark:text-primaryDark font-medium text-xl lg:text-lg md:text-base'>{type}</span>
                <Link href={github} target='_blank' className='hover:underline underline-offset-2'>
                    <h2 className='my-2 w-full text-left text-3xl font-bold lg:text-2xl'>{title}</h2>
                </Link>
                {tech && (
                    <ul className='mt-1 flex flex-wrap gap-2'>
                        {tech.map((t) => (
                            <li key={t} className='rounded-full border border-solid border-dark/40 dark:border-light/40 px-3 py-1 text-sm font-medium'>{t}</li>
                        ))}
                    </ul>
                )}
                <div className='w-full mt-4 flex items-center justify-between'>
                    {link ? (
                        <Link href={link} target='_blank' className='text-lg font-semibold underline md:text-base'>Visit</Link>
                    ) : <span />}
                    <Link href={github} target='_blank' className='w-8 md:w-6' aria-label={`${title} on GitHub`}><GithubIcon />{" "}</Link>
                </div>
            </article>
        )
    }

    return (
        <>
            <Head>
                <title>Vittorio Pinti | Projects</title>
                <meta name='description' content='Open-source projects by Vittorio Pinti: Pulsar, Conduit and more.' />
                <meta property='og:title' content='Vittorio Pinti | Projects' />
                <meta property='og:description' content='Open-source projects: Pulsar, Conduit and more.' />
            </Head>
            <TransitionEffect />
            <main className='w-full mb-16 flex flex-col items-center justify-center dark:text-light'>
                <Layout className='pt-16'>
                    <AnimatedText text='Building Things That Last.' className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl' />

                    <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>
                        <div className='col-span-12'>
                            <FeaturedProject
                                type='Featured Project · Open Source · PHP'
                                title='Pulsar Framework'
                                summary='A modular PHP MVC framework with an integrated ORM, advanced routing, OWASP-compliant security and performance optimizations. Split into a core framework and a starter skeleton to bootstrap new applications.'
                                tech={['PHP', 'MVC', 'ORM', 'OWASP']}
                                github='https://github.com/vpinti/framework'
                                repos={[
                                    { label: 'Core', href: 'https://github.com/vpinti/framework' },
                                    { label: 'Skeleton', href: 'https://github.com/vpinti/Pulsar-Skeleton' },
                                ]}
                            />
                        </div>
                        <div className='col-span-12'>
                            <FeaturedProject
                                type='Featured Project · Open Source · C'
                                title='Conduit'
                                summary='A modular, layered communication protocol over UDP, written in C: logical connections and per-channel configurable delivery guarantees, so you only pay for the overhead you actually use. Includes an IETF-style wire-format specification, unit tests and a CI pipeline.'
                                tech={['C', 'Networking', 'UDP', 'CI']}
                                github='https://github.com/vpintidev/conduit'
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project
                                type='Open Source'
                                title='MyUnimol'
                                tech={['JavaScript']}
                                github='https://github.com/vpinti'
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project
                                type='Open Source · Contributor'
                                title='AzerothCore'
                                tech={['C++']}
                                github='https://github.com/azerothcore/azerothcore-wotlk'
                            />
                        </div>
                    </div>
                </Layout>
            </main>
        </>
    )
}

export default projects
