import Image from 'next/image'
import { format } from 'date-fns'
import EditTestemunho from './crud/EditTestemunho'
import RemoveTestemunho from './crud/RemoveTestemunho'
import { UserIgreja } from '@/data/types/userigreja'
import { Testemunho } from '@/data/types/testemunho'
import { useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { useShowModal } from '@/store/useStore'

interface ItemTestemunhoProps {
  item: Testemunho
  userIgreja: UserIgreja
}

export default function ItemTestemunho({
  item,
  userIgreja,
}: ItemTestemunhoProps) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const { showModal, setShowModal } = useShowModal()
  const token = useToken()

  const podeGerenciar =
    token &&
    (token.role === 'SUPERADMIN' ||
      token.sub === item.userId ||
      (token.role === 'ADMIN' &&
        (token.ministryRole === item.ministryRole ||
          item.ministryRole === null)))

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy HH:mm')
  }

  return (
    <div className="flex w-full flex-col items-start gap-3 px-6 py-4 md:flex-row md:justify-center">
      <div className="flex w-full flex-col gap-2 rounded-2xl bg-white shadow-light dark:bg-slate-800 md:w-[70%] lg:min-w-[700px] border-[1px] border-zinc-300 dark:border-zinc-800">
        <div className="flex flex-col  gap-5 p-3 ">
          <div className="flex items-center  md:justify-between">
            <div className="flex items-center gap-4 ">
              {item.avatarUrl && (
                <Image
                  width={100}
                  height={100}
                  src={item.avatarUrl}
                  alt={item.name}
                  className="p-[2px] mr-1 w-[100px] h-[100px]  rounded-full border-[1px] border-primary dark:border-secundary"
                />
              )}
              <div>
                <p className="text-lg font-bold">
                  {item.name}{' '}
                  <span className="text-sm font-normal text-zinc-600">
                    {item.ministryRole
                      ? ` - APG ${
                          item.ministryRole === 'VILADAPENHA'
                            ? 'Vila da Penha'
                            : item.ministryRole === 'TOMAZINHO'
                              ? 'Tomazinho'
                              : 'Vila Maria Helena'
                        }`
                      : ' - Membro sem igreja'}
                  </span>
                </p>
                <div className="flex md:hidden">
                  {item.updatedAt ? (
                    <span className="text-xs">
                      Atualizado: {formatDate(item.updatedAt)}
                    </span>
                  ) : (
                    <span className="text-xs">
                      {formatDate(item.createdAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>{' '}
            <div className="md:flex justify-center hidden self-start">
              {item.updatedAt ? (
                <span className="text-xs">
                  Atualizado: {formatDate(item.updatedAt)}
                </span>
              ) : (
                <span className="text-xs">{formatDate(item.createdAt)}</span>
              )}
            </div>
          </div>
        </div>

        <p className="pl-3">{item.content}</p>
        {item.coverUrl && (
          <div className="mb-4 flex w-full items-center justify-center">
            <Image
              width={500}
              height={500}
              priority
              src={item.coverUrl}
              alt={item.name}
              className="m-2 w-[80%] rounded-xl shadow-light dark:shadow-dark md:max-w-[500px]"
            />
          </div>
        )}

        {podeGerenciar && (
          <div className="mb-2 flex justify-center gap-4">
            {openEdit === null && (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() => setOpenEdit(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Editar
              </button>
            )}

            {openEdit === item.id && (
              <div>
                <EditTestemunho
                  avatarUrl={item.avatarUrl}
                  name={item.name}
                  id={item.id}
                  img={item.coverUrl}
                  conteudo={item.content}
                  userIgreja={userIgreja}
                  setOpenEdit={setOpenEdit}
                  ministryRole={item.ministryRole}
                />
              </div>
            )}
            <button
              aria-hidden="true"
              tabIndex={-1}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => {
                setShowModal(item.id)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Remover
            </button>
          </div>
        )}
      </div>
      {showModal && <RemoveTestemunho id={item.id} />}
    </div>
  )
}
