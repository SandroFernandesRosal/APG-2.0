import logo from '../../public/img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { RxOpenInNewWindow } from 'react-icons/rx'
import Contatos from './Contatos'

export default function Footer() {
  return (
    <footer className="flex min-h-[100px] flex-col items-center justify-evenly border-t-2 border-solid border-y-primary dark:border-y-secundary bg-bglight pb-5 font-bold dark:bg-bgdark">
      <Link href="/" className="my-5">
        <Image
          src={logo}
          alt="logo do site"
          width={90}
          height={90}
          className="w-[90px]"
          quality={100}
        />
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
