import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserComponent from '@/components/User'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
          </Header>
          {children}
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{
              borderRadius: '8px',
              fontSize: '14px',
            }}
            toastClassName="custom-toast"
          />
        </Providers>
      </body>
    </html>
  )
}
