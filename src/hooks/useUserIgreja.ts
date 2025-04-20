// /hooks/useUserIgreja.ts
import { useState, useEffect } from 'react'

type User = {
  id: string
  name: string
  login: string
  avatarUrl: string | null
}

export function useUserIgreja() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/me')
        if (!res.ok) {
          setUser(null)
          return
        }

        const data = await res.json()
        setUser(data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
