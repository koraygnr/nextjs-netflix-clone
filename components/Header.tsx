import React, { useEffect, useState } from 'react'
import Logo from '@/assets/Logo'
import { HiSearch } from "react-icons/hi"
import { HiBell } from "react-icons/hi"
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'

function Header() {
    const [ isScrolled, setIsScrolled ] = useState(false)
    const { logout } = useAuth()


    useEffect(()=> {
        const handleScroll = () => {
            if ( window.scrollY > 0 ) {
                setIsScrolled(true)
            }else {
                setIsScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    },[])
    
    return (
        <header className={`${isScrolled && "bg-[#141414]"} transition duration-200 z-30`}>
            {/* Left Section */}
            <div className='flex items-center space-x-2 md:space-x-10'>
                <Logo />
                <ul className='hidden space-x-4 md:flex'>
                    <li className='headerLink'>Home</li>
                    <li className='headerLink'>TV Shows</li>
                    <li className='headerLink'>Movies</li>
                    <li className='headerLink'>New & Popular</li>
                    <li className='headerLink'>My List</li>
                </ul>
            </div>
            {/* Right Section */}
            <div className='flex items-center space-x-4 text-sm font-light'>
                <HiSearch className='hidden sm:inline h-6 w-6'/>
                <p className='hidden lg:inline'>Kids</p>
                <HiBell className='h-6 w-6' />
                {/* <Link href="/account"> */}
                    <img 
                        className='cursor-pointer rounded'
                        src="./defaultAvatar.png" 
                        alt=""
                        onClick={logout}
                    />
                {/* </Link> */}
            </div>
        </header>
    )
}

export default Header