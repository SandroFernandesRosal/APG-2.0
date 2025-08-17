'use client'

import React, { useEffect, useState } from 'react'
import { useActivePage } from '@/store/useStore'
import { usePathname } from 'next/navigation'
import { AlignRight, X, ChevronDown } from 'lucide-react'
import NavBar from './NavBar'

import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/img/logo.png'
import logob from '../../public/img/logob.png'

import { useTheme } from 'next-themes'
import { SearchForm } from './search-form'
import { Notification } from './notification'

interface HeaderProps {
  children: React.ReactElement<{
    isOpen?: boolean
    onToggle?: () => void
    activePage?: string
    handleClick?: (href: string) => void
    onLoadingChange?: (loading: boolean) => void
    onRoleChange?: (role: string) => void
  }>
}

export default function Header({ children }: HeaderProps) {
  const [menu, setMenu] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [userLoading, setUserLoading] = useState(true)
  const [userRole, setUserRole] = useState<string>('')
  const { theme } = useTheme()

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

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const handleUserLoadingChange = (loading: boolean) => {
    setUserLoading(loading)
  }

  const handleUserRoleChange = (role: string) => {
    setUserRole(role)
  }

  // Clonar o children para passar as props de controle
  const childrenWithProps = React.cloneElement(children, {
    isOpen: userMenuOpen,
    onToggle: toggleUserMenu,
    activePage,
    handleClick,
    onLoadingChange: handleUserLoadingChange,
    onRoleChange: handleUserRoleChange,
  })

  return (
    <>
      <header className="font-Roboto fixed z-40 flex flex-col top-0">
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
            {/* Botão Adquirir Livro */}
            <a
              href="https://www.instagram.com/generosidade.livro/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-primary dark:bg-slate-800 hover:bg-primary/90 dark:hover:bg-slate-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              📖 Adquirir Livro
            </a>
            
            <div
              onClick={toggleUserMenu}
              className="hidden text-white md:flex items-center gap-1 cursor-pointer group"
            >
              {childrenWithProps}
              {!userLoading && (
                <ChevronDown
                  size={16}
                  className={`text-primary dark:text-white group-hover:text-secundary transition-all duration-200 ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              )}
            </div>
            <Notification />
          </div>

          <div onClick={handleMenu} className="md:hidden">
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
      </header>

      <NavBar
        handleMenu={handleMenu}
        menu={menu}
        user={childrenWithProps}
        userRole={userRole}
      />
    </>
  )
}
