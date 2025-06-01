'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

interface AddDoacaoProps {
  openDoacao: boolean
  setOpenDoacao: (open: boolean) => void
}

export default function AddDoacao({
  openDoacao,
  setOpenDoacao,
}: AddDoacaoProps) {
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
        setOpenDoacao(false)
        router.push('/')
        window.location.href = '/'
        return doacao
      }

      console.log(doacao)
    } catch (error) {
      console.error('Erro ao criar doação:', error)
    } finally {
      setIsSubmitting(false)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center  rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%]  max-w-md">
        <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
          Adicionar doação{' '}
          {openDoacao && (
            <AiFillCloseCircle
              onClick={() => setOpenDoacao(false)}
              className="cursor-pointer text-2xl font-bold text-black dark:text-white"
            />
          )}
        </h1>

        <input
          className="input mt-4"
          type="text"
          name="local"
          required
          placeholder="Digite um local"
          onChange={(e) => setLocal(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="banco"
          required
          placeholder="Digite o nome do banco"
          onChange={(e) => setBanco(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="conta"
          required
          placeholder="Digite número da conta"
          onChange={(e) => setConta(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="agencia"
          required
          placeholder="Digite a agência"
          onChange={(e) => setAgencia(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="nomeBanco"
          required
          placeholder="Nome do beneficiário"
          onChange={(e) => setNomeBanco(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="pix"
          required
          placeholder="Digite a chave pix"
          onChange={(e) => setPix(e.target.value)}
        />

        <input
          className="input"
          type="text"
          name="nomePix"
          required
          placeholder="Nome do beneficiário"
          onChange={(e) => setNomePix(e.target.value)}
        />

        <button
          type="submit"
          className="button !mb-0 flex items-center gap-2 justify-center disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Adicionando igreja...
            </>
          ) : (
            'Enviar'
          )}
        </button>
      </div>
    </form>
  )
}
