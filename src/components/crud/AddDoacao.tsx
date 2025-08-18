'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface AddDoacaoProps {
  setOpenDoacao: (open: boolean) => void
}

export default function AddDoacao({ setOpenDoacao }: AddDoacaoProps) {
  const [local, setLocal] = useState<string>('')
  const [banco, setBanco] = useState<string>('')
  const [conta, setConta] = useState<string>('')
  const [agencia, setAgencia] = useState<string>('')
  const [nomebanco, setNomeBanco] = useState<string>('')
  const [pix, setPix] = useState<string>('')
  const [nomepix, setNomePix] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/doacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          local,
          banco,
          conta,
          agencia,
          nomebanco,
          pix,
          nomepix,
        }),
      })

      const doacao = await response.json()

      if (response.status === 200 && doacao) {
        toast.success('Doação criada com sucesso!')
        setOpenDoacao(false)
        router.push('/')
        window.location.href = '/'
        return doacao
      } else {
        toast.error('Erro ao criar doação. Tente novamente.')
      }

      console.log(doacao)
    } catch (error) {
      console.error('Erro ao criar doação:', error)
      toast.error('Erro ao criar doação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-2xl w-full max-w-2xl my-4">
        {/* Header */}
        <div className="flex items-center justify-between w-full p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Adicionar Doação
          </h1>
          <button
            type="button"
            onClick={() => setOpenDoacao(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <AiFillCloseCircle className="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </button>
        </div>

        {/* Content */}
        <div className="w-full p-4 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="local"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Local
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="local"
                id="local"
                placeholder="Digite um local"
                onChange={(e) => setLocal(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="banco"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nome do Banco
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="banco"
                id="banco"
                placeholder="Digite o nome do banco"
                onChange={(e) => setBanco(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="conta"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Número da Conta
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="conta"
                id="conta"
                placeholder="Digite número da conta"
                onChange={(e) => setConta(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="agencia"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Agência
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="agencia"
                id="agencia"
                placeholder="Digite a agência"
                onChange={(e) => setAgencia(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="nomeBanco"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nome do Beneficiário (Banco)
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="nomeBanco"
                id="nomeBanco"
                placeholder="Nome do beneficiário"
                onChange={(e) => setNomeBanco(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="pix"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Chave PIX
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="pix"
                id="pix"
                placeholder="Digite a chave pix"
                onChange={(e) => setPix(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="nomePix"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nome do Beneficiário (PIX)
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="nomePix"
                id="nomePix"
                placeholder="Nome do beneficiário"
                onChange={(e) => setNomePix(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end w-full p-4 border-t border-gray-200 dark:border-gray-700 space-x-3 bg-white dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setOpenDoacao(false)}
            className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-primary dark:bg-secundary rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Adicionando...</span>
              </>
            ) : (
              <span>Adicionar Doação</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
