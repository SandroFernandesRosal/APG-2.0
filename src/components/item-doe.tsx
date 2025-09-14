'use client'

import { useState } from 'react'
import {
  BadgeCent,
  Church,
  CreditCard,
  Landmark,
  Copy,
  KeyRound,
} from 'lucide-react'

interface ItemDoeProps {
  id: string
  local: string
  banco: string
  conta: string
  agencia: string
  nomebanco: string
  pix: string
  nomepix: string
  isAdmin: boolean
  updatedAt: string
  createdAt: string
}

export default function ItemDoe({
  id,
  local,
  banco,
  conta,
  agencia,
  nomebanco,
  pix,
  nomepix,
}: ItemDoeProps) {
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

  return (
    <div
      key={id}
      className="relative flex flex-col justify-between bg-gradient-to-br from-primary/10 via-white to-secundary/10 dark:from-bgdark dark:via-slate-800 dark:to-bgdarksecundary rounded-2xl shadow-xl border border-zinc-300 dark:border-zinc-800 min-h-[420px] max-w-xs w-full  p-0 overflow-hidden group transition-all"
    >
      <div className="flex items-center gap-2 mt-6 mb-2 px-6">
        <Church className="w-7 h-7 text-primary dark:text-secundary" />
        <span className="bg-primary/90 dark:bg-secundary/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {local}
        </span>
      </div>

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
    </div>
  )
}
