'use client'

import { Doacao } from '@/data/types/doacao'
import EditDoacao from './crud/EditDoacao'
import RemoveDoacao from './crud/RemoveDoacao'
import { useState } from 'react'
import { useToken } from '@/hooks/useToken'
import {
  BadgeCent,
  Church,
  CreditCard,
  Landmark,
  Copy,
  KeyRound,
} from 'lucide-react'

export default function ItemDoe({
  id,
  local,
  banco,
  conta,
  agencia,
  nomebanco,
  pix,
  nomepix,
}: Doacao) {
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const token = useToken()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)

      setTimeout(() => {
        setCopiedId(null)
      }, 2000)
    } catch (err) {
      console.error('Erro ao copiar PIX:', err)
    }
  }

  const podeAdicionar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

  return (
    <div
      className="flex flex-col justify-between h-[400px] max-w-[300px] w-[47%] rounded-md border-[1px] border-zinc-300 dark:border-zinc-700 transition-all p-2"
      key={id}
    >
      <div className="flex flex-col justify-center gap-2 h-[50%] w-fit place-self-center">
        <h1 className="font-bold text-lg flex items-center gap-2">
          <Church className="w-5 h-5" />
          {local}
        </h1>
        <span className="flex items-center gap-2">
          <Landmark className="w-4 h-4" />
          {banco}
        </span>
        <span className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Conta: {conta}
        </span>
        <span className="flex items-center gap-2">
          <BadgeCent className="w-4 h-4" />
          Agência: {agencia}
        </span>
        <span>{nomebanco}</span>
      </div>

      <div className="border-b-[1px] border-zinc-300 dark:border-zinc-700 my-2" />

      <div className="flex flex-col justify-center h-[50%] gap-2 w-fit place-self-center">
        <span className="font-semibold text-center flex items-center justify-center gap-2 text-lg">
          <KeyRound className="w-4 h-4" />
          Chave PIX:
        </span>
        <div className="flex items-center gap-2">
          <h1 className="break-all">{pix}</h1>
          <button
            onClick={() => handleCopy(pix, id)}
            className="p-1 hover:bg-primary/20 dark:hover:bg-secundary/20 rounded-md transition"
          >
            <Copy className="w-4 h-4 text-primary dark:text-secundary" />
          </button>
        </div>
        {copiedId === id && (
          <span className="text-xs text-green-500 transition-all">
            PIX copiado!
          </span>
        )}
        <h2>{nomepix}</h2>

        {podeAdicionar && (
          <div className="flex w-full mt-4 gap-2 justify-around">
            {openEdit !== id ? (
              <button className="button !mb-0" onClick={() => setOpenEdit(id)}>
                Editar
              </button>
            ) : (
              <EditDoacao
                localInitial={local}
                bancoInitial={banco}
                contaInitial={conta}
                agenciaInitial={agencia}
                nomebancoInitial={nomebanco}
                pixInitial={pix}
                nomepixInitial={nomepix}
                id={id}
                setOpenEdit={setOpenEdit}
              />
            )}
            <RemoveDoacao id={id} />
          </div>
        )}
      </div>
    </div>
  )
}
