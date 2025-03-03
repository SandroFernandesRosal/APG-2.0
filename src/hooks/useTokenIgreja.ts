import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export function useTokenIgreja(): string | null {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const tokenFromCookie = Cookies.get('tokenigreja') || null
    setToken(tokenFromCookie)
  }, [])

  return token
}
