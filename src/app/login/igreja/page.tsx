'use client'
import Link from 'next/link'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'

interface ApiError {
  response?: {
    status: number
    data: {
      error: string
    }
  }
}

export default function RegisterIgreja() {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | boolean>(false)
  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/login/igreja', {
        login,
        password,
      })

      const user = response.data

      if (user.error) {
        setError(user.error)
        return null
      }

      if (response.status === 200 && user) {
        const token = user.token
        Cookies.set('tokenigreja', token)

        router.push('/testemunhos')
        window.location.href = '/testemunhos'
        return token
      }
    } catch (error) {
      const apiError = error as ApiError

      if (
        apiError.response &&
        (apiError.response.status === 400 ||
          apiError.response.status === 404 ||
          apiError.response.status === 500) &&
        apiError.response.data &&
        apiError.response.data.error
      ) {
        setError(apiError.response.data.error)
      } else {
        setError('Erro ao redefinir a senha. Tente novamente mais tarde.')
      }
    }

    return null
  }

  return (
    <div className="flex w-full  justify-center  min-h-screen pt-28 md:pt-[185px]">
      <div className=" flex  flex-col items-center border-[1px] border-zinc-400 dark:border-zinc-700 w-[70%] max-w-[500px] h-full rounded-md ">
        <h1 className="mt-2 text-lg font-bold text-primary dark:text-secundary ">
          Login
        </h1>
        <p className="mb-5 text-xl">Use suas credenciais</p>

        <form
          className="flex w-full flex-col items-center gap-3 rounded-xl  p-3  md:mb-5"
          onSubmit={handleSubmit}
        >
          <p className="font-bold text-red-800">{error}</p>

          <input
            className="input"
            type="text"
            name="login"
            placeholder="Digite seu e-mail"
            onChange={(e) => setLogin(e.target.value.toLowerCase())}
          />

          <input
            className="input"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="button">
            Entrar
          </button>

          <Link
            href={'/forgot-password'}
            className="font-bold text-primary dark:text-secundary"
          >
            Esqueceu a senha?
          </Link>

          <Link
            href={'/register'}
            className="font-bold text-primary dark:text-secundary"
          >
            Ainda não tem conta? Crie uma agora mesmo!
          </Link>
        </form>
      </div>
    </div>
  )
}
