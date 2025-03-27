'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex justify-center items-center border-[1px] border-primary dark:border-white p-1 rounded-full">
      {theme === 'dark' ? (
        <Sun
          size={28}
          className="cursor-pointer text-primary dark:text-white hover:text-primary/50 dark:hover:text-yellow-500"
          onClick={() => setTheme('light')}
        />
      ) : (
        <Moon
          size={30}
          className="cursor-pointer text-primary dark:text-secundary hover:text-zinc-600"
          onClick={() => setTheme('dark')}
        />
      )}
    </div>
  )
}
