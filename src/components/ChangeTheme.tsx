'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

interface ChangeThemeProps {
  className?: string
  onClick?: () => void
}

export default function ChangeTheme({
  className = '',
  onClick,
}: ChangeThemeProps) {
  const { theme, setTheme } = useTheme()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }

  return (
    <div
      className={`flex justify-center items-center cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {theme === 'dark' ? (
        <Sun size={32} className="text-yellow-400 hover:text-yellow-300" />
      ) : (
        <Moon size={32} className="text-slate-600 hover:text-slate-700" />
      )}
    </div>
  )
}
