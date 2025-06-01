import { useState, useEffect } from 'react'
import { User } from '@/data/types/user'

export function useToken(): User | null {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/login/me', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  return user
}
