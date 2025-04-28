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
    <form
      onSubmit={handleSubmit}
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark"
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar endereço{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(null)}
          className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
        />
      </h1>

      <input
        className="input mt-2"
        type="text"
        name="local"
        required
        placeholder="Digite o local"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="rua"
        required
        placeholder="Digite nome da rua"
        value={rua}
        onChange={(e) => setRua(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="numero"
        required
        placeholder="Digite o número da igreja"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="cidade"
        required
        placeholder="Digite a cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="cep"
        required
        placeholder="Digite o cep"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />

      <button
        type="submit"
        className="button !mb-0 flex items-center gap-2 justify-center"
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
    </form>
  )
}
