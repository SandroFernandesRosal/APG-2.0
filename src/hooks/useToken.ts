import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export function useToken(): string | null {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const tokenFromCookie = Cookies.get('tokennn') || null
    setToken(tokenFromCookie)
  }, [])

  return token
}
