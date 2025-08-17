'use client'
import Image from 'next/image'
import Link from 'next/link'

import LogoutIgreja from './LogoutIgreja'
import { useState } from 'react'
import { X } from 'lucide-react'
import { BiNews, BiHomeHeart } from 'react-icons/bi'
import { AiOutlineSchedule } from 'react-icons/ai'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import {
  FaHandHoldingHeart,
  FaMapMarkerAlt,
  FaUserCircle,
} from 'react-icons/fa'
import { VscHeartFilled } from 'react-icons/vsc'
import { useTheme } from 'next-themes'
import { useToken } from '@/hooks/useToken'

interface userProps {
  avatarUrl?: string
  name: string
  role?: 'ADMIN' | 'MEMBRO' | 'SUPERADMIN'
  isOpen?: boolean
  onToggle?: () => void
  activePage?: string
  handleClick?: (href: string) => void
}

export default function ItemUser({
  avatarUrl,
  name,
  role,
  isOpen,
  onToggle,
  activePage,
  handleClick,
}: userProps) {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const token = useToken()

  // Usar o estado controlado se fornecido, senão usar o estado interno
  const modalOpen = isOpen !== undefined ? isOpen : open
  const toggleModal = onToggle || (() => setOpen(!open))

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navItems = [
    {
      href: '/quemsomos',
      icon: BiHomeHeart,
      label: 'Quem Somos',
      color: 'from-blue-500 to-blue-600',
    },
    {
      href: '/enderecos',
      icon: FaMapMarkerAlt,
      label: 'Endereços',
      color: 'from-green-500 to-green-600',
    },
    {
      href: '/ministerio',
      icon: BsFillPersonLinesFill,
      label: 'Ministério',
      color: 'from-purple-500 to-purple-600',
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

  return (
    <div className="hidden md:flex">
      <div className="flex items-center gap-1">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`imagem de perfil de ${name}`}
            width={40}
            height={40}
            className="p-[2px] mr-1 w-[40px] h-[40px] rounded-full border-[1px] border-primary dark:border-secundary cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={toggleModal}
          />
        ) : (
          <div
            className="p-[2px] mr-1 w-[40px] h-[40px] rounded-full border-[1px] border-primary dark:border-secundary cursor-pointer hover:scale-105 transition-transform duration-200 flex items-center justify-center"
            onClick={toggleModal}
          >
            <FaUserCircle
              size={32}
              className="text-primary dark:text-secundary"
            />
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="absolute top-20 right-[15%] lg:right-[20%] bg-white dark:bg-gray-800 z-30 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 min-w-[320px] max-h-[80vh]">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary/10 to-secundary/10 dark:from-primary/20 dark:to-secundary/20 p-4 sticky top-0 z-10">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 p-1 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>

            <div className="flex items-center gap-3">
              {token ? (
                <>
                  {avatarUrl && (
                    <div className="relative">
                      <Image
                        src={avatarUrl}
                        alt={`imagem de perfil de ${name}`}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-full border-2 border-primary dark:border-secundary shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {name}
                    </p>
                    <span className="text-sm font-medium text-primary dark:text-secundary bg-primary/10 dark:bg-secundary/10 px-2 py-1 rounded-full inline-block w-fit">
                      {role}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex w-full items-center justify-center gap-4">
                  <Link
                    href={'/login'}
                    onClick={toggleModal}
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
          <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
            {/* Navigation Section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Navegação
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activePage === item.href

                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 cursor-pointer group ${
                          isActive
                            ? 'bg-gradient-to-r ' +
                              item.color +
                              ' text-white shadow-md'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => {
                          handleClick?.(item.href)
                          toggleModal()
                        }}
                      >
                        <Icon
                          className={`text-lg mb-1 ${
                            isActive
                              ? 'text-white'
                              : 'text-primary dark:text-secundary'
                          }`}
                        />
                        <p
                          className={`text-xs font-bold text-center ${
                            isActive ? 'text-white' : ''
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* User Actions - Apenas para usuários autenticados */}
            {token && (
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                  Configurações
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={'/perfil'}
                    className="flex flex-col items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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

                  {(role === 'SUPERADMIN' || role === 'ADMIN') && (
                    <Link
                      href={'/usuarios'}
                      className="flex flex-col items-center justify-center p-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
                  )}

                  {role === 'SUPERADMIN' && (
                    <Link
                      href={'/admin/historico'}
                      className="flex flex-col items-center justify-center p-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
                  )}

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
      )}
    </div>
  )
}
