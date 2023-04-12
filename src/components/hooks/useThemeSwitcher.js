import { useEffect, useState } from 'react'

const useThemeSwitcher = () => {
    const preferDarkQuery = "(prefers-color-scheme: dark)"
    const [mode, setMode] = useState()

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery)
        const userPref = window.localStorage.getItem('theme')
        
        const handleChange = () => {
            let check = ''
            
            if(userPref) {
                check = userPref === 'dark' ? 'dark' : 'light'
                
            } else {
                check = mediaQuery.matches ? 'dark' : 'light'
            }

            setMode(check)

            if(check === 'dark') {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }

        handleChange()
        
        mediaQuery.addEventListener('change', handleChange)

        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    useEffect(() => {
        
        if('dark' === mode) {
            window.localStorage.setItem('theme', 'dark')
            document.documentElement.classList.add('dark')
        } 
        
        if('light' === mode) {
            window.localStorage.setItem('theme', 'light')
            document.documentElement.classList.remove('dark')
        }
    }, [mode])

  return [mode, setMode]
}

export default useThemeSwitcher