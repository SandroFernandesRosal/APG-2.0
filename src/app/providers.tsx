'use client'

import { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
    >
      {children}
    </ThemeProvider>
  )
}
