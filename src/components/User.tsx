import { getUser } from '@/lib/getUser'
import Image from 'next/image'
import ItemUser from './item-user'
import Link from 'next/link'
import Logout from './Logout'
import ChangeTheme from './ChangeTheme'

interface User {
  name: string
  avatarUrl?: string
  role: 'ADMIN' | 'MEMBRO' | 'SUPERADMIN'
}

export default async function UserComponent() {
  const user: User | string = await getUser()

  if (!user || typeof user === 'string') {
    return null
  }

  const { name, avatarUrl, role } = user

  return (
    <>
      {user && (
        <div className="flex flex-col items-center gap-1 md:flex-row md:items-center">
          <ItemUser name={name} avatarUrl={avatarUrl} role={role} />

          <div className="flex flex-col items-center gap-1 md:hidden">
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
            <span className="text-sm">({role})</span>
          </div>
          <div className="flex items-center md:hidden gap-2 flex-wrap justify-center mx-1 mt-2">
            <Link href={'/perfil'} className="button  !mb-0">
              Perfil
            </Link>

            {(role === 'SUPERADMIN' || role === 'ADMIN') && (
              <Link href={'/usuarios'} className="button !mb-0">
                Usuários
              </Link>
            )}
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
