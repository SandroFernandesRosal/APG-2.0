'use client'

import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { useToken } from '@/hooks/useToken'
import Image from 'next/image'

const CARGOS = [
  'PASTOR',
  'DIACONO',
  'PRESBITERO',
  'EVANGELISTA',
  'MISSIONARIO',
  'SECRETARIO',
  'TESOUREIRO',
  'PASTOR_PRESIDENTE',
  'PASTOR_DIRIGENTE',
  'MUSICO',
  'AUXILIAR',
]

const IGREJAS = [
  { key: 'VILADAPENHA', label: 'Vila da Penha' },
  { key: 'TOMAZINHO', label: 'Tomazinho' },
  { key: 'MARIAHELENA', label: 'Vila Maria Helena' },
]

interface EditMinisterioProps {
  setOpenEdit: (open: string | null) => void
  id: string
  nome: string
  lugar: string
  titulo: string[] | undefined
  img: string
  role?: string
}

export default function EditMinisterio({
  setOpenEdit,
  id,
  nome,
  titulo,
  img,
  role,
}: EditMinisterioProps) {
  const [title, setTitle] = useState<string[]>(
    titulo ? titulo.map((t: string) => t.trim()) : [],
  )
  const [igreja, setIgreja] = useState<string>(role || '')
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const token = useToken()

  const handleCargoChange = (cargoSelecionado: string) => {
    if (title.includes(cargoSelecionado)) {
      setTitle((cargosAtuais) =>
        cargosAtuais.filter((c) => c !== cargoSelecionado),
      )
    } else {
      setTitle((cargosAtuais) => [...cargosAtuais, cargoSelecionado])
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)
    try {
      const response = await fetch(`/api/ministerio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          cargo: title,
          ministryRole: igreja || null,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setOpenEdit(null)
        window.location.reload()
      } else {
        toast.error(data.error || 'Erro ao editar usuário')
      }
    } catch {
      toast.error('Erro ao editar usuário')
    }
    setIsEditing(false)
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-bgdark/50 dark:bg-bglight/30 p-4">
      <div className="w-full max-w-2xl bg-bglight dark:bg-bgdark rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary dark:text-secundary">
            Editar Líder
          </h1>
          <AiFillCloseCircle
            onClick={() => setOpenEdit(null)}
            className="cursor-pointer text-2xl text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        </div>

        {/* Área de upload única no topo */}
        <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-textlight dark:text-textdark">
              <FaCameraRetro className="text-xl text-primary dark:text-secundary" />
              <span className="font-semibold">Foto do líder</span>
            </div>
            <div className="relative">
              <Image
                width={120}
                height={120}
                src={img || '/img/Placeholder.png'}
                alt={nome}
                className="h-[120px] w-[120px] rounded-full border-2 border-primary dark:border-secundary object-cover"
              />
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Conteúdo scrollável */}
          <div className="overflow-y-auto max-h-[60vh] p-4">
            <div className="space-y-4">
              {/* Nome (readonly) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Nome
                </label>
                <div className="w-full p-3 text-textlight dark:text-textdark font-medium text-center cursor-not-allowed bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
                  {nome}
                </div>
              </div>

              {/* Grupo de Checkboxes para Cargos */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Cargos
                </label>
                <div className="p-3 border rounded-lg border-gray-300 dark:border-gray-600 max-h-48 overflow-y-auto bg-white dark:bg-gray-800">
                  <div className="flex flex-col gap-2">
                    {CARGOS.map((cargo) => (
                      <label
                        key={cargo}
                        className="flex items-center justify-between cursor-pointer text-textlight dark:text-textdark p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <span className="text-sm">
                          {cargo.replace(/_/g, ' ')}
                        </span>
                        <input
                          type="checkbox"
                          value={cargo}
                          checked={title.includes(cargo)}
                          onChange={() => handleCargoChange(cargo)}
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-primary focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grupo de Botões de Rádio para Igreja */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-textlight dark:text-textdark">
                  Igreja
                </label>
                <div className="p-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                  <div className="flex flex-col gap-2">
                    {IGREJAS.map((ig) => (
                      <label
                        key={ig.key}
                        className={`flex items-center justify-between cursor-pointer text-textlight dark:text-textdark p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${token?.role !== 'SUPERADMIN' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span className="text-sm">{ig.label}</span>
                        <input
                          type="radio"
                          name="igreja"
                          value={ig.key}
                          checked={igreja === ig.key}
                          onChange={(e) => setIgreja(e.target.value)}
                          disabled={token?.role !== 'SUPERADMIN'}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-primary focus:ring-primary focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setOpenEdit(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="button flex items-center gap-2"
              disabled={isEditing}
            >
              {isEditing ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Editando líder...
                </>
              ) : (
                'Editar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
