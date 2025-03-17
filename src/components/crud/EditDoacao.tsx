'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'
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
  const [local, setLocal] = useState<string>(localInitial)
  const [banco, setBanco] = useState<string>(bancoInitial)
  const [conta, setConta] = useState<string>(contaInitial)
  const [agencia, setAgencia] = useState<string>(agenciaInitial)
  const [nomebanco, setNomeBanco] = useState<string>(nomebancoInitial)
  const [pix, setPix] = useState<string>(pixInitial)
  const [nomepix, setNomePix] = useState<string>(nomepixInitial)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.put(
        `/doacao/${id}`,
        {
          local: local || localInitial,
          banco: banco || bancoInitial,
          conta: conta || contaInitial,
          agencia: agencia || agenciaInitial,
          nomebanco: nomebanco || nomebancoInitial,
          pix: pix || pixInitial,
          nomepix: nomepix || nomepixInitial,
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
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
        return doacao
      }

      console.log(doacao)
    } catch (error) {
      console.error('Erro ao editar doação:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-30 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg md:mt-20"
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
        name="banco"
        required={true}
        placeholder="Digite o nome do banco"
        value={banco}
        onChange={(e) => setBanco(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="conta"
        required={true}
        placeholder="Digite número da conta"
        value={conta}
        onChange={(e) => setConta(e.target.value)}
      />

      <input
        className="input "
        type="text"
        name="agencia"
        required={true}
        placeholder="Digite número da agência"
        value={agencia}
        onChange={(e) => setAgencia(e.target.value)}
      />

      <input
        className="input "
        type="text"
        name="nomebanco"
        required={true}
        placeholder="Digite nome titular da conta"
        value={nomebanco}
        onChange={(e) => setNomeBanco(e.target.value)}
      />

      <input
        className="input "
        type="text"
        name="pix"
        required={true}
        placeholder="Digite o pix"
        value={pix}
        onChange={(e) => setPix(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="nomepix"
        required={true}
        placeholder="Digite nome do titular do pix"
        value={nomepix}
        onChange={(e) => setNomePix(e.target.value)}
      />

      <button type="submit" className="button !mb-0">
        Enviar
      </button>
    </form>
  )
}
