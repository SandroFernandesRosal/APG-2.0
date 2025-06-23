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

  const podeGerenciar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

  return (
    <div
      key={id}
      className="relative flex flex-col justify-between bg-gradient-to-br from-primary/10 via-white to-secundary/10 dark:from-bgdark dark:via-slate-800 dark:to-bgdarksecundary rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 min-h-[420px] max-w-xs w-full  p-0 overflow-hidden group transition-all"
    >
      {/* Botões flutuantes no canto superior direito */}
      {podeGerenciar && (
        <div className="absolute top-3 right-3 flex gap-2 z-20">
          <button
            onClick={() => setOpenEdit(id)}
            className="p-2 rounded-full bg-white/90 dark:bg-slate-700/80 hover:bg-primary/10 text-blue-600 shadow-md transition"
            title="Editar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <RemoveDoacao id={id} />
        </div>
      )}

      {/* Badge da igreja */}
      <div className="flex items-center gap-2 mt-6 mb-2 px-6">
        <Church className="w-7 h-7 text-primary dark:text-secundary" />
        <span className="bg-primary/90 dark:bg-secundary/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {local}
        </span>
      </div>

      {/* Dados bancários */}
      <div className="flex flex-col gap-2 px-6">
        <div className="flex items-center gap-2 text-base">
          <Landmark className="w-5 h-5 text-primary dark:text-secundary" />
          <span className="font-semibold">Banco:</span>
          <span>{banco}</span>
        </div>
        <div className="flex items-center gap-2 text-base">
          <CreditCard className="w-5 h-5 text-primary dark:text-secundary" />
          <span className="font-semibold">Conta:</span>
          <span>{conta}</span>
        </div>
        <div className="flex items-center gap-2 text-base">
          <BadgeCent className="w-5 h-5 text-primary dark:text-secundary" />
          <span className="font-semibold">Agência:</span>
          <span>{agencia}</span>
        </div>
        <div className="flex items-center gap-2 text-base">
          <span className="font-semibold">Titular:</span>
          <span>{nomebanco}</span>
        </div>
      </div>

      {/* PIX destacado */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-primary/10 via-white to-secundary/10 dark:from-bgdarksecundary dark:via-slate-800 dark:to-bgdark p-4 mt-4 rounded-b-2xl">
        <span className="font-bold flex items-center gap-2 text-lg text-primary dark:text-secundary mb-1">
          <KeyRound className="w-6 h-6" /> Chave PIX
        </span>
        <div className="flex items-center gap-2 mb-1">
          <span className="break-all font-mono text-base text-gray-800 dark:text-gray-100">
            {pix}
          </span>
          <button
            onClick={() => handleCopy(pix, id)}
            className="p-1 hover:bg-primary/20 dark:hover:bg-secundary/20 rounded-md transition"
            title="Copiar PIX"
          >
            <Copy className="w-5 h-5 text-primary dark:text-secundary" />
          </button>
        </div>
        {copiedId === id && (
          <span className="text-xs text-green-500 transition-all">
            PIX copiado!
          </span>
        )}
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {nomepix}
        </span>
      </div>

      {/* Edit Modal */}
      {openEdit === id && (
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
    </div>
  )
}
