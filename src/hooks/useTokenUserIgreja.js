import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export function useTokenUserIgreja() {
  const [decodedToken, setDecodedToken] = useState(null)

  useEffect(() => {
    const tokenFromCookie = Cookies.get('tokenigreja')

    setDecodedToken(jwtDecode(tokenFromCookie))
  }, [])

  return { decodedToken }
}
