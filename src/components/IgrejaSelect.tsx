'use client'

import { useState, useEffect } from 'react'

interface Igreja {
  id: string
  nome: string
  slug: string
  ativa: boolean
}

interface IgrejaSelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  placeholder?: string
  showInactive?: boolean
}

export default function IgrejaSelect({
  value,
  onChange,
  disabled = false,
  className = '',
  placeholder = 'Selecione a igreja...',
  showInactive = false,
}: IgrejaSelectProps) {
  const [igrejas, setIgrejas] = useState<Igreja[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIgrejas = async () => {
      try {
        setLoading(true)
        setError(null)

        const url = showInactive ? '/api/igrejas' : '/api/igrejas?ativa=true'

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Erro ao carregar igrejas')
        }

        const data = await response.json()
        setIgrejas(data)
      } catch (err) {
        console.error('Erro ao carregar igrejas:', err)
        setError('Erro ao carregar igrejas')
      } finally {
        setLoading(false)
      }
    }

    fetchIgrejas()
  }, [showInactive])

  if (loading) {
    return (
      <select
        disabled
        className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
      >
        <option value="">Carregando igrejas...</option>
      </select>
    )
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
    >
      <option value="">{placeholder}</option>
      {igrejas.map((igreja) => (
        <option
          key={igreja.id}
          value={igreja.id}
          disabled={!igreja.ativa && !showInactive}
        >
          {igreja.nome}
          {!igreja.ativa && ' (Inativa)'}
        </option>
      ))}
    </select>
  )
}
