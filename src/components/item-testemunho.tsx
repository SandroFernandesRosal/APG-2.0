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
    <div className="flex w-full flex-col items-start gap-4 px-4 py-6 md:flex-row md:justify-center">
      <div className="flex w-full flex-col gap-6 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl dark:bg-slate-800/80 md:w-[75%] lg:min-w-[750px] border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
        {/* Header do Testemunho */}
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {item.avatarUrl && (
                <Image
                  width={100}
                  height={100}
                  src={item.avatarUrl}
                  alt={item.name}
                  className="p-[2px] mr-1 w-[100px] h-[100px] rounded-full border-[1px] border-primary dark:border-secundary"
                />
              )}
              <div className="flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <span className="text-sm font-medium text-primary dark:text-secundary">
                  {item.ministryRole
                    ? `APG ${
                        item.ministryRole === 'VILADAPENHA'
                          ? 'Vila da Penha'
                          : item.ministryRole === 'TOMAZINHO'
                            ? 'Tomazinho'
                            : 'Vila Maria Helena'
                      }`
                    : 'Membro sem igreja'}
                </span>
                <div className="flex md:hidden mt-1">
                  {item.updatedAt ? (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Atualizado: {formatDate(item.updatedAt)}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(item.createdAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center">
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {item.updatedAt ? (
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    Atualizado: {formatDate(item.updatedAt)}
                  </span>
                ) : (
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    {formatDate(item.createdAt)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo do Testemunho */}
        <div className="px-6 pb-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base md:text-lg">
              {item.content}
            </p>
          </div>
        </div>

        {/* Imagem do Testemunho */}
        {item.coverUrl && (
          <div className="px-6 pb-4">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                width={600}
                height={400}
                priority
                src={item.coverUrl}
                alt={item.name}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        {podeGerenciar && (
          <div className="flex justify-end gap-3 px-6 pb-6">
            {openEdit === null && (
              <button
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
              <div className="w-full">
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
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
