'use client'

import Cookies from 'js-cookie'
import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { useToken } from '@/hooks/useToken'
import DatePicker, { registerLocale } from 'react-datepicker'
import { toast } from 'react-toastify'

import { ptBR } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('pt-BR', ptBR)

interface AddAgendaProps {
  setOpenAgenda: (open: boolean) => void
}

export default function AddAgenda({ setOpenAgenda }: AddAgendaProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [name, setName] = useState<string>('')
  const [hour, setHour] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { local } = useLocal()
  const token = useToken()
  const [role, setRole] = useState<string>(
    token?.role === 'ADMIN' ? (token.ministryRole ?? '') : local,
  )
  const router = useRouter()
  const cookieToken = Cookies.get('tokennn')

  useEffect(() => {
    if (token?.role === 'ADMIN') {
      setRole(token.ministryRole ?? '')
    }
  }, [token])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/agenda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookieToken}`,
        },
        body: JSON.stringify({
          day: selectedDate?.toISOString().split('T')[0], // formato YYYY-MM-DD
          name,
          hour,
          role,
        }),
      })

      const agenda = await response.json()

      if (response.status === 200 && agenda) {
        toast.success('Evento criado com sucesso!')
        setOpenAgenda(false)
        router.push('/')
        window.location.href = '/'
        return agenda
      } else {
        toast.error('Erro ao criar evento. Tente novamente.')
      }

      console.log(agenda)
    } catch (error) {
      console.error('Erro ao criar evento:', error)
      toast.error('Erro ao criar evento. Tente novamente.')
    } finally {
      setIsSubmitting(false)
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
            Adicionar Evento
          </h1>
          <button
            type="button"
            onClick={() => setOpenAgenda(false)}
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
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                locale="pt-BR"
                dateFormat="EEEE - dd/MM/yyyy"
                placeholderText="Selecione a data"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
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
                onChange={(e) => setHour(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${token?.role === 'ADMIN' ? 'hidden' : ''}`}
              >
                Selecione a igreja
              </label>
              <select
                id="role"
                name="role"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                disabled={token?.role === 'ADMIN'}
              >
                <option value="">Selecione...</option>
                <option value="VILADAPENHA">Vila da Penha</option>
                <option value="MARIAHELENA">Maria Helena</option>
                <option value="TOMAZINHO">Tomazinho</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end w-full p-4 border-t border-gray-200 dark:border-gray-700 space-x-3 bg-white dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setOpenAgenda(false)}
            className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-primary dark:bg-secundary rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Adicionando...</span>
              </>
            ) : (
              <span>Adicionar Evento</span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
