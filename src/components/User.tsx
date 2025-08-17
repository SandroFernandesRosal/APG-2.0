'use client'

import { useEffect, useState } from 'react'
import ItemUser from './item-user'
import { User } from '@/data/types/user'
import Image from 'next/image'

import { FaSpinner, FaUserCircle } from 'react-icons/fa'

interface UserComponentProps {
  isOpen?: boolean
  onToggle?: () => void
  onLoadingChange?: (loading: boolean) => void
  onRoleChange?: (role: string) => void
}

export default function UserComponent({
  isOpen,
  onToggle,
  onLoadingChange,
  onRoleChange,
}: UserComponentProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/login/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          onRoleChange?.(data.user.role)
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [onRoleChange])

  // Notificar o Header sobre mudanças no estado de loading
  useEffect(() => {
    onLoadingChange?.(loading)
  }, [loading, onLoadingChange])

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-4">
        {/* Loading spinner for desktop */}
        <div className="hidden md:flex">
          <div className="flex items-center gap-1">
            <div className="p-[2px] mr-1 w-[40px] h-[40px] rounded-full border-[1px] border-primary dark:border-secundary flex items-center justify-center">
              <FaSpinner className="w-5 h-5 text-primary dark:text-secundary animate-spin" />
            </div>
          </div>
        </div>

        {/* Loading spinner for mobile */}
        <div className="flex flex-col items-center gap-3 md:hidden w-full">
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-sm">
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-2 border-primary dark:border-secundary shadow-md flex items-center justify-center">
                <FaSpinner className="w-8 h-8 text-primary dark:text-secundary animate-spin" />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-20"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-4">
        <ItemUser name="" isOpen={isOpen} onToggle={onToggle} />

        {/* Mobile Layout - Enhanced */}
        <div className="flex flex-col items-center gap-3 md:hidden w-full">
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-sm">
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-2 border-primary dark:border-secundary shadow-md flex items-center justify-center">
                <FaUserCircle className="w-12 h-12 text-primary dark:text-secundary" />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Visitante
              </p>
              <span className="text-sm font-medium text-primary dark:text-secundary bg-primary/10 dark:bg-secundary/10 px-2 py-1 rounded-full inline-block w-fit">
                Não autenticado
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { name, avatarUrl, role } = user

  return (
    <>
      {user && (
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-4">
          <ItemUser
            name={name}
            avatarUrl={avatarUrl}
            role={role}
            isOpen={isOpen}
            onToggle={onToggle}
          />

          {/* Mobile Layout - Enhanced */}
          <div className="flex flex-col items-center gap-3 md:hidden w-full">
            <div className="flex items-center gap-3 p-4 w-full">
              {avatarUrl && (
                <div className="relative">
                  <Image
                    src={avatarUrl}
                    alt={`imagem de perfil de ${name}`}
                    width={60}
                    height={60}
                    className="w-15 h-15 rounded-full border-2 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              )}

              <div className="flex flex-col">
                <p className="text-lg font-bold text-textlight dark:text-textdark">
                  {name}
                </p>
                <span className="text-sm  text-primary dark:text-secundary bg-primary/10 dark:bg-secundary/10 px-2 py-1 rounded-full inline-block w-fit font-bold">
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
