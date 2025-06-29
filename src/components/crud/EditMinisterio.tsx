'use client'

import { FaCameraRetro, FaSpinner } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useRef, FormEvent } from 'react'
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
        alert(data.error || 'Erro ao editar usuário')
      }
    } catch {
      alert('Erro ao editar usuário')
    }
    setIsEditing(false)
  }

  return (
    <form
      ref={formRef}
      className="fixed left-0 top-0 z-50 mt-10 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%] max-w-md gap-4">
        <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
          Editar Líder{' '}
          <AiFillCloseCircle
            onClick={() => setOpenEdit(null)}
            className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        </h1>

        <label className="mb-3 flex flex-col items-center gap-2 font-bold">
          <p className="flex items-center gap-3 text-textlight dark:text-textdark">
            <FaCameraRetro className="text-xl text-primary dark:text-secundary" />
            Foto do líder
          </p>
          <Image
            width={120}
            height={120}
            src={img || '/img/Placeholder.png'}
            alt={nome}
            className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 p-1 border-primary dark:border-secundary"
          />
        </label>

        <div className="input mt-4 text-textlight dark:text-textdark font-bold text-lg text-center cursor-not-allowed bg-gray-100 dark:bg-gray-800 w-[90%]">
          {nome}
        </div>

        {/* Grupo de Checkboxes para Cargos */}
        <div className="w-[90%] p-3 border rounded-lg border-gray-300 dark:border-gray-600 max-h-48 overflow-y-auto">
          <p className="font-bold text-sm mb-2 text-textlight dark:text-textdark">
            Cargos:
          </p>
          <div className="flex flex-col gap-2">
            {CARGOS.map((cargo) => (
              <label
                key={cargo}
                className="flex items-center justify-between cursor-pointer text-textlight dark:text-textdark p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span>{cargo.replace(/_/g, ' ')}</span>
                <input
                  type="checkbox"
                  value={cargo}
                  checked={title.includes(cargo)}
                  onChange={() => handleCargoChange(cargo)}
                  className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-primary focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Grupo de Botões de Rádio para Igreja */}
        <div className="w-[90%] p-3 border rounded-lg border-gray-300 dark:border-gray-600">
          <p className="font-bold text-sm mb-2 text-textlight dark:text-textdark">
            Igreja:
          </p>
          <div className="flex flex-col gap-2">
            {IGREJAS.map((ig) => (
              <label
                key={ig.key}
                className={`flex items-center justify-between cursor-pointer text-textlight dark:text-textdark p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 ${token?.role !== 'SUPERADMIN' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{ig.label}</span>
                <input
                  type="radio"
                  name="igreja"
                  value={ig.key}
                  checked={igreja === ig.key}
                  onChange={(e) => setIgreja(e.target.value)}
                  disabled={token?.role !== 'SUPERADMIN'}
                  className="h-5 w-5 border-gray-300 bg-gray-100 text-primary focus:ring-primary focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="button !mb-0 flex items-center gap-2 justify-center"
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
  )
}
