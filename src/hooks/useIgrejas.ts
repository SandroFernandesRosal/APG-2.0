'use client'

import { useState, useEffect } from 'react'

interface Igreja {
  id: string
  nome: string
  slug: string
  ativa: boolean
  endereco?: string
  descricao?: string
  tipo?: string
  // Campos de doação
  banco?: string
  conta?: string
  agencia?: string
  nomebanco?: string
  pix?: string
  nomepix?: string
  // Campos de contato
  telefone?: string
  whatsapp?: string
  facebook?: string
  youtube?: string
  instagram?: string
  createdAt: string
  updatedAt: string
}

interface UseIgrejasOptions {
  showInactive?: boolean
  autoFetch?: boolean
}

export function useIgrejas(options: UseIgrejasOptions = {}) {
  const { showInactive = false, autoFetch = true } = options

  const [igrejas, setIgrejas] = useState<Igreja[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const getIgrejaById = (id: string): Igreja | undefined => {
    return igrejas.find((igreja) => igreja.id === id)
  }

  const getIgrejaBySlug = (slug: string): Igreja | undefined => {
    return igrejas.find((igreja) => igreja.slug === slug)
  }

  const createIgreja = async (data: {
    nome: string
    slug: string
    ativa?: boolean
    endereco?: string
    descricao?: string
    tipo?: string
  }) => {
    try {
      const response = await fetch('/api/igrejas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao criar igreja')
      }

      const newIgreja = await response.json()
      setIgrejas((prev) => [...prev, newIgreja])
      return newIgreja
    } catch (err) {
      console.error('Erro ao criar igreja:', err)
      throw err
    }
  }

  const updateIgreja = async (
    id: string,
    data: Partial<{
      nome: string
      slug: string
      ativa: boolean
      endereco?: string
      descricao?: string
      tipo?: string
    }>,
  ) => {
    try {
      const response = await fetch(`/api/igrejas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao atualizar igreja')
      }

      const updatedIgreja = await response.json()
      setIgrejas((prev) =>
        prev.map((igreja) => (igreja.id === id ? updatedIgreja : igreja)),
      )
      return updatedIgreja
    } catch (err) {
      console.error('Erro ao atualizar igreja:', err)
      throw err
    }
  }

  const deleteIgreja = async (id: string) => {
    try {
      const response = await fetch(`/api/igrejas/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao desativar igreja')
      }

      const updatedIgreja = await response.json()
      setIgrejas((prev) =>
        prev.map((igreja) => (igreja.id === id ? updatedIgreja : igreja)),
      )
      return updatedIgreja
    } catch (err) {
      console.error('Erro ao desativar igreja:', err)
      throw err
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchIgrejas()
    }
  }, [showInactive, autoFetch])

  return {
    igrejas,
    loading,
    error,
    fetchIgrejas,
    getIgrejaById,
    getIgrejaBySlug,
    createIgreja,
    updateIgreja,
    deleteIgreja,
    refetch: fetchIgrejas,
  }
}
