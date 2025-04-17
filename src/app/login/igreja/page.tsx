'use client'
import Link from 'next/link'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function RegisterIgreja() {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | boolean>(false)
  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })

      const user = await response.json()

      if (!response.ok) {
        setError(user.error || 'Erro ao fazer login.')
        return
      }

      if (response.status === 200 && user) {
        Cookies.set('tokenigreja', user.token)

        router.push('/testemunhos')
        window.location.href = '/testemunhos'
      }
    } catch {
      setError('Erro ao redefinir a senha. Tente novamente mais tarde.')
    }
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
