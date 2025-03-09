'use client'
import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { AiFillCloseCircle } from 'react-icons/ai'
import { api } from '@/lib/api'

interface AddAgendaProps {
  openAgenda: boolean
  setOpenAgenda: (open: boolean) => void
}

export default function AddAgenda({
  openAgenda,
  setOpenAgenda,
}: AddAgendaProps) {
  const [day, setDay] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [hour, setHour] = useState<string>('')

  const { local } = useLocal()
  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post(
        `/agenda/${local}`,
        {
          day,
          name,
          hour,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const agenda = response.data.agendaTotal

      if (response.status === 200 && agenda) {
        setOpenAgenda(false)
        router.push('/')
        window.location.href = '/'

        return agenda
      }

      console.log(agenda)
    } catch (error) {
      console.error('Erro ao criar evento:', error)
    }

    return null
  }

  return (
    <form
      className="fixed left-0 top-0 z-30 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/50 backdrop-blur-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
        Adicionar evento{' '}
        {openAgenda === true && (
          <AiFillCloseCircle
            onClick={() => setOpenAgenda(false)}
            className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
          />
        )}
      </h1>
      <input
        className="input"
        type="text"
        name="day"
        placeholder="Dia da semana"
        onChange={(e) => setDay(e.target.value)}
      />

      <input
        className="input "
        type="text"
        name="name"
        placeholder="Nome do evento"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input"
        type="text"
        name="hour"
        placeholder="Horário do evento"
        onChange={(e) => setHour(e.target.value)}
      />

      <button type="submit" className="button">
        Enviar
      </button>
    </form>
  )
}
