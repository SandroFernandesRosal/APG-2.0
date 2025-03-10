'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex justify-center items-center border-[1px] border-zinc-400 dark:border-zinc-700 p-1 rounded-full">
      {theme === 'dark' ? (
        <Sun
          className="cursor-pointer hover:text-primary dark:hover:text-secundary"
          onClick={() => setTheme('light')}
        />
      ) : (
        <Moon
          className="cursor-pointer hover:text-primary dark:hover:text-secundary"
          onClick={() => setTheme('dark')}
        />
      )}
    </div>
  )
}
