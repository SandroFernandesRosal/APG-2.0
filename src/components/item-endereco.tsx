'use client'

// Removido: useState não é mais necessário
import { MapPin } from 'lucide-react'

interface ItemEnderecoProps {
  id: string
  local: string
  rua: string
  numero?: string
  cidade?: string
  cep: string
  isAdmin: boolean
  updatedAt: string
  createdAt: string
}

export default function ItemEndereco({
  id,
  local,
  rua,
  numero,
  cidade,
  cep,
}: ItemEnderecoProps) {
  const openGoogleMaps = () => {
    const enderecoFormatado = `${rua}, ${numero || ''}, ${cidade || ''}, ${cep}`
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoFormatado)}`
    window.open(url, '_blank')
  }

  return (
    <div
      key={id}
      className="relative flex flex-col justify-between bg-gradient-to-br from-primary/10 via-white to-secundary/10 dark:from-bgdark dark:via-slate-800 dark:to-bgdarksecundary rounded-2xl shadow-xl border border-zinc-300 dark:border-zinc-800 min-h-[420px] max-w-xs w-full p-0 overflow-hidden group transition-all"
    >
      <div className="flex items-center gap-2 mt-6 mb-2 px-6">
        <MapPin className="w-7 h-7 text-primary dark:text-secundary" />
        <span className="bg-primary/90 dark:bg-secundary/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {local}
        </span>
      </div>

      <div className="flex flex-col gap-2 px-6">
        <div className="flex items-center gap-2 text-base">
          <MapPin className="w-5 h-5 text-primary dark:text-secundary" />
          <span className="font-semibold">Endereço:</span>
          <span>
            {rua}, {numero}
          </span>
        </div>
        <div className="flex items-center gap-2 text-base">
          <MapPin className="w-5 h-5 text-primary dark:text-secundary" />
          <span className="font-semibold">Cidade:</span>
          <span>{cidade}</span>
        </div>
        <div className="flex items-center gap-2 text-base">
          <MapPin className="w-5 h-5 text-primary dark:text-secundary" />
          <span className="font-semibold">CEP:</span>
          <span>{cep}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-primary/10 via-white to-secundary/10 dark:from-bgdarksecundary dark:via-slate-800 dark:to-bgdark p-4 mt-4 rounded-b-2xl">
        <button
          onClick={openGoogleMaps}
          className="w-full px-4 py-2 bg-primary dark:bg-secundary text-white rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors"
        >
          Ver no Google Maps
        </button>
      </div>
    </div>
  )
}
