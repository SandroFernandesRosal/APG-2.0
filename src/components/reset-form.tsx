'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

interface ResetPasswordFormProps {
  token: string
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [password, setPassword] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [error, setError] = useState<string | boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          login,
          password,
          passwordResetToken: token,
        }),
      })

      if (response.ok) {
        console.log('Senha redefinida com sucesso')
        alert('Senha redefinida com sucesso!')
        router.push('/login/igreja')
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Erro desconhecido')
      }
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
      ) {
        setError(
          error.message ||
            'Erro ao redefinir a senha. Tente novamente mais tarde.',
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
        <h1 className="m-0 text-lg font-bold text-primary dark:text-secundary">
          Recuperação de senha
        </h1>
        <p className="mb-4 text-xl">Digite sua nova senha</p>
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
