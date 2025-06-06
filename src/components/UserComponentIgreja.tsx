import { getUserIgreja } from '@/lib/getUserIgreja'
import LogoutIgreja from './LogoutIgreja'
import Image from 'next/image'
import ChangeTheme from './ChangeTheme'
import Link from 'next/link'
import ItemUserIgreja from './item-user-igreja'

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
          <ItemUserIgreja name={name} avatarUrl={avatarUrl} />

          <div className="flex items-center gap-1 md:hidden">
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt={`imagem de perfil de ${name}`}
                width={80}
                height={80}
                className="p-[2px] mr-1 h-[80px] w-[80px] rounded-full border-[1px] border-primary  dark:border-secundary"
              />
            )}

            <p className="text-lg font-bold text-black dark:text-white">
              {name}
            </p>
          </div>
          <div className="flex items-center md:hidden">
            <Link href={'/perfil'} className="button mr-2 !mb-0">
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
