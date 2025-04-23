'use client'

import { useEffect, useState } from 'react'
import { useActivePage } from '@/store/useStore'
import { usePathname } from 'next/navigation'

import { FaUserCircle } from 'react-icons/fa'
import { AlignRight, X } from 'lucide-react'
import NavBar from './NavBar'
import NavBarMd from './NavBarMd'

import Link from 'next/link'
import ChangeTheme from './ChangeTheme'
import Image from 'next/image'
import logo from '../../public/img/logo.png'
import logob from '../../public/img/logob.png'
import { useToken } from '@/hooks/useToken'
import { useTokenIgreja } from '@/hooks/useTokenIgreja'
import { useTheme } from 'next-themes'
import { SearchForm } from './search-form'
import { Notification } from './notification'

interface HeaderProps {
  children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  const [menu, setMenu] = useState(false)
  const { theme } = useTheme()

  const token = useToken()
  const tokenIgreja = useTokenIgreja()

  const pathname = usePathname()

  const { activePage, setActivePage } = useActivePage()

  useEffect(() => {
    setActivePage(pathname)
  }, [pathname, setActivePage])

  const handleClick = (href: string) => {
    setActivePage(href)
  }

  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <>
      <header className="font-Roboto fixed z-50 flex flex-col top-0">
        <div className="flex h-20 w-[100vw] items-center justify-evenly overflow-hidden border-b-2 border-solid border-b-primary dark:border-b-secundary bg-bglight dark:bg-bgdark">
          <Link href="/" onClick={() => handleClick('/')}>
            {theme === 'dark' ? (
              <Image
                src={logob}
                height={60}
                width={60}
                priority
                quality={100}
                alt="logo do site"
                className="w-full h-full"
              />
            ) : (
              <Image
                src={logo}
                height={60}
                width={60}
                priority
                quality={100}
                alt="logo do site"
                className="w-full  h-full"
              />
            )}
          </Link>

          <div className="flex justify-center items-center ">
            <SearchForm />
          </div>
          <div className="items-center gap-4 hidden md:flex">
            <div className="hidden md:flex">
              <ChangeTheme />
            </div>
            {token || tokenIgreja ? (
              <div className="hidden text-white md:flex">{children}</div>
            ) : (
              <Link
                href={'/login/igreja'}
                className="hidden md:flex md:flex-col md:items-center"
              >
                <FaUserCircle
                  size={40}
                  className="font-bold text-primary dark:text-white hover:text-primary/50 dark:hover:text-secundary"
                />
              </Link>
            )}
            <Notification />
          </div>

          <div onClick={handleMenu} className={'md:hidden'}>
            {menu === false ? (
              <AlignRight
                size={40}
                className=" text-primary hover:text-primary/50 dark:text-white dark:hover:text-secundary cursor-pointer"
              />
            ) : (
              <X
                size={40}
                className=" text-primary hover:text-secundary dark:text-white dark:hover:text-secundary cursor-pointer"
              />
            )}
          </div>
        </div>
        <NavBarMd activePage={activePage} handleClick={handleClick} />
      </header>

      <NavBar handleMenu={handleMenu} menu={menu} user={children} />
    </>
  )
}
