'use client'

import { useState } from 'react'
import { FaTimes, FaTrash, FaExclamationTriangle } from 'react-icons/fa'

interface Igreja {
  id: string
  nome: string
  slug: string
  ativa: boolean
  endereco?: string
  descricao?: string
  tipo?: string
  banco?: string
  conta?: string
  agencia?: string
  nomebanco?: string
  pix?: string
  nomepix?: string
}

interface RemoveIgrejaProps {
  igreja: Igreja
  setOpenRemove: (open: string | null) => void
  onSuccess: () => void
}

export default function RemoveIgreja({
  igreja,
  setOpenRemove,
  onSuccess,
}: RemoveIgrejaProps) {
  const [loading, setLoading] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const handleDelete = async () => {
    if (confirmText !== igreja.nome) {
      alert('Por favor, digite o nome da igreja para confirmar a exclusão.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/igrejas?id=${igreja.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (response.ok) {
        onSuccess()
        setOpenRemove(null)
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao deletar igreja')
      }
    } catch (error) {
      console.error('Erro ao deletar igreja:', error)
      alert('Erro ao deletar igreja')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Confirmar Exclusão
          </h2>
          <button
            onClick={() => setOpenRemove(null)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="text-red-500 text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Atenção!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Esta ação não pode ser desfeita.
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Você está prestes a deletar a igreja:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <p className="font-medium text-gray-800 dark:text-white">
                {igreja.nome}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {igreja.slug}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>Nota:</strong> Se a igreja tiver dados relacionados
              (usuários, notícias, eventos, etc.), a exclusão será negada e você
              deverá desativá-la em vez de deletá-la.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Para confirmar, digite o nome da igreja:{' '}
              <strong>{igreja.nome}</strong>
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              placeholder={`Digite "${igreja.nome}" para confirmar`}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpenRemove(null)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={loading || confirmText !== igreja.nome}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <FaTrash />
              )}
              {loading ? 'Deletando...' : 'Deletar Igreja'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
