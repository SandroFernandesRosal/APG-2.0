import { getUser } from '@/lib/getUser'
import Logout from './Logout'
import Image from 'next/image'
import ChangeTheme from './ChangeTheme'
import Link from 'next/link'

interface User {
  name: string
  avatarUrl?: string
}

export default async function UserComponent() {
  const user: User | string = await getUser()

  if (!user || typeof user === 'string') {
    return null
  }

  const { name, avatarUrl } = user

  return (
    <>
      {user && (
        <div className="flex flex-col items-start gap-1 md:flex-row md:items-center">
          <div className="flex items-center gap-1">
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="imagem de perfil"
                width={40}
                height={40}
                className="p-[2px] mr-1 h-[40px] w-[40px] rounded-full border-[1px] border-primary  dark:border-secundary"
              />
            )}

            <p className="text-lg font-bold text-black dark:text-white">
              {name}
            </p>
          </div>
          <div className="flex items-center">
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
        </div>
      )}
    </>
  )
}
