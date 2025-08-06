import { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue } from 'framer-motion'
import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import article1 from '../../public/images/articles/pagination component in reactjs.jpg'
import article2 from '../../public/images/articles/create loading screen in react js.jpg'
import article3 from '../../public/images/articles/create modal component in react using react portals.png'
import article4 from '../../public/images/articles/form validation in reactjs using custom react hook.png'
import article5 from '../../public/images/articles/smooth scrolling in reactjs.png'
import TransitionEffect from '@/components/TransitionEffect'

const articles = () => {

    const FramerImage = motion(Image)

    const MovingImg = ({title, img, link}) => {

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
            <Link href={link} target='_blank'
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
                    alt={title} 
                    className='z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden' 
                />
            </Link>
        )
    }

    const Article = ({img, title, date, link}) => {
        return (
            <motion.li 
            initial={{y:200}}
            whileInView={{y:0, transition:{duration: 0.5, ease: 'easeInOut'}}}
            viewport={{once:true}}
            className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center
             justify-between bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4 dark:border-light
             dark:bg-dark dark:text-light sm:flex-col'>
                <MovingImg title={title} img={img} link={link} />
                <span className='text-primary dark:text-primaryDark font-semibold pl-4 sm:self-start sm:pl-0 xs:text-sm'>{date}</span>
            </motion.li>
        )
    }

    const FeaturedArticles = ({img, title, time, summary, link}) => {
        return (
            <li className='relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light'>
                <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl'/>
                <Link href={link} target='_blank' className='w-full inline-block cursor-pointer overflow-hidden rounded-lg'>
                    <FramerImage src={img} alt={title} className='w-full h-auto'
                      whileHover={{scale:1.05}}
                      transition={{duration:0.2}}
                      priority
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw' 
                    />
                </Link>
                <Link href={link} target='_blank'>
                    <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg'>{title}</h2>
                </Link>
                <p className='text-sm mb-2'>{summary}</p>
                <span className='text-primary dark:text-primaryDark font-semibold'>{time}</span>
            </li>
        )
    }

  return (
    <>
        <Head>
            <title>Vittorio Pinti | Articles Page</title>
            <meta name='description' content=''/>
        </Head>
        <TransitionEffect />
        <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light'>
            <Layout className='pt-16'>
                <AnimatedText text='Words Can Change The World!' className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl'/>
                <ul className='grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16'>
                    <FeaturedArticles 
                        title='Build A Custom Pagination Component In Reactjs From Scratch'
                        summary='Learn how to build a custom pagination component in ReactJS from scratch. 
                        Follow this step-by-step guide to integrate Pagination component in your ReactJS project.'
                        time='9 min read'
                        link='/blogs/pagination-component-reactjs'
                        img={article1}
                    />
                    <FeaturedArticles 
                        title='Create Loading Screen In React JS'
                        summary='How to create a beautiful loading screen in React JS using best practices.'
                        time='7 min read'
                        link='/blogs/loading-screen-reactjs'
                        img={article2}
                    />
                </ul>
                <h2 className='font-bold text-4xl w-full text-center my-16 mt-32'>All Articles</h2>
                <ul>
                    <Article 
                        title='Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling'
                        date='March 22, 2023'
                        link='/blogs/form-validation-reactjs'
                        img={article3}
                    />
                    <Article 
                        title='Create Modal Component In React Using React Portals'
                        date='April 10, 2023'
                        link='/blogs/modal-component-react-portals'
                        img={article4}
                    />
                    <Article 
                        title='Smooth Scrolling In ReactJS'
                        date='May 5, 2023'
                        link='/blogs/smooth-scrolling-reactjs'
                        img={article5}
                    />
                    <Article 
                        title='Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling'
                        date='March 22, 2023'
                        link='/blogs/form-validation-reactjs'
                        img={article3}
                    />
                    <Article 
                        title='Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling'
                        date='March 22, 2023'
                        link='/blogs/form-validation-reactjs'
                        img={article3}
                    />
                    <Article 
                        title='Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling'
                        date='March 22, 2023'
                        link='/blogs/form-validation-reactjs'
                        img={article3}
                    />
                    <Article 
                        title='Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling'
                        date='March 22, 2023'
                        link='/blogs/form-validation-reactjs'
                        img={article3}
                    />
                </ul>
            </Layout>
        </main>
    </>
  )
}

export default articles