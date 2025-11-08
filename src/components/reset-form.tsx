'use client'

import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa'
import Link from 'next/link'

interface ResetPasswordFormProps {
  token: string
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [password, setPassword] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingEmail, setIsLoadingEmail] = useState(true)
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch(
          `/api/auth/reset-password/validate?token=${token}`,
        )

        if (response.ok) {
          const data = await response.json()
          setLogin(data.email)
        } else {
          const errorData = await response.json()
          toast.error(errorData.error || 'Token inválido ou expirado')
          router.push('/forgot-password')
        }
      } catch (error) {
        console.error('Erro ao buscar email:', error)
        toast.error('Erro ao carregar informações. Tente novamente.')
        router.push('/forgot-password')
      } finally {
        setIsLoadingEmail(false)
      }
    }

    fetchUserEmail()
  }, [token, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password,
          passwordResetToken: token,
        }),
      })

      if (response.ok) {
        toast.success('Senha redefinida com sucesso!')
        router.push('/login')
      } else {
        const data = await response.json()
        toast.error(data.error || 'Erro ao redefinir a senha. Tente novamente.')
      }
    } catch (error: unknown) {
      console.error('Erro ao redefinir senha:', error)
      toast.error('Erro ao redefinir a senha. Tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
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
            <h1 className="text-2xl font-bold text-white mb-1">
              Recuperação de senha
            </h1>
            <p className="text-white/90 text-sm">Digite sua nova senha</p>
          </div>

          {/* Form */}
          {isLoadingEmail ? (
            <div className="flex w-full flex-col gap-5 p-6 md:p-8 items-center justify-center py-12">
              <FaSpinner className="animate-spin text-4xl text-primary dark:text-secundary" />
              <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-5 p-6 md:p-8"
            >
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
                    readOnly
                    disabled
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nova Senha
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
                    placeholder="Digite sua nova senha"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary/90 dark:from-secundary dark:to-secundary/90 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary/90 hover:to-primary dark:hover:from-secundary/90 dark:hover:to-secundary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Redefinindo...</span>
                  </>
                ) : (
                  <span>Redefinir Senha</span>
                )}
              </button>

              {/* Back to Login Link */}
              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-sm font-medium text-primary dark:text-secundary hover:underline transition-colors"
                >
                  Voltar para o login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
