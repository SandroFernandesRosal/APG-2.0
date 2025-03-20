'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

interface AddEnderecoProps {
  openEndereco: boolean
  setOpenEndereco: (open: boolean) => void
}

export default function AddEndereco({
  openEndereco,
  setOpenEndereco,
}: AddEnderecoProps) {
  const [local, setLocal] = useState<string>('')
  const [rua, setRua] = useState<string>('')
  const [cep, setCep] = useState<string>('')
  const [numero, setNumero] = useState<string>('')
  const [cidade, setCidade] = useState<string>('')

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post(
        '/endereco',
        {
          local,
          rua,
          cep,
          numero,
          cidade,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const endereco = response.data

      if (response.status === 200 && endereco) {
        setOpenEndereco(false)
        router.push('/')
        window.location.href = '/'
        return endereco
      }

      console.log(endereco)
    } catch (error) {
      console.error('Erro ao criar endereço:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar endereço{' '}
        {openEndereco === true && (
          <AiFillCloseCircle
            onClick={() => setOpenEndereco(false)}
            className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        )}
      </h1>
      <input
        className="input mt-4"
        type="text"
        name="local"
        placeholder="Digite um local"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="rua"
        placeholder="Digite o nome da rua"
        value={rua}
        onChange={(e) => setRua(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="numero"
        placeholder="Digite o número da igreja"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="cidade"
        placeholder="Digite o nome da cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="cep"
        placeholder="Digite o cep"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />

      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
