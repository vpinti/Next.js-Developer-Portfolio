import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {motion} from 'framer-motion'

const MotionLink = motion.create(Link)

const Logo = () => {
  return (
    <div className='flex items-center justify-center mt-2'>
        <MotionLink href='/'
        className='flex items-center justify-center'
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        >
         <Image src='/images/vp-logo.png' alt='Vittorio Pinti' width={64} height={64} className='w-14 h-14 object-contain' priority />
        </MotionLink>
    </div>
  )
}

export default Logo
