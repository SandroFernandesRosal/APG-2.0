'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function ForgotPasswordPage() {
  const [login, setLogin] = useState<string>('') // Adicionado tipo string
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await api.post(
        '/recover-password',
        {
          login,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response) {
        console.log('email enviado')

        alert('email enviado com sucesso!')
        router.push('/login/igreja')
        window.location.href = '/login/igreja'
      } else {
        console.log('Erro. Email não enviado')
      }
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-5 pt-24 md:pt-[145px]">
      <form
        onSubmit={handleSubmit}
        className="mb-10 mt-5 flex min-h-screen w-[100vw] flex-col items-center"
      >
        <h1 className="m-0 text-lg font-bold text-primary">
          Esqueceu a senha?
        </h1>
        <p className="mb-5 text-xl">Digite seu email cadastrado</p>
        <input
          name="login"
          id="login"
          type="email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Digite seu e-mail"
          className="input !max-w-[400px]"
        />
        <button type="submit" className="button">
          Solicitar redefinição de senha
        </button>
      </form>
    </div>
  )
}
