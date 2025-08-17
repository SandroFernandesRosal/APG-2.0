'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Logout() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    console.log('Iniciando logout...')

    try {
      console.log('Fazendo requisição para /api/auth/logout...')

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('Resposta recebida:', response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Dados da resposta:', data)

      router.push('/login')
      window.location.href = '/login'
    } catch (error) {
      console.error('Falha no logout:', error)

      window.location.href = '/login'
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Saindo...' : 'Sair'}
    </button>
  )
}
