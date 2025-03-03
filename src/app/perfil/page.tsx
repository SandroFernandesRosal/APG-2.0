import { getUserIgreja } from '@/lib/getUserIgreja'
import Image from 'next/image'
import RemoveUserIgreja from '@/components/crud/RemoveUserIgreja'
import Link from 'next/link'
import { UserIgreja } from '@/data/types/userigreja'

export default async function Perfil() {
  const user: UserIgreja | null = await getUserIgreja()

  return (
    <div className="mb-2 mt-4 flex min-h-screen flex-col items-center gap-5 pt-24 md:mt-0 md:pt-[165px]">
      <div className="mb-4 flex min-h-screen w-[100vw] flex-col items-center rounded-[35px] bg-bglightsecundary px-1 pb-4 shadow-light dark:bg-bgdarksecundary dark:shadow-dark md:w-[90vw] md:rounded-xl">
        {user ? (
          <>
            <div className="flex flex-col items-center md:min-w-[35%]">
              <h1 className="m-0 text-lg font-bold text-primary dark:text-secundary">
                Meu perfil
              </h1>
              <p className="mb-4 text-xl">Verifique seus dados</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              {user.avatarUrl && (
                <Image
                  src={user.avatarUrl}
                  width={150}
                  height={150}
                  alt=""
                  className="flex  h-[150px] w-[150px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
                />
              )}

              <h1 className="text-lg font-bold">{user.name}</h1>
              <p>{user.login}</p>

              <div className="flex w-full justify-between gap-2">
                <Link
                  href={'/perfil/editar'}
                  className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
                >
                  Editar perfil
                </Link>
                <RemoveUserIgreja id={user.id} />
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-lg font-bold text-primary">
              Você não está logado
            </h1>
            <div className="flex w-full flex-wrap items-end justify-center gap-1 font-bold">
              Faça
              <Link
                href={'/login/igreja'}
                className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
              >
                login
              </Link>{' '}
              ou{' '}
              <Link
                href={'/register'}
                className="rounded-md border-[1px] border-primary/50 hover:border-secundary hover:bg-primary dark:hover:bg-primary hover:text-white   px-2 text-primary dark:text-secundary  dark:hover:text-white dark:border-secundary/50 md:px-3  md:text-lg md:font-bold"
              >
                Registre-se
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
