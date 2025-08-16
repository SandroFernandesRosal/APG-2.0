'use client'

import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ptBR } from 'date-fns/locale'
import { format, parseISO } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('pt-BR', ptBR)

interface EditAgendaProps {
  setOpenEdit: (open: string | null) => void
  id: string
  title: string
  hora: string
  dia: string
  role?: string
}

export default function EditAgenda({
  setOpenEdit,
  id,
  title,
  hora,
  dia,
  role,
}: EditAgendaProps) {
  const [day, setDay] = useState<Date | null>(parseISO(dia))
  const [name, setName] = useState<string>(title)
  const [hour, setHour] = useState<string>(hora)
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsEditing(true)

    try {
      const response = await fetch(`/api/agenda/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          day: day ? format(day, 'yyyy-MM-dd') : dia,
          name: name || title,
          hour: hour || hora,
          role,
        }),
      })

      const agenda = await response.json()

      if (response.ok && agenda) {
        setOpenEdit(null)
        router.push('/')
        window.location.href = '/'
        return agenda
      }

      console.log(agenda)
    } catch (error) {
      console.error('Erro ao editar evento:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-2xl w-full max-w-2xl my-4">
        {/* Header */}
        <div className="flex items-center justify-between w-full p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Editar Evento
          </h1>
          <button
            type="button"
            onClick={() => setOpenEdit(null)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <AiFillCloseCircle className="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </button>
        </div>

        {/* Content */}
        <div className="w-full p-4 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Data do Evento
              </label>
              <DatePicker
                selected={day}
                onChange={(date: Date | null) => setDay(date)}
                dateFormat="EEEE - dd/MM/yyyy"
                locale="pt-BR"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholderText="Selecione a data"
                wrapperClassName="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nome do Evento
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                type="text"
                name="name"
                id="name"
                placeholder="Digite o nome do evento"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="hour"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Horário do Evento
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                type="time"
                name="hour"
                id="hour"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end w-full p-4 border-t border-gray-200 dark:border-gray-700 space-x-3 bg-white dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setOpenEdit(null)}
            className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isEditing}
            className="px-6 py-2 text-sm font-medium text-white bg-primary dark:bg-secundary rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isEditing ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Editando...</span>
              </>
            ) : (
              <span>Salvar Alterações</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
