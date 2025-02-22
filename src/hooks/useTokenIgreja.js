import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export function useTokenIgreja() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const tokenFromCookie = Cookies.get('tokenigreja')
    setToken(tokenFromCookie)
  }, [])

  return token
}
