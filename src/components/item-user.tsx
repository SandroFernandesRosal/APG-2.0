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
  role?: 'ADMIN' | 'MEMBRO' | 'SUPERADMIN'
}

export default function ItemUser({ avatarUrl, name, role }: userProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="hidden md:flex">
      <div className="flex items-center gap-1">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={`imagem de perfil de ${name}`}
            width={40}
            height={40}
            className="p-[2px] mr-1 w-[40px] h-[40px]  rounded-full border-[1px] border-primary  dark:border-secundary cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

      {open && (
        <div className="flex flex-col items-center p-5 absolute top-20 right-[15%] lg:right-[20%] bg-bglightsecundary dark:bg-bgdarksecundary z-30 rounded-md gap-2 border-[1px] border-zinc-300 dark:border-zinc-700 cursor-pointer">
          <X
            className="text-primary dark:text-secundary cursor-pointer hover:text-secundary/50 dark:hover:text-primary/50"
            onClick={() => setOpen(!open)}
          />
          <p className="text-lg font-bold text-black dark:text-white">{name}</p>{' '}
          <span className="text-sm text-textlight dark:text-textdark">
            ({role})
          </span>
          <Link
            href={'/perfil'}
            className="rounded-md mx-2 border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold w-[100px] text-center"
          >
            Perfil
          </Link>
          {(role === 'SUPERADMIN' || role === 'ADMIN') && (
            <Link
              href={'/usuarios'}
              className="button !mb-0 w-[100px] text-center"
            >
              Usuários
            </Link>
          )}
          <Logout />
          <div className="m-2 flex md:hidden">
            <ChangeTheme />
          </div>
        </div>
      )}
    </div>
  )
}
