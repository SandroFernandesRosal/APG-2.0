'use client'

import Link from 'next/link'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import LogoutIgreja from '@/components/LogoutIgreja'
import { FaSpinner, FaEnvelope, FaLock } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Register() {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | boolean>(false)
  const [isAdminLogged, setIsAdminLogged] = useState(false)
  const [isMemberLogged, setIsMemberLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)

  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/auth/login/me', {
          method: 'GET',
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()

          if (data.user?.role === 'ADMIN' || data.user?.role === 'SUPERADMIN') {
            setIsAdminLogged(true)
          } else if (data.user?.role === 'MEMBRO') {
            setIsMemberLogged(true)
          }
        }
      } catch (err) {
        console.error('Erro ao verificar login:', err)
      } finally {
        setIsLoading(false)
      }
    }

    checkLogin()
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsLogged(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
        credentials: 'include',
      })

      const user = await response.json()

      if (!response.ok) {
        setIsLogged(false)
        const errorMessage = user.error || 'Erro ao fazer login.'
        setError(errorMessage)
        toast.error(errorMessage)
        return
      }

      if (response.status === 200) {
        toast.success('Login realizado com sucesso!')
        router.push('/')
        window.location.href = '/'
      }
    } catch {
      const errorMessage = 'Erro ao fazer login. Tente novamente mais tarde.'
      setError(errorMessage)
      toast.error(errorMessage)
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
    <div className="flex w-full justify-center items-center min-h-screen pt-28 md:pt-[185px] pb-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 dark:from-secundary dark:to-secundary/80 px-6 py-8 text-center">
            <div className="flex justify-center mb-2">
              {theme === 'dark' ? (
                <Image
                  src="/img/logob.png"
                  height={80}
                  width={80}
                  priority
                  quality={100}
                  alt="logo do site"
                  className="object-contain"
                />
              ) : (
                <Image
                  src="/img/logob.png"
                  height={80}
                  width={80}
                  priority
                  quality={100}
                  alt="logo do site"
                  className="object-contain"
                />
              )}
            </div>
            <p className="text-white/90 text-sm">Faça login para continuar</p>
          </div>

          {/* Form */}
          <form
            className="flex w-full flex-col gap-5 p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm font-medium text-red-800 dark:text-red-200 text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="login"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="login"
                  name="login"
                  type="email"
                  required
                  value={login}
                  placeholder="seu@email.com"
                  onChange={(e) => setLogin(e.target.value.toLowerCase())}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href={'/forgot-password'}
                className="text-sm font-medium text-primary dark:text-secundary hover:underline transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLogged}
              className="w-full bg-gradient-to-r from-primary to-primary/90 dark:from-secundary dark:to-secundary/90 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary/90 hover:to-primary dark:hover:from-secundary/90 dark:hover:to-secundary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogged ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  ou
                </span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ainda não tem conta?{' '}
                <Link
                  href={'/register'}
                  className="font-semibold text-primary dark:text-secundary hover:underline transition-colors"
                >
                  Crie uma agora mesmo!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
