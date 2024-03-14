import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'

export default function Darkmode(){
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    // console.log(theme)
    useEffect(() => setMounted(true), [])

    // console.log(theme)
    if (!mounted) return null
    return(
        <div className="flex">
            <button title={`Switch to ${theme === 'light' ? 'dark':'light'} theme`} 
            onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
            }}
            >
                {
                    theme == 'dark' ? <BiMoon className="text-cText dark:text-white text-3xl"/>:<BiSun className="text-cText dark:text-white text-3xl"/>
                }
            </button>
        </div>
    )
}