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

export default function Register() {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | boolean>(false)
  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/login', {
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
        Cookies.set('tokennn', token)

        router.push('/')
        window.location.href = '/'
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
    <div className="mt-[80px] flex w-full  justify-center md:mt-[140px]">
      <div className="my-10 flex min-h-screen w-[100vw] flex-col items-center rounded-[35px] bg-bglightsecundary shadow-light dark:bg-bgdarksecundary dark:shadow-dark  md:w-[90vw] md:rounded-xl">
        <h1 className="mt-2 text-lg font-bold text-primary dark:text-secundary ">
          Login Adm
        </h1>
        <p className="mb-5 text-xl">Use suas credenciais</p>

        <form
          className="flex w-[75%] max-w-[500px] flex-col items-center gap-3 rounded-xl bg-bglight p-3 shadow-light dark:bg-bgdark dark:shadow-dark md:mb-5"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-bold text-primary dark:text-secundary">
            Preencha os campos abaixo:
          </h1>

          <p className="font-bold text-red-800">{error}</p>

          <input
            className="shadow-ligh mb-[10px] w-[90%] cursor-pointer rounded-lg border-none  bg-bglightsecundary p-[5px] text-center font-bold placeholder-textlight shadow-light outline-none focus:ring-0  dark:bg-bgdarksecundary dark:placeholder-textdark dark:shadow-dark"
            type="text"
            name="login"
            placeholder="Digite seu e-mail"
            onChange={(e) => setLogin(e.target.value.toLowerCase())}
          />

          <input
            className="shadow-ligh mb-[10px] w-[90%] cursor-pointer rounded-lg border-none  bg-bglightsecundary p-[5px] text-center font-bold placeholder-textlight shadow-light outline-none focus:ring-0  dark:bg-bgdarksecundary dark:placeholder-textdark dark:shadow-dark"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="z-20  flex w-[100px] cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-slate-950 to-blue-900  font-bold text-white  shadow-light hover:from-blue-900 hover:to-slate-900 dark:shadow-dark"
          >
            Entrar
          </button>

          <Link
            href={'/forgot-password-adm'}
            className="font-bold text-primary dark:text-secundary"
          >
            Esqueceu a senha?
          </Link>
        </form>
      </div>
    </div>
  )
}
