'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

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
  const [local, setLocal] = useState<string>(localInitial)
  const [rua, setRua] = useState<string>(ruaInitial)
  const [cep, setCep] = useState<string>(cepInitial)
  const [numero, setNumero] = useState<string>(numeroInitial)
  const [cidade, setCidade] = useState<string>(cidadeInitial)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.put(
        `/endereco/${id}`,
        {
          local: local || localInitial,
          rua: rua || ruaInitial,
          cep: cep || cepInitial,
          numero: numero || numeroInitial,
          cidade: cidade || cidadeInitial,
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
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
        return endereco
      }

      console.log(endereco)
    } catch (error) {
      console.error('Erro ao editar evento:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-30 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg md:mt-5"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar endereço{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(null)}
          className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
        />
      </h1>
      <input
        className="input"
        type="text"
        name="local"
        required={true}
        placeholder="Digite o local"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="rua"
        required={true}
        placeholder="Digite nome da rua"
        value={rua}
        onChange={(e) => setRua(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="numero"
        required={true}
        placeholder="Digite o número da igreja"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="cidade"
        required={true}
        placeholder="Digite a cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />

      <input
        className="input "
        type="text"
        name="cep"
        required={true}
        placeholder="Digite o cep"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />

      <button type="submit" className="button">
        Enviar
      </button>
    </form>
  )
}
