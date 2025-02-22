import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export function useToken() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const tokenFromCookie = Cookies.get('tokennn')
    setToken(tokenFromCookie)
  }, [])

  return token
}
