import Link from 'next/link'
import { BiNews, BiHomeHeart } from 'react-icons/bi'

import { AiOutlineSchedule } from 'react-icons/ai'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { FaHandHoldingHeart, FaMapMarkerAlt } from 'react-icons/fa'
import { VscHeartFilled } from 'react-icons/vsc'

interface NavBarMdProps {
  activePage: string
  handleClick: (href: string) => void
}

export default function NavBarMd({ activePage, handleClick }: NavBarMdProps) {
  const navItems = [
    {
      href: '/quemsomos',
      icon: BiHomeHeart,
      label: 'Quem Somos',
      color: 'from-blue-500 to-blue-600'
    },
    {
      href: '/enderecos',
      icon: FaMapMarkerAlt,
      label: 'Endereços',
      color: 'from-green-500 to-green-600'
    },
    {
      href: '/ministerio',
      icon: BsFillPersonLinesFill,
      label: 'Ministério',
      color: 'from-purple-500 to-purple-600'
    },
    {
      href: '/doacao',
      icon: FaHandHoldingHeart,
      label: 'Doação',
      color: 'from-red-500 to-red-600'
    },
    {
      href: '/agenda',
      icon: AiOutlineSchedule,
      label: 'Agenda',
      color: 'from-orange-500 to-orange-600'
    },
    {
      href: '/noticias',
      icon: BiNews,
      label: 'Notícias',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      href: '/testemunhos',
      icon: VscHeartFilled,
      label: 'Testemunhos',
      color: 'from-pink-500 to-pink-600'
    }
  ]

  return (
    <nav className="font-Roboto hidden md:flex items-center justify-center gap-4 p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 max-w-6xl w-full justify-center flex-wrap">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.href
          
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 cursor-pointer group min-w-[100px] ${
                  isActive
                    ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                onClick={() => handleClick(item.href)}
              >
                <Icon 
                  className={`text-2xl mb-2 transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-primary dark:text-secundary group-hover:scale-110'
                  }`} 
                />
                <p className={`text-sm font-medium text-center transition-all duration-300 ${
                  isActive 
                    ? 'text-white' 
                    : 'group-hover:font-semibold'
                }`}>
                  {item.label}
                </p>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
