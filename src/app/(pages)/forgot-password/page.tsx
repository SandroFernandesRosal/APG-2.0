'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const [login, setLogin] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log('email enviado')
        alert('email enviado com sucesso!')
        router.push('/login/igreja')
      } else if (response.status === 404) {
        alert(`Não existe usuário com esse email: ${login}`)
      } else {
        console.log('Erro. Email não enviado')
        alert(data?.message || 'Erro ao enviar email.')
      }
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error)
      alert('Erro ao solicitar redefinição de senha. Tente novamente.')
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
