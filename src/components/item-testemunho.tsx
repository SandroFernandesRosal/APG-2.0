import Image from 'next/image'
import { format } from 'date-fns'
import EditTestemunho from './crud/EditTestemunho'
import RemoveTestemunho from './crud/RemoveTestemunho'
import { UserIgreja } from '@/data/types/userigreja'
import { Testemunho } from '@/data/types/testemunho'
import { useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { useIgrejaName } from '@/hooks/useIgrejaName'
import { useShowModal } from '@/store/useStore'
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaChurch,
  FaEdit,
  FaTrash,
} from 'react-icons/fa'

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
  const igrejaName = useIgrejaName(item.igrejaId || null)

  const podeGerenciar =
    token &&
    (token.role === 'SUPERADMIN' ||
      token.sub === item.userId ||
      (token.role === 'ADMIN' &&
        (token.igrejaId === item.igrejaId || item.igrejaId === null)))

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy HH:mm')
  }

  // Removido: função hardcoded - agora usa useIgrejaName

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
        {/* Header do Card */}
        <div className="bg-white dark:bg-slate-800 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {item.avatarUrl ? (
                <Image
                  width={64}
                  height={64}
                  src={item.avatarUrl}
                  alt={item.name}
                  className="rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-600">
                  <FaUser className="text-2xl text-gray-400 dark:text-gray-500" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                <FaChurch className="text-xs text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <FaChurch className="text-sm" />
                <span className="text-sm font-medium">
                  {igrejaName || 'Membro sem igreja'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Informações de Data */}
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <FaCalendarAlt className="text-primary dark:text-secundary" />
              <span>Postado: {formatDate(item.createdAt)}</span>
            </div>
            {item.updatedAt && item.createdAt !== item.updatedAt && (
              <div className="flex items-center space-x-1">
                <FaClock className="text-primary dark:text-secundary" />
                <span>Atualizado: {formatDate(item.updatedAt)}</span>
              </div>
            )}
          </div>

          {/* Texto do Testemunho */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
              {item.content}
            </p>
          </div>

          {/* Imagem do Testemunho */}
          {item.coverUrl && (
            <div className="mb-6">
              <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden">
                <Image
                  src={item.coverUrl}
                  alt="Foto do testemunho"
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-96 object-contain shadow-lg"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          {podeGerenciar && (
            <div className="flex justify-end gap-3">
              {openEdit === null && (
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setOpenEdit(item.id)}
                >
                  <FaEdit className="text-sm" />
                  <span>Editar</span>
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
                    igrejaId={item.igrejaId}
                  />
                </div>
              )}

              <button
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => {
                  setShowModal(item.id)
                }}
              >
                <FaTrash className="text-sm" />
                <span>Remover</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {showModal && <RemoveTestemunho id={item.id} />}
    </div>
  )
}
