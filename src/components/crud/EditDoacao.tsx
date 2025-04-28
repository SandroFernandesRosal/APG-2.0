'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

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

      if (response.ok) {
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
      } else {
        console.error('Erro ao editar doação:', await response.text())
      }
    } catch (error) {
      console.error('Erro ao editar doação:', error)
    }
  }

  return (
    <form
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bglight dark:bg-bgdark"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Editar doação{' '}
        <AiFillCloseCircle
          onClick={() => setOpenEdit(null)}
          className="cursor-pointer text-2xl font-bold text-black dark:text-white"
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
        name="banco"
        required
        placeholder="Digite o nome do banco"
        value={banco}
        onChange={(e) => setBanco(e.target.value)}
      />
      <input
        className="input"
        type="text"
        name="conta"
        required
        placeholder="Digite número da conta"
        value={conta}
        onChange={(e) => setConta(e.target.value)}
      />
      <input
        className="input"
        type="text"
        name="agencia"
        required
        placeholder="Digite número da agência"
        value={agencia}
        onChange={(e) => setAgencia(e.target.value)}
      />
      <input
        className="input"
        type="text"
        name="nomebanco"
        required
        placeholder="Digite nome titular da conta"
        value={nomebanco}
        onChange={(e) => setNomeBanco(e.target.value)}
      />
      <input
        className="input"
        type="text"
        name="pix"
        required
        placeholder="Digite o pix"
        value={pix}
        onChange={(e) => setPix(e.target.value)}
      />
      <input
        className="input"
        type="text"
        name="nomepix"
        required
        placeholder="Digite nome do titular do pix"
        value={nomepix}
        onChange={(e) => setNomePix(e.target.value)}
      />
      <button
        type="submit"
        className="button !mb-0 flex items-center gap-2 justify-center"
      >
        {isEditing ? (
          <>
            <FaSpinner className="animate-spin" />
            Editando igreja...
          </>
        ) : (
          'Editar'
        )}
      </button>
    </form>
  )
}
