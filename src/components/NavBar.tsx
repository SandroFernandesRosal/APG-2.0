import Link from 'next/link'
import LogoutIgreja from './LogoutIgreja'
import { BiNews, BiHomeHeart, BiBook } from 'react-icons/bi'

import { AiOutlineSchedule } from 'react-icons/ai'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import {
  FaHandHoldingHeart,
  FaMapMarkerAlt,
  FaUserCircle,
} from 'react-icons/fa'
import { VscHeartFilled } from 'react-icons/vsc'

import { useToken } from '@/hooks/useToken'
import { useTheme } from 'next-themes'

import { Notification } from './notification'

interface NavBarProps {
  handleMenu: () => void
  menu: boolean
  user: React.ReactNode
  userRole?: string
}

export default function NavBar({
  handleMenu,
  menu,
  user,
  userRole,
}: NavBarProps) {
  const token = useToken()
  const { theme, setTheme } = useTheme()

  const navItems = [
    {
      href: '/quemsomos',
      icon: BiHomeHeart,
      label: 'Quem Somos',
      color: 'from-blue-500 to-blue-600',
    },
    {
      href: '/igrejas',
      icon: FaMapMarkerAlt,
      label: 'Igrejas',
      color: 'from-green-500 to-green-600',
    },
    {
      href: '/ministerio',
      icon: BsFillPersonLinesFill,
      label: 'Ministério',
      color: 'from-purple-500 to-purple-600',
    },
    {
      href: '/biblia',
      icon: BiBook,
      label: 'Bíblia',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      href: '/doacao',
      icon: FaHandHoldingHeart,
      label: 'Doação',
      color: 'from-red-500 to-red-600',
    },
    {
      href: '/agenda',
      icon: AiOutlineSchedule,
      label: 'Agenda',
      color: 'from-orange-500 to-orange-600',
    },
    {
      href: '/noticias',
      icon: BiNews,
      label: 'Notícias',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      href: '/testemunhos',
      icon: VscHeartFilled,
      label: 'Testemunhos',
      color: 'from-pink-500 to-pink-600',
    },
  ]

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      {/* Backdrop para fechar o modal ao clicar fora */}
      {menu && (
        <div className="fixed inset-0 z-30 bg-black/50" onClick={handleMenu} />
      )}

      <nav
        className={`font-Roboto fixed right-0 z-40 top-20 flex w-[80vw] transform bg-white dark:bg-gray-800 shadow-2xl border-l-2 border-gray-200 dark:border-gray-700 transition-all duration-500 ease-in-out md:hidden h-[calc(100vh-5rem)] ${
          menu ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col w-full h-full overflow-hidden">
          {/* Header Section - Apenas imagem, nome, role e notificação */}
          <div className="bg-gradient-to-r from-primary/10 to-secundary/10 dark:from-primary/20 dark:to-secundary/20 p-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <Notification />
              <button
                onClick={handleMenu}
                className="p-2 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex w-full items-center justify-center">
              {token ? (
                <div className="w-full text-textlight dark:text-textdark">
                  {user}
                </div>
              ) : (
                <div className="flex w-full items-center justify-center gap-4">
                  <Link
                    href={'/login'}
                    onClick={handleMenu}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-16 h-16"
                  >
                    <FaUserCircle
                      size={24}
                      className="text-primary dark:text-secundary"
                    />
                    <span className="text-xs mt-1 font-bold">Entrar</span>
                  </Link>
                  <div
                    className="p-3 rounded-xl bg-gray-300 dark:bg-gray-700 shadow-lg w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                    onClick={handleThemeChange}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-6 h-6 flex items-center justify-center">
                        {theme === 'dark' ? (
                          <svg
                            className="w-6 h-6 text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-purple-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs mt-1 font-bold text-gray-700 dark:text-gray-300">
                        Tema
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content with scroll */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {/* Navigation Section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Navegação
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 cursor-pointer group bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        onClick={handleMenu}
                      >
                        <Icon className="text-lg mb-1 text-primary dark:text-secundary" />
                        <p className="text-xs font-bold text-center">
                          {item.label}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Botão Adquirir Livro */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Não seja dizimista, seja generoso
              </h3>
              <a
                href="https://www.instagram.com/generosidade.livro/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 bg-primary dark:bg-slate-800 hover:bg-primary/90 dark:hover:bg-slate-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={handleMenu}
              >
                📖 Adquirir Livro
              </a>
            </div>

            {/* User Actions Section - Botões de configurações no final */}
            {token && (
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                  Configurações
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={'/perfil'}
                    className="flex flex-col items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    onClick={handleMenu}
                  >
                    <svg
                      className="w-5 h-5 mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-xs font-bold">Perfil</span>
                  </Link>

                  {userRole === 'ADMIN' || userRole === 'SUPERADMIN' ? (
                    <Link
                      href={'/usuarios'}
                      className="flex flex-col items-center justify-center p-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      onClick={handleMenu}
                    >
                      <svg
                        className="w-5 h-5 mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                      <span className="text-xs font-bold">Usuários</span>
                    </Link>
                  ) : null}

                  {userRole === 'SUPERADMIN' ? (
                    <Link
                      href={'/admin/historico'}
                      className="flex flex-col items-center justify-center p-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      onClick={handleMenu}
                    >
                      <svg
                        className="w-5 h-5 mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs font-bold">Histórico</span>
                    </Link>
                  ) : null}

                  <LogoutIgreja
                    className="flex flex-col items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    showIcon={true}
                  />

                  <div
                    className="flex flex-col items-center justify-center p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg transition-colors cursor-pointer border border-gray-200 dark:border-transparent group"
                    onClick={handleThemeChange}
                  >
                    <div className="w-6 h-6 mb-1 flex items-center justify-center">
                      {theme === 'dark' ? (
                        <svg
                          className="w-6 h-6 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="5" />
                          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-purple-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs font-bold">Tema</span>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Section */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 mt-4">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p className="font-bold">Igreja Alcançados pela Graça</p>
                <p className="text-xs mt-1 font-bold">
                  Conectando vidas através da fé
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
