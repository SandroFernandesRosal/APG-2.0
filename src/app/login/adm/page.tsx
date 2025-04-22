'use client'

import Link from 'next/link'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import LogoutIgreja from '@/components/LogoutIgreja'

export default function Register() {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | boolean>(false)
  const [isAdminLogged, setIsAdminLogged] = useState(false)
  const [isMemberLogged, setIsMemberLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const checkLogins = async () => {
      try {
        const adminRes = await fetch('/api/auth/admin/login/me', {
          method: 'GET',
          credentials: 'include',
        })
        if (adminRes.ok) {
          setIsAdminLogged(true)
        }

        const memberRes = await fetch('/api/auth/login/me', {
          method: 'GET',
          credentials: 'include',
        })
        if (memberRes.ok) {
          setIsMemberLogged(true)
        }
      } catch (err) {
        console.error('Erro ao verificar login:', err)
      } finally {
        setIsLoading(false)
      }
    }

    checkLogins()
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
        credentials: 'include',
      })

      const user = await response.json()

      if (!response.ok) {
        setError(user.error || 'Erro ao fazer login.')
        return
      }

      if (response.status === 200) {
        router.push('/')
        window.location.href = '/'
      }
    } catch {
      setError('Erro ao fazer login. Tente novamente mais tarde.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando...</p>
      </div>
    )
  }

  if (isMemberLogged) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-2xl font-bold text-primary dark:text-secundary mb-4">
          Você está logado como <span className="text-green-600">membro</span>.
        </h1>
        <p className="mb-2">
          Faça logout como membro e entre como admin para continuar.
        </p>
        <div className="flex gap-2">
          {' '}
          <Link href="/" className="button !mb-0">
            Voltar para Home
          </Link>{' '}
          ou
          <LogoutIgreja />
        </div>
      </div>
    )
  }

  if (isAdminLogged) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-2xl font-bold text-primary dark:text-secundary mb-4">
          Você já está logado como{' '}
          <span className="text-red-500">administrador</span>.
        </h1>
        <Link href="/" className="button">
          Voltar para a Home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center min-h-screen pt-28 md:pt-[185px]">
      <div className="flex flex-col items-center border-[1px] border-zinc-400 dark:border-zinc-700 w-[70%] max-w-[500px] h-full rounded-md">
        <h1 className="mt-2 text-xl font-bold text-primary dark:text-secundary mb-5">
          Login para Administrador
        </h1>

        <Link className="button !mb-0" href={'/login/igreja'}>
          Alterar para Membro
        </Link>

        <form
          className="flex w-full flex-col items-center gap-3 rounded-xl p-3 md:mb-5"
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
            href={'/reset-password-adm'}
            className="font-bold text-primary dark:text-secundary"
          >
            Esqueceu a senha?
          </Link>
        </form>
      </div>
    </div>
  )
}
