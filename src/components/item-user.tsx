'use client'
import Image from 'next/image'
import Link from 'next/link'
import ChangeTheme from './ChangeTheme'
import Logout from './Logout'
import { useState } from 'react'
import { X } from 'lucide-react'

interface userProps {
  avatarUrl?: string
  name: string
}

export default function ItemUser({ avatarUrl, name }: userProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="hidden md:flex">
      <div className="flex items-center gap-1">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt="imagem de perfil"
            width={40}
            height={40}
            className="p-[2px] mr-1  rounded-full border-[1px] border-primary  dark:border-secundary cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

      {open && (
        <div className="flex items-center absolute top-16 right-5 bg-bglightsecundary dark:bg-bgdarksecundary p-2 z-30 rounded-md gap-2 border-[1px] border-zinc-300 dark:border-zinc-700 cursor-pointer">
          <X
            className="text-primary dark:text-secundary cursor-pointer hover:text-secundary/50 dark:hover:text-primary/50"
            onClick={() => setOpen(!open)}
          />
          <p className="text-lg font-bold text-black dark:text-white">{name}</p>
          <Link
            href={'/perfil/adm'}
            className="rounded-md mx-2 border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
          >
            Perfil
          </Link>
          <Logout />
          <div className="m-2 flex md:hidden">
            <ChangeTheme />
          </div>
        </div>
      )}
    </div>
  )
}
