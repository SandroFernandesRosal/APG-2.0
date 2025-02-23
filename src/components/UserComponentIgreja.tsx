import { getUserIgreja } from '@/lib/getUserIgreja'
import LogoutIgreja from './LogoutIgreja'
import Image from 'next/image'
import ChangeTheme from './ChangeTheme'
import Link from 'next/link'

interface UserIgreja {
  name: string
  avatarUrl?: string
}

export default async function UserComponentIgreja() {
  const userIgreja: UserIgreja | string = await getUserIgreja()

  if (!userIgreja || typeof userIgreja === 'string') {
    return null
  }

  const { name, avatarUrl } = userIgreja

  return (
    <>
      {userIgreja && (
        <div className="flex flex-col items-start gap-1 md:flex-row md:items-center">
          <div className="flex items-center gap-1">
            <Image
              src={avatarUrl || '/default-avatar.png'}
              alt="imagem de perfil"
              width={40}
              height={40}
              className="p-[2px] mr-1 h-[40px] w-[40px] rounded-full border-[1px] border-primary  dark:border-secundary"
            />
            <p className="text-lg font-bold text-black dark:text-white">
              {name}
            </p>
          </div>
          <div className="flex items-center">
            <Link
              href={'/perfil'}
              className="rounded-md mx-2 border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
            >
              Perfil
            </Link>
            <LogoutIgreja />
            <div className="m-2 flex md:hidden">
              <ChangeTheme />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
