'use client'

import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

interface EditEnderecoProps {
  setOpenEdit: (open: string | null) => void
  id: string
  localInitial: string
  ruaInitial: string
  cepInitial: string
  numeroInitial: string
  cidadeInitial: string
}

export default function EditEndereco({
  setOpenEdit,
  id,
  localInitial,
  ruaInitial,
  cepInitial,
  numeroInitial,
  cidadeInitial,
}: EditEnderecoProps) {
  const [local, setLocal] = useState(localInitial)
  const [rua, setRua] = useState(ruaInitial)
  const [cep, setCep] = useState(cepInitial)
  const [numero, setNumero] = useState(numeroInitial)
  const [cidade, setCidade] = useState(cidadeInitial)
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

    try {
      const response = await fetch(`/api/endereco/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          local: local || localInitial,
          rua: rua || ruaInitial,
          cep: cep || cepInitial,
          numero: numero || numeroInitial,
          cidade: cidade || cidadeInitial,
        }),
      })

      const endereco = await response.json()

      if (response.ok) {
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
        return endereco
      }

      console.error('Erro na resposta:', endereco)
    } catch (error) {
      console.error('Erro ao editar endereço:', error)
    }

    return null
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-bgdark/50 dark:bg-bglight/30 p-4">
      <div className="w-full max-w-2xl bg-bglight dark:bg-bgdark rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary dark:text-secundary">
            Editar Endereço
          </h1>
          <AiFillCloseCircle
            onClick={() => setOpenEdit(null)}
            className="cursor-pointer text-2xl text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Conteúdo scrollável */}
          <div className="overflow-y-auto max-h-[60vh] p-4">
            <div className="space-y-4">
              {/* Local */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Local
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="local"
                  required
                  placeholder="Digite o local"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </div>

              {/* Rua */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Rua
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="rua"
                  required
                  placeholder="Digite nome da rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />
              </div>

              {/* Número */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Número
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="numero"
                  required
                  placeholder="Digite o número da igreja"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>

              {/* Cidade */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Cidade
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="cidade"
                  required
                  placeholder="Digite a cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </div>

              {/* CEP */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  CEP
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="cep"
                  required
                  placeholder="Digite o cep"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setOpenEdit(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="button flex items-center gap-2"
              disabled={isEditing}
            >
              {isEditing ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Editando endereço...
                </>
              ) : (
                'Editar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
