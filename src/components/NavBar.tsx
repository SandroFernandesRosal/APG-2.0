import Link from 'next/link'
import ChangeTheme from './ChangeTheme'
import { BiNews, BiHomeHeart } from 'react-icons/bi'

import { AiOutlineSchedule } from 'react-icons/ai'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import {
  FaHandHoldingHeart,
  FaMapMarkerAlt,
  FaUserCircle,
} from 'react-icons/fa'
import { VscHeartFilled } from 'react-icons/vsc'

import { useToken } from '@/hooks/useToken'

import { Notification } from './notification'

interface NavBarProps {
  handleMenu: () => void
  menu: boolean
  user: React.ReactNode
}

export default function NavBar({ handleMenu, menu, user }: NavBarProps) {
  const token = useToken()

  return (
    <nav
      className={`font-Roboto fixed right-0 z-50 top-20 flex min-h-screen w-[70vw] transform flex-col items-center justify-center gap-10 border-l-[3px] border-primary dark:border-secundary bg-bglightsecundary font-bold backdrop-blur-md transition-transform duration-500 ease-in-out dark:bg-bgdarksecundary md:hidden ${
        menu ? 'translate-x-0 ' : 'translate-x-full'
      } `}
    >
      {' '}
      <Notification />
      <div className="flex w-full items-center justify-around">
        {token ? (
          <div onClick={handleMenu}>{user}</div>
        ) : (
          <div className="mx-2 flex w-full items-center justify-around">
            <Link
              href={'/login'}
              onClick={handleMenu}
              className="flex flex-col items-center justify-center"
            >
              <FaUserCircle
                size={40}
                className="font-bold text-primary dark:text-secundary hover:text-secundary dark:hover:text-primary"
              />
            </Link>
            <ChangeTheme />
          </div>
        )}
      </div>
      <div className="flex w-[80%] flex-col gap-3">
        <Link
          href="/quemsomos"
          className="flex items-center gap-5  text-xl hover:text-primary  dark:hover:text-secundary"
          onClick={handleMenu}
        >
          <BiHomeHeart className="text-primary dark:text-secundary" />
          <p>Quem Somos</p>
        </Link>
        <Link
          href="/enderecos"
          className="flex items-center gap-5 text-xl hover:text-primary  dark:hover:text-secundary"
          onClick={handleMenu}
        >
          <FaMapMarkerAlt className="text-primary dark:text-secundary" />
          <p>Endereços</p>
        </Link>
        <Link
          href="/ministerio"
          className="flex items-center gap-5  text-xl hover:text-primary  dark:hover:text-secundary"
          onClick={handleMenu}
        >
          <BsFillPersonLinesFill className="text-primary dark:text-secundary" />
          <p>Ministério</p>
        </Link>
        <Link
          href="/doacao"
          className="flex items-center gap-5  text-xl hover:text-primary  dark:hover:text-secundary"
          onClick={handleMenu}
        >
          <FaHandHoldingHeart className="text-primary dark:text-secundary" />
          <p>Doação</p>
        </Link>
        <Link
          href="/agenda"
          className="flex items-center gap-5  text-xl hover:text-primary  dark:hover:text-secundary"
          onClick={handleMenu}
        >
          <AiOutlineSchedule className="text-primary dark:text-secundary" />
          <p>Agenda</p>
        </Link>

        <Link
          href="/noticias"
          className="flex items-center gap-5  text-xl hover:text-primary dark:border-secundary dark:hover:text-secundary"
          onClick={handleMenu}
        >
          <BiNews className="text-primary dark:text-secundary" />
          <p>Notícias</p>
        </Link>
        <Link
          href="/testemunhos"
          className="flex items-center gap-5  text-xl hover:text-prima  dark:hover:text-secundary"
          onClick={handleMenu}
        >
          <VscHeartFilled className="text-primary dark:text-secundary" />
          <p>Testemunhos</p>
        </Link>
      </div>
    </nav>
  )
}
