import { useState, useEffect } from 'react'

export function useIgrejaName(igrejaId: string | null) {
  const [igrejaName, setIgrejaName] = useState<string>('')

  useEffect(() => {
    if (!igrejaId) {
      setIgrejaName('')
      return
    }

    const fetchIgrejaName = async () => {
      try {
        const response = await fetch(`/api/igrejas/${igrejaId}`)
        if (response.ok) {
          const igreja = await response.json()
          setIgrejaName(igreja.nome)
        } else {
          setIgrejaName('Igreja não encontrada')
        }
      } catch (error) {
        console.error('Erro ao buscar nome da igreja:', error)
        setIgrejaName('Erro ao carregar')
      }
    }

    fetchIgrejaName()
  }, [igrejaId])

  return igrejaName
}
