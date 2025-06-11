'use client'

import Cookies from 'js-cookie'
import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { useToken } from '@/hooks/useToken'
import DatePicker, { registerLocale } from 'react-datepicker'

import { ptBR } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('pt-BR', ptBR)

interface AddAgendaProps {
  openAgenda: boolean
  setOpenAgenda: (open: boolean) => void
}

export default function AddAgenda({
  openAgenda,
  setOpenAgenda,
}: AddAgendaProps) {
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
        setOpenAgenda(false)
        router.push('/')
        window.location.href = '/'
        return agenda
      }

      console.log(agenda)
    } catch (error) {
      console.error('Erro ao criar evento:', error)
    } finally {
      setIsSubmitting(false)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-50 flex min-h-screen w-full flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%] max-w-md">
        <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
          Adicionar evento{' '}
          {openAgenda && (
            <AiFillCloseCircle
              onClick={() => setOpenAgenda(false)}
              className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
            />
          )}
        </h1>

        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          locale="pt-BR"
          dateFormat="EEEE - dd/MM/yyyy"
          placeholderText="Selecione a data"
          className="input mb-2 z-40 flex place-self-center"
          required
        />

        <input
          className="input"
          type="text"
          name="name"
          placeholder="Nome do evento"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="input"
          type="time"
          name="hour"
          placeholder="Horário do evento"
          onChange={(e) => setHour(e.target.value)}
          required
        />

        <label
          htmlFor="role"
          className={`font-bold mb-1 ${token?.role === 'ADMIN' && 'hidden'} `}
        >
          Selecione a igreja
        </label>
        <select
          id="role"
          name="role"
          className="input mb-3"
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

        <button
          type="submit"
          className="button !z-0 !mb-0 flex items-center gap-2 justify-center disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Adicionando evento...
            </>
          ) : (
            'Enviar'
          )}
        </button>
      </div>
    </form>
  )
}
