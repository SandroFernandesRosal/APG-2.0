'use client'

import Cookies from 'js-cookie'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocal } from '../../store/useStore'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { local } = useLocal()
  const [role, setRole] = useState<string>(local)
  const router = useRouter()
  const token = Cookies.get('tokennn')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/agenda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          day,
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
      className="fixed left-0 top-0 z-50 flex min-h-screen w-[100vw] flex-col items-center justify-center bg-bgdark/50 dark:bg-bglight/30"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center  rounded-lg bg-bglight py-6 dark:bg-bgdark w-[80%]  max-w-md">
        <h1 className="z-20 mb-2 flex items-center justify-center gap-3 text-lg font-bold text-primary dark:text-secundary">
          Adicionar evento{' '}
          {openAgenda && (
            <AiFillCloseCircle
              onClick={() => setOpenAgenda(false)}
              className="cursor-pointer text-2xl font-bold text-primary dark:text-secundary hover:text-primary/50 dark:hover:text-secundary/50"
            />
          )}
        </h1>

        <input
          className="input mt-4"
          type="text"
          name="day"
          placeholder="Dia da semana"
          onChange={(e) => setDay(e.target.value)}
        />

        <input
          className="input"
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

        <label htmlFor="role" className="font-bold mb-1">
          Selecione a igreja
        </label>
        <select
          id="role"
          name="role"
          className="input mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Selecione...</option>
          <option value="VILADAPENHA">Vila da Penha</option>
          <option value="MARIAHELENA">Maria Helena</option>
          <option value="TOMAZINHO">Tomazinho</option>
        </select>

        <button
          type="submit"
          className="button !mb-0 flex items-center gap-2 justify-center disabled:opacity-60"
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
