'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface ApiError {
  response?: {
    status: number
    data: {
      error?: string
    }
  }
  message?: string
}

interface ResetPasswordFormProps {
  token: string
}

export default function ResetPasswordFormAdm({
  token,
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [error, setError] = useState<string | boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await api.post(
        `/auth/admin/reset-password`,
        {
          login,
          password,
          passwordResetToken: token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response) {
        console.log('Senha redefinida com sucesso')
        alert('Senha redefinida com sucesso!')
        router.push('/login/adm')
      } else {
        throw new Error('Erro desconhecido')
      }
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof error.response === 'object' &&
        error.response !== null &&
        'status' in error.response &&
        'data' in error.response &&
        typeof error.response.data === 'object' &&
        error.response.data !== null &&
        'error' in error.response.data
      ) {
        setError(
          (error as ApiError).response?.data?.error || 'Erro desconhecido',
        )
      } else {
        setError('Erro ao redefinir a senha. Tente novamente mais tarde.')
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex min-h-screen w-[100vw] flex-col items-center rounded-[35px] bg-bglightsecundary px-1 pb-4 shadow-light dark:bg-bgdarksecundary dark:shadow-dark md:w-[90vw] md:rounded-xl"
    >
      <div className="flex flex-col items-center md:min-w-[35%]">
        <h1 className="m-0 text-lg font-bold text-primary dark:text-primary">
          Recuperação de senha
        </h1>
        <p className="mb-4 text-lg">Digite sua nova senha</p>
      </div>

      {error && <p className="mb-2 text-red-500">{error}</p>}

      <input
        type="text"
        name="login"
        value={login}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLogin(e.target.value)
        }
        placeholder="Email cadastrado"
        className="input"
      />

      <input
        type="password"
        name="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        placeholder="Nova senha"
        className="input"
      />

      <button type="submit" className="button">
        Redefinir Senha
      </button>
    </form>
  )
}
