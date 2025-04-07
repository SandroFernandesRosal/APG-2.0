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
  return (
    <nav
      className={`font-Roboto font-bold hidden  items-center justify-center gap-3 overflow-x-auto bg-bglight/50 p-3 pb-[5px] backdrop-blur-sm dark:bg-bgdark/50 md:flex md:rounded-lg  md:self-center lg:gap-4`}
    >
      <Link href="/quemsomos">
        <div
          className={`flex flex-col items-center justify-center hover:text-primary dark:hover:text-secundary lg:text-lg ${
            activePage === '/quemsomos'
              ? 'border-b-2 border-primary text-primary dark:border-secundary dark:text-secundary dark:hover:text-secundary'
              : ''
          }`}
          onClick={() => handleClick('/quemsomos')}
        >
          <BiHomeHeart className="text-primary dark:text-secundary" />{' '}
          <p>Quem Somos</p>
        </div>
      </Link>
      <Link href="/enderecos">
        <div
          className={`flex flex-col items-center justify-center hover:text-primary dark:hover:text-secundary lg:text-lg ${
            activePage === '/enderecos'
              ? 'border-b-2 border-primary text-primary dark:border-secundary dark:text-secundary dark:hover:text-secundary'
              : ''
          }`}
          onClick={() => handleClick('/enderecos')}
        >
          <FaMapMarkerAlt className="text-primary dark:text-secundary" />{' '}
          <p>Endereços</p>
        </div>
      </Link>
      <Link href="/ministerio">
        <div
          className={`flex flex-col items-center justify-center hover:text-primary dark:hover:text-secundary lg:text-lg ${
            activePage === '/ministerio'
              ? 'border-b-2 border-primary text-primary dark:border-secundary dark:text-secundary dark:hover:text-secundary'
              : ''
          }`}
          onClick={() => handleClick('/ministerio')}
        >
          <BsFillPersonLinesFill className="text-primary dark:text-secundary" />{' '}
          <p>Ministério</p>
        </div>
      </Link>
      <Link href="/doacao">
        <div
          className={`flex flex-col items-center justify-center hover:text-primary dark:hover:text-secundary lg:text-lg ${
            activePage === '/doacao'
              ? 'border-b-2 border-primary text-primary dark:border-secundary dark:text-secundary dark:hover:text-secundary'
              : ''
          }`}
          onClick={() => handleClick('/doacao')}
        >
          <FaHandHoldingHeart className="text-primary dark:text-secundary" />{' '}
          <p>Doação</p>
        </div>
      </Link>
      <Link href="/agenda">
        <div
          className={`flex flex-col items-center justify-center hover:text-primary dark:hover:text-secundary lg:text-lg ${
            activePage === '/agenda'
              ? 'border-b-2 border-primary text-primary dark:border-secundary dark:text-secundary dark:hover:text-secundary'
              : ''
          }`}
          onClick={() => handleClick('/agenda')}
        >
          <AiOutlineSchedule className="text-primary dark:text-secundary" />{' '}
          <p>Agenda</p>
        </div>
      </Link>

      <Link href="/noticias">
        <div
          className={`flex flex-col items-center justify-center hover:text-primary dark:hover:text-secundary lg:text-lg ${
            activePage === '/noticias'
              ? 'border-b-2 border-primary text-primary dark:border-secundary dark:text-secundary dark:hover:text-secundary'
              : ''
          }`}
          onClick={() => handleClick('/noticias')}
        >
          <BiNews className="text-primary dark:text-secundary" />{' '}
          <p>Notícias</p>
        </div>
      </Link>
      <Link href="/testemunhos">
        <div
          className={`flex flex-col items-center justify-center hover:text-primary dark:hover:text-secundary lg:text-lg ${
            activePage === '/testemunhos'
              ? 'border-b-2 border-primary text-primary dark:border-secundary dark:text-secundary dark:hover:text-secundary'
              : ''
          }`}
          onClick={() => handleClick('/testemunhos')}
        >
          <VscHeartFilled className="text-primary dark:text-secundary" />{' '}
          <p>Testemunhos</p>
        </div>
      </Link>
    </nav>
  )
}
