'use client'

import { useState, FormEvent, use } from 'react'

interface ResetPasswordComponentProps {
  params: Promise<{ token: string }>
}

export default function ResetPasswordComponent({
  params,
}: ResetPasswordComponentProps) {
  const token = use(params)
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          login,
          password,
        }),
      })

      if (response.ok) {
        console.log('Senha redefinida com sucesso')
      } else {
        const data = await response.json()
        console.error(
          'Erro ao redefinir a senha:',
          data.error || 'Erro desconhecido',
        )
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-60">
      <h1>Recuperação de Senha</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Digite seu email"
          className="input"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nova senha"
          className="input"
        />
        <button type="submit" className="button">
          Redefinir Senha
        </button>
      </form>
    </div>
  )
}
