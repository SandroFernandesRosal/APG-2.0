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
      <div className="flex w-full flex-col gap-2 rounded-2xl bg-bglightsecundary shadow-light dark:bg-bgdarksecundary md:w-[70%] lg:min-w-[700px] border-[1px] border-zinc-300 dark:border-zinc-800">
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
                className="button !mb-0"
                onClick={() => setOpenEdit(item.id)}
              >
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
              className="button !mb-0"
              onClick={() => {
                setShowModal(item.id)
              }}
            >
              Remover
            </button>
          </div>
        )}
      </div>
      {showModal && <RemoveTestemunho id={item.id} />}
    </div>
  )
}
