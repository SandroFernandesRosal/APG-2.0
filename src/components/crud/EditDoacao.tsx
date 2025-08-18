'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface EditDoacaoProps {
  setOpenEdit: (open: string | null) => void
  id: string
  localInitial: string
  bancoInitial: string
  contaInitial: string
  agenciaInitial: string
  nomebancoInitial: string
  pixInitial: string
  nomepixInitial: string
}

export default function EditDoacao({
  setOpenEdit,
  id,
  localInitial,
  bancoInitial,
  contaInitial,
  agenciaInitial,
  nomebancoInitial,
  pixInitial,
  nomepixInitial,
}: EditDoacaoProps) {
  const [local, setLocal] = useState(localInitial)
  const [banco, setBanco] = useState(bancoInitial)
  const [conta, setConta] = useState(contaInitial)
  const [agencia, setAgencia] = useState(agenciaInitial)
  const [nomebanco, setNomeBanco] = useState(nomebancoInitial)
  const [pix, setPix] = useState(pixInitial)
  const [nomepix, setNomePix] = useState(nomepixInitial)
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

    try {
      const response = await fetch(`/api/doacao/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          local: local || localInitial,
          banco: banco || bancoInitial,
          conta: conta || contaInitial,
          agencia: agencia || agenciaInitial,
          nomebanco: nomebanco || nomebancoInitial,
          pix: pix || pixInitial,
          nomepix: nomepix || nomepixInitial,
        }),
      })

      const doacao = await response.json()

      if (response.ok && doacao) {
        toast.success('Doação editada com sucesso!')
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
        return doacao
      } else {
        toast.error('Erro ao editar doação. Tente novamente.')
      }

      console.log(doacao)
    } catch (error) {
      console.error('Erro ao editar doação:', error)
      toast.error('Erro ao editar doação. Tente novamente.')
    }

    return null
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-bgdark/50 dark:bg-bglight/30 p-4">
      <div className="w-full max-w-2xl bg-bglight dark:bg-bgdark rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary dark:text-secundary">
            Editar Doação
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

              {/* Banco */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Banco
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="banco"
                  required
                  placeholder="Digite o nome do banco"
                  value={banco}
                  onChange={(e) => setBanco(e.target.value)}
                />
              </div>

              {/* Conta */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Conta
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="conta"
                  required
                  placeholder="Digite número da conta"
                  value={conta}
                  onChange={(e) => setConta(e.target.value)}
                />
              </div>

              {/* Agência */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Agência
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="agencia"
                  required
                  placeholder="Digite número da agência"
                  value={agencia}
                  onChange={(e) => setAgencia(e.target.value)}
                />
              </div>

              {/* Nome do Banco */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Nome do Titular da Conta
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="nomebanco"
                  required
                  placeholder="Digite nome titular da conta"
                  value={nomebanco}
                  onChange={(e) => setNomeBanco(e.target.value)}
                />
              </div>

              {/* PIX */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  PIX
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="pix"
                  required
                  placeholder="Digite o pix"
                  value={pix}
                  onChange={(e) => setPix(e.target.value)}
                />
              </div>

              {/* Nome do PIX */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Nome do Titular do PIX
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-textlight dark:text-textdark focus:ring-2 focus:ring-primary focus:border-transparent"
                  type="text"
                  name="nomepix"
                  required
                  placeholder="Digite nome do titular do pix"
                  value={nomepix}
                  onChange={(e) => setNomePix(e.target.value)}
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
                  Editando doação...
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
