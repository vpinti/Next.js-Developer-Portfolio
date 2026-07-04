import { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue } from 'framer-motion'
import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import { getAllPosts } from '@/lib/posts';
import TransitionEffect from '@/components/TransitionEffect'

const articles = ({ posts, featured }) => {

    const FramerImage = motion.create(Image)

    const MovingImg = ({title, img, imgWidth, imgHeight, link}) => {

        const x = useMotionValue(0)
        const y = useMotionValue(0)
        const imageRef = useRef(null)

        const handleMouse = (event) => {
            imageRef.current.style.display = 'inline-block'
            x.set(event.pageX)
            y.set(-10)
        }

        const handleMouseLeave = (event) => {
            imageRef.current.style.display = 'none'
            x.set(0)
            y.set(0)
        }

        return(
            <Link href={link}
                onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
            >
                <h2 className='capitalize text-xl font-semibold hover:underline'>{title}</h2>
                <FramerImage 
                    style={{x, y}}
                    initial={{opacity:0}}
                    whileInView={{opacity:1, transition:{duration: 0.2}}}
                    ref={imageRef} 
                    src={img}
                    width={imgWidth}
                    height={imgHeight}
                    alt={title} 
                    className='z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden' 
                />
            </Link>
        )
    }

    const Article = ({img, imgWidth, imgHeight, title, date, link}) => {
        return (
            <motion.li 
            initial={{y:200}}
            whileInView={{y:0, transition:{duration: 0.5, ease: 'easeInOut'}}}
            viewport={{once:true}}
            className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center
             justify-between bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4 dark:border-light
             dark:bg-dark dark:text-light sm:flex-col'>
                <MovingImg title={title} img={img} link={link} imgWidth={imgWidth} imgHeight={imgHeight} />
                <span className='text-primary dark:text-primaryDark font-semibold pl-4 sm:self-start sm:pl-0 xs:text-sm'>{date}</span>
            </motion.li>
        )
    }

    const FeaturedArticles = ({img, imgWidth, imgHeight, title, time, summary, link, reverse}) => {
        return (
            <li className={`relative w-full flex items-stretch p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light lg:flex-col ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl'/>
                <Link href={link} className='w-2/5 h-56 md:h-48 cursor-pointer overflow-hidden rounded-lg lg:w-full'>
                    <FramerImage src={img} width={imgWidth} height={imgHeight} alt={title} className='w-full h-full object-cover'
                      whileHover={{scale:1.05}}
                      transition={{duration:0.2}}
                      priority
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 40vw'
                    />
                </Link>
                <div className={`w-3/5 flex flex-col justify-center lg:w-full lg:pt-4 ${reverse ? 'pr-6 lg:pr-0' : 'pl-6 lg:pl-0'}`}>
                    <Link href={link}>
                        <h2 className='capitalize text-2xl font-bold hover:underline xs:text-lg'>{title}</h2>
                    </Link>
                    <p className='text-sm my-2'>{summary}</p>
                    <span className='text-primary dark:text-primaryDark font-semibold'>{time}</span>
                </div>
            </li>
        )
    }

  return (
    <>
        <Head>
            <title>Vittorio Pinti | Articles</title>
            <meta name='description' content='Articles by Vittorio Pinti on backend, APIs, CI/CD and web development.'/>
            <meta property='og:title' content='Vittorio Pinti | Articles' />
            <meta property='og:description' content='Articles on backend, APIs, CI/CD and web development.' />
        </Head>
        <TransitionEffect />
        <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light'>
            <Layout className='pt-16'>
                <AnimatedText text='Words Can Change The World!' className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl'/>
                <ul className='flex flex-col gap-12 lg:gap-8'>
                    {featured.map((post, i) => (
                        <FeaturedArticles
                            key={post.slug}
                            reverse={i % 2 === 1}
                            title={post.title}
                            summary={post.excerpt}
                            time={`${post.readingTime} min read`}
                            link={`/blogs/${post.slug}`}
                            img={post.coverImage}
                            imgWidth={post.coverImageWidth}
                            imgHeight={post.coverImageHeight}
                        />
                    ))}
                </ul>
                <h2 className='font-bold text-4xl w-full text-center my-16 mt-32'>All Articles</h2>
                <ul>
                    {posts.map(post => (
                        <Article 
                            title={post.title}
                            date={post.date}
                            link={`/blogs/${post.slug}`}
                            img={post.coverImage}
                            imgWidth={post.coverImageWidth}
                            imgHeight={post.coverImageHeight}
                            key={post.slug}
                        />
                    ))}
                </ul>
            </Layout>
        </main>
    </>
  )
}

export async function getStaticProps() {
    // Escludo il contenuto markdown dal payload della lista (non serve qui)
    const stripContent = ({ content, ...rest }) => rest;
    const allPosts = getAllPosts().map(stripContent);

    // Featured = post con `featured: true` nel frontmatter; fallback ai 2 più recenti
    const flagged = allPosts.filter((post) => post.featured);
    const featured = (flagged.length > 0 ? flagged : allPosts).slice(0, 2);

    return {
        props: {
            posts: allPosts,
            featured,
        },
    };
}

export default articles