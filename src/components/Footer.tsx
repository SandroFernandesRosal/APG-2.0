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
    <footer className="relative z-20 w-full bg-gradient-to-t from-primary/10 via-bglight/80 to-white dark:from-secundary/10 dark:via-bgdark/80 dark:to-bgdark border-t-2 border-solid border-y-primary dark:border-y-secundary pt-10 pb-4 px-2">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 items-center">
        {/* Logo e nome */}
        <Link
          href="/"
          onClick={() => handleClick('/')}
          className="transition-transform hover:scale-105 duration-200 drop-shadow-lg flex flex-col items-center justify-center"
        >
          {theme === 'dark' ? (
            <Image
              src={logob}
              height={90}
              width={90}
              priority
              quality={100}
              alt="logo do site"
              className="w-24 h-24 object-contain"
            />
          ) : (
            <Image
              src={logo}
              height={90}
              width={90}
              priority
              quality={100}
              alt="logo do site"
              className="w-24 h-24 object-contain"
            />
          )}
          <span className="mt-2 text-xl font-extrabold tracking-widest text-primary dark:text-secundary drop-shadow-sm select-none text-center">
            MINISTÉRIO ALCANÇADOS PELA GRAÇA
          </span>
        </Link>

        {/* Contatos */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-primary dark:text-secundary font-bold text-xl mb-4 tracking-wide uppercase">
            Contatos
          </h2>
          <Contatos />
        </div>

        {/* Navegação rápida */}
        <nav className="w-full flex flex-wrap justify-center gap-4 text-sm font-semibold mb-2">
          <Link
            href="/"
            className="hover:text-primary dark:hover:text-secundary transition-colors"
          >
            Início
          </Link>
          <Link
            href="/noticias"
            className="hover:text-primary dark:hover:text-secundary transition-colors"
          >
            Notícias
          </Link>
          <Link
            href="/agenda"
            className="hover:text-primary dark:hover:text-secundary transition-colors"
          >
            Agenda
          </Link>
          <Link
            href="/ministerio"
            className="hover:text-primary dark:hover:text-secundary transition-colors"
          >
            Ministério
          </Link>
          <Link
            href="/doacao"
            className="hover:text-primary dark:hover:text-secundary transition-colors"
          >
            Doações
          </Link>
          <Link
            href="/igrejas"
            className="hover:text-primary dark:hover:text-secundary transition-colors"
          >
            Igrejas
          </Link>
          <Link
            href="/testemunhos"
            className="hover:text-primary dark:hover:text-secundary transition-colors"
          >
            Testemunhos
          </Link>
        </nav>

        {/* Linha divisória decorativa */}
        <div className="w-full h-[2px] bg-gradient-to-r from-primary/30 via-transparent to-secundary/30 my-4 rounded-full" />

        {/* Redes sociais rápidas */}
        <div className="flex gap-4 mb-2">
          <a
            href="https://www.instagram.com/apgviladapenha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-full bg-primary/10 dark:bg-secundary/10 p-2 hover:bg-primary/30 dark:hover:bg-secundary/30 transition-colors"
          >
            <svg
              className="w-6 h-6 text-primary dark:text-secundary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect width="18" height="18" x="3" y="3" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17" cy="7" r="1.5" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/apgviladapenha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="rounded-full bg-primary/10 dark:bg-secundary/10 p-2 hover:bg-primary/30 dark:hover:bg-secundary/30 transition-colors"
          >
            <svg
              className="w-6 h-6 text-primary dark:text-secundary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 2.1A2.1 2.1 0 0 1 19.1 4.2v15.6A2.1 2.1 0 0 1 17 21.9H7A2.1 2.1 0 0 1 4.9 19.8V4.2A2.1 2.1 0 0 1 7 2.1h10zm-2.2 4.2h-1.4c-.7 0-.9.3-.9.9v1.4h2.3l-.3 2.3h-2v6.1h-2.4v-6.1h-2v-2.3h2v-1.7c0-1.6 1-2.5 2.5-2.5h1.7v2.2z" />
            </svg>
          </a>
          <a
            href="https://wa.me/5521967514085"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="rounded-full bg-primary/10 dark:bg-secundary/10 p-2 hover:bg-primary/30 dark:hover:bg-secundary/30 transition-colors"
          >
            <svg
              className="w-6 h-6 text-primary dark:text-secundary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.63-.5-5.18-1.44l-.37-.22-3.67.96.98-3.58-.23-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
            </svg>
          </a>
        </div>

        {/* Créditos */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-2">
          <span className="text-xs text-gray-400 dark:text-gray-600">
            &copy; {new Date().getFullYear()} Todos os direitos reservados
          </span>
          <Link
            href="https://www.sandrodev.com.br"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-primary/10 via-white/80 to-secundary/10 dark:from-secundary/20 dark:via-bgdark/80 dark:to-primary/10 border border-primary/30 dark:border-secundary/30 shadow font-bold text-primary dark:text-secundary hover:bg-primary/20 dark:hover:bg-secundary/20 hover:shadow-lg transition"
          >
            <span className="tracking-wide">
              Desenvolvido por Sandro Fernandes
            </span>
            <RxOpenInNewWindow className="text-lg" />
          </Link>
        </div>
      </div>
      {/* Faixa decorativa na base */}
      <div className="absolute left-0 bottom-0 w-full h-2 bg-gradient-to-r from-primary/30 via-transparent to-secundary/30 pointer-events-none" />
    </footer>
  )
}
