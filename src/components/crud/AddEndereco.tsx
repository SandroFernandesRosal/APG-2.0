'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

interface AddEnderecoProps {
  openEndereco: boolean
  setOpenEndereco: (open: boolean) => void
}

export default function AddEndereco({
  openEndereco,
  setOpenEndereco,
}: AddEnderecoProps) {
  const [local, setLocal] = useState('')
  const [rua, setRua] = useState('')
  const [cep, setCep] = useState('')
  const [numero, setNumero] = useState('')
  const [cidade, setCidade] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/endereco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          local,
          rua,
          cep,
          numero,
          cidade,
        }),
      })

      const endereco = await response.json()

      if (response.ok) {
        setOpenEndereco(false)
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro:', endereco)
      }
    } catch (error) {
      console.error('Erro ao criar endereço:', error)
    } finally {
      setIsSubmitting(false)
    }
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
            Adicionar Endereço
          </h1>
          <button
            type="button"
            onClick={() => setOpenEndereco(false)}
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
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="rua"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nome da Rua
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="rua"
                id="rua"
                placeholder="Digite o nome da rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="numero"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Número
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="numero"
                id="numero"
                placeholder="Digite o número da igreja"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="cidade"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Cidade
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="cidade"
                id="cidade"
                placeholder="Digite o nome da cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="cep"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                CEP
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="cep"
                id="cep"
                placeholder="Digite o CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end w-full p-4 border-t border-gray-200 dark:border-gray-700 space-x-3 bg-white dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setOpenEndereco(false)}
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
              <span>Adicionar Endereço</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
