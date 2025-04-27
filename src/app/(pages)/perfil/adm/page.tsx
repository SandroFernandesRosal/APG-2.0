import { getUser } from '@/lib/getUser'
import Image from 'next/image'
import RemoveUserAdm from '@/components/crud/RemoveAdm'
import Link from 'next/link'
import { User } from '@/data/types/user'

export default async function PerfilAdm() {
  const user: User | null = await getUser()

  return (
    <div className="mb-2 mt-4 flex min-h-screen flex-col items-center gap-5 pt-24 md:mt-0 md:pt-[165px]">
      <div className="mb-4 flex min-h-screen w-full flex-col items-center">
        {user ? (
          <>
            <div className="flex flex-col items-center md:min-w-[35%]">
              <h1 className="m-0 text-lg font-bold text-primary dark:text-secundary mb-5">
                Perfil de {user.name.split(' ')[0]}
              </h1>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-md border-[1px] w-[70%] max-w-[400px] h-[400px] justify-evenly p-4 border-zinc-300 dark:border-zinc-700">
              {user.avatarUrl && (
                <Image
                  src={user.avatarUrl}
                  width={150}
                  height={150}
                  alt=""
                  className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
                />
              )}

              <h1 className="text-lg font-bold truncate w-[100%] text-center">
                {user.name}
              </h1>
              <p className="truncate w-[100%] text-center">{user.login}</p>

              <div className="flex w-full  gap-3 flex-wrap justify-center">
                <Link href={'/perfil/adm/editar'} className="button !mb-0">
                  Editar perfil
                </Link>
                <RemoveUserAdm id={user.id} />
                <Link href={'/register/admin'} className="button !mb-0">
                  Criar novo administrador
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-lg font-bold text-secundary">
              Você não está logado como administrador
            </h1>

            <Link href={'/login/adm'} className="button">
              login
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
