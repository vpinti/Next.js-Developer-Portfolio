import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import LiIcon from "./LiIcon"

const Details = ({position, company, companyLink, time, address, work}) => {
    const ref = useRef(null)
    
    return (
        <li ref={ref} className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]">
            <LiIcon reference={ref} />
            <motion.div
            initial={{y:50}}
            whileInView={{y:0}}
            transition={{duration:0.5, type:'spring'}}
            >
                <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">{position}&nbsp;<a href={companyLink} 
                    target='_blank'
                    className="text-primary dark:text-primaryDark capitalize"
                    >@{company}</a></h3>
                <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
                    {time} | {address}
                </span>
                <p className="font-medium w-full md:text-sm">
                    {work}
                </p>
            </motion.div>
        </li>
    )
}

const Experience = () => {
    const ref = useRef(null)
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['start end', 'center start']
    })

  return (
    <div className='my-64 xs:my-28 sm:my-24 md:my-20'>
        <h2 className='font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16'>
            Experience
        </h2>

        <div className='w-[75%] mx-auto relative lg:w-[90%] md:w-full' ref={ref}>
            <motion.div style={{scaleY: scrollYProgress}} className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"/>
            <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
                <Details
                    position='Backend / Web Developer'
                    company='Prestiter S.p.A.'
                    companyLink='https://www.prestiter.it'
                    time='2018 - Present'
                    address='Italy'
                    work='Development and evolution of the company CRM (Zend Framework/PHP). Led the migration of the
                    entire codebase from Zend Framework 1 to PHP 8.2 and designed a Laravel-style database migration
                    system integrated into the CI/CD pipelines (GitHub Actions). Design and security hardening (OWASP)
                    of REST/SOAP/GraphQL APIs, MySQL query optimization, mentoring and TDD with PHPUnit in an
                    Agile/Scrum environment.'
                />
                <Details
                    position='Quality Department'
                    company='Fiat Chrysler Automobiles'
                    companyLink='#'
                    time='1998 - 2018'
                    address='Termoli, Italy'
                    work='Quality control and supplier auditing. A background that built process rigor and attention to
                    quality, now applied to software development.'
                />
            </ul>
        </div>
    </div>
  )
}

export default Experience