import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserComponent from '@/components/User'
import UserComponentIgreja from '@/components/UserComponentIgreja'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '300',
})

export const metadata: Metadata = {
  title: 'Igreja Alcançados pela Graça',
  description: 'Site oficial da igreja Alcançados pela Graça',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable}  antialiased`}>
        <Providers>
          <Header>
            <UserComponent />
            <UserComponentIgreja />
          </Header>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
