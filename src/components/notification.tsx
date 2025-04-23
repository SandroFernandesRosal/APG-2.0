'use client'

import { useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa'
import Link from 'next/link'

export interface testemunhoProps {
  id: string
  name: string
  content: string
  avatarUrl: string
  coverUrl: string
  createdAt: string
  isPublic: boolean
}

export const Notification = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const authRes = await fetch('/api/auth/admin/login/me', {
          credentials: 'include',
        })

        if (!authRes.ok) return

        setIsAuthenticated(true)

        const testemunhosRes = await fetch('/api/auth/admin/testemunho', {
          credentials: 'include',
        })

        if (!testemunhosRes.ok) return

        const testemunhos = await testemunhosRes.json()

        const notPublic = testemunhos.filter(
          (t: testemunhoProps) => t.isPublic === false,
        )
        setPendingCount(notPublic.length)
      } catch (error) {
        console.error('Erro ao buscar notificações:', error)
      }
    }

    fetchNotifications()
  }, [])

  if (!isAuthenticated) return null

  return (
    <Link href="/perfil/adm/testemunhos" className="relative">
      <FaBell className="text-2xl text-zinc-500 hover:text-blue-600 transition-colors" />
      {pendingCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary dark:bg-secundary text-black text-xs font-bold rounded-full w-[20px] h-[20px] flex items-center justify-center">
          {pendingCount}
        </span>
      )}
    </Link>
  )
}
