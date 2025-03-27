'use client'

import { useEffect } from 'react'
import { useActivePage } from '@/store/useStore'
import { usePathname } from 'next/navigation'
import logo from '../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { RxOpenInNewWindow } from 'react-icons/rx'
import Contatos from './Contatos'
import { useTheme } from 'next-themes'

import logob from '../../public/img/logob.png'

export default function Footer() {
  const { theme } = useTheme()
  const { setActivePage } = useActivePage()
  const pathname = usePathname()

  useEffect(() => {
    setActivePage(pathname)
  }, [pathname, setActivePage])

  const handleClick = (href: string) => {
    setActivePage(href)
  }

  return (
    <footer className="flex min-h-[100px] flex-col items-center justify-evenly border-t-2 border-solid border-y-primary dark:border-y-secundary bg-bglight pb-5 font-bold dark:bg-bgdark">
      <Link href="/" onClick={() => handleClick('/')} className="my-4">
        {theme === 'dark' ? (
          <Image
            src={logob}
            height={150}
            width={150}
            priority
            quality={100}
            alt="logo do site"
            className="w-full h-full"
          />
        ) : (
          <Image
            src={logo}
            height={150}
            width={150}
            priority
            quality={100}
            alt="logo do site"
            className="w-full  h-full"
          />
        )}
      </Link>
      <div className="mb-5 flex w-full flex-wrap justify-center gap-5 pt-5">
        <Contatos />
      </div>
      <div>
        <Link
          href="https://sandrofernandesdev.netlify.app/"
          target="_blank"
          className="mb-5 flex w-full flex-wrap items-center justify-center gap-1 text-textlight dark:text-textdark"
        >
          <p>Desenvolvido por:</p>
          <p>Sandro Fernandes</p>
          <RxOpenInNewWindow className="text-xl" />
        </Link>
      </div>
    </footer>
  )
}
