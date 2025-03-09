'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

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

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post(
        '/doacao',
        {
          local,
          banco,
          conta,
          agencia,
          nomebanco,
          pix,
          nomepix,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const doacao = response.data

      if (response.status === 200 && doacao) {
        setOpenDoacao(false)
        router.push('/')
        window.location.href = '/'
        return doacao
      }

      console.log(doacao)
    } catch (error) {
      console.error('Erro ao criar doação:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-20 mt-10 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-black/50 p-5 backdrop-blur-lg md:mt-20"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar igreja{' '}
        {openDoacao === true && (
          <AiFillCloseCircle
            onClick={() => setOpenDoacao(false)}
            className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        )}
      </h1>
      <input
        className="input"
        type="text"
        name="local"
        placeholder="Digite um local"
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="banco"
        placeholder="Digite o nome do banco"
        onChange={(e) => setBanco(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="conta"
        placeholder="Digite número da conta"
        onChange={(e) => setConta(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="agencia"
        placeholder="Digite a agência"
        onChange={(e) => setAgencia(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="nomeBanco"
        placeholder="Nome do beneficiário"
        onChange={(e) => setNomeBanco(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="pix"
        placeholder="Digite a chave pix"
        onChange={(e) => setPix(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="nomePix"
        placeholder="Nome do beneficiário"
        onChange={(e) => setNomePix(e.target.value)}
      />

      <button type="submit" className="button">
        Enviar
      </button>
    </form>
  )
}
