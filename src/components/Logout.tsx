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
    <button onClick={handleLogout} disabled={loading} className="button !mb-0">
      {loading ? 'Saindo...' : 'Sair'}
    </button>
  )
}
