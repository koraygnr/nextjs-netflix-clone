import React, { useEffect, useState, useRef } from 'react';
import Logo from '@/assets/Logo';
import defaultAvatar from "../assets/defaultAvatar.png"
import { HiSearch } from 'react-icons/hi';
import { HiBell } from 'react-icons/hi';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import DropDown from './DropDown';
import { MdOutlineHelpOutline, MdOutlinePersonOutline } from 'react-icons/md';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import Image from 'next/image';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const { logout } = useAuth();
  const MenuList = [
    {
      name: 'Manage Profiles',
      icon: <HiOutlinePencilSquare />,
    },
    {
      name: 'Account',
      icon: <MdOutlinePersonOutline />,
    },
    {
      name: 'Help Center',
      icon: <MdOutlineHelpOutline />,
    },
    {
      name: 'Sign out of Netflix',
      onClick: logout,
    },
  ];

  const menuRef = useRef<HTMLImageElement>(null);

  window.addEventListener('click', (e) => {
    if (e.target !== menuRef.current) {
      setDropDownIsOpen(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-30 w-full flex justify-between items-center p-4 lg:px-10 lg:py-6 transition-all duration-200  ${
        isScrolled && 'bg-[#141414]'
      } `}
    >
      {/* Left Section */}
      <div className='flex items-center space-x-2 md:space-x-10'>
        <Link href='/'>
          <Logo />
        </Link>
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
        <HiSearch className='hidden sm:inline h-6 w-6' />
        <p className='hidden lg:inline'>Kids</p>
        <HiBell className='h-6 w-6' />
        <div className='relative'>
          <Image
            ref={menuRef}
            className='cursor-pointer rounded'
            src={defaultAvatar}
            alt='avatar'
            onClick={() => setDropDownIsOpen(!dropDownIsOpen)}
          />
          {dropDownIsOpen && <DropDown menuList={MenuList} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
