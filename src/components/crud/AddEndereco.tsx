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
      className="fixed left-0 top-0 z-50 flex min-h-screen w-full flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center  rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%]  max-w-md">
        <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
          Adicionar endereço{' '}
          {openEndereco && (
            <AiFillCloseCircle
              onClick={() => setOpenEndereco(false)}
              className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
            />
          )}
        </h1>

        <input
          className="input mt-4"
          type="text"
          placeholder="Digite um local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite o nome da rua"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite o número da igreja"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite o nome da cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite o cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <button
          type="submit"
          className="button !mb-0 flex items-center gap-2 justify-center disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Adicionando endereço...
            </>
          ) : (
            'Enviar'
          )}
        </button>
      </div>
    </form>
  )
}
