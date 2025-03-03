import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { UserIgreja } from '@/data/types/userigreja'

export function useTokenUserIgreja() {
  const [decodedToken, setDecodedToken] = useState<UserIgreja | null>(null)

  useEffect(() => {
    const tokenFromCookie = Cookies.get('tokenigreja')

    if (tokenFromCookie) {
      setDecodedToken(jwtDecode<UserIgreja>(tokenFromCookie))
    }
  }, [])

  return { decodedToken }
}
