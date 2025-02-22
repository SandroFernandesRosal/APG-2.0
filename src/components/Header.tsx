'use client'

import { useEffect, useState } from 'react'
import { useActivePage } from '@/store/useStore'
import { usePathname } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import NavBar from './NavBar'
import NavBarMd from './NavBarMd'

import Link from 'next/link'
import ChangeTheme from './ChangeTheme'
import Image from 'next/image'
import logo from '../../public/img/logo.png'
import { useToken } from '@/hooks/useToken'
import { useTokenIgreja } from '@/hooks/useTokenIgreja'

interface HeaderProps {
  children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  const [menu, setMenu] = useState(false)

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
        <div className="flex h-20 w-[100vw] items-center justify-evenly overflow-hidden border-b-2 border-solid border-b-secundary bg-bglightsecundary dark:bg-bgdarksecundary">
          <Link href="/" onClick={() => handleClick('/')}>
            <Image
              src={logo}
              height={50}
              width={200}
              priority
              alt="logo do site"
              className="h-[50px] w-[200px]"
            />
          </Link>

          <div className="hidden  md:flex">
            <ChangeTheme />
          </div>
          {token || tokenIgreja ? (
            <div className="hidden text-white md:flex">{children}</div>
          ) : (
            <Link
              href={'/login/igreja'}
              className="hidden md:flex md:flex-col md:items-center"
            >
              <FaUserCircle className="text-3xl font-bold text-secundary" />
              <span className="text-sm font-bold text-secundary">Entrar</span>
            </Link>
          )}

          <div
            onClick={handleMenu}
            className={
              'dark:hover:blue-500/50 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border-[2px] border-secundary hover:bg-gradient-to-r  hover:from-blue-900 hover:to-slate-900  md:hidden'
            }
          >
            {menu === false ? (
              <GiHamburgerMenu className="text-[22px] text-secundary" />
            ) : (
              <AiOutlineClose className="text-[25px]  text-secundary" />
            )}
          </div>
        </div>
        <NavBarMd activePage={activePage} handleClick={handleClick} />
      </header>

      <NavBar handleMenu={handleMenu} menu={menu} user={children} />
    </>
  )
}
