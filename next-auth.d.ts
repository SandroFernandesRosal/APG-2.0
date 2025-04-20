import { DefaultSession, User as NextAuthUser } from 'next-auth'

// Estende a tipagem do User para incluir o campo 'token'
declare module 'next-auth' {
  interface User extends NextAuthUser {
    token?: string
  }

  interface Session extends DefaultSession {
    user: User & { token?: string } // Adiciona o campo 'token' na sessão
    tokenigreja?: string // Campo 'tokenigreja' para a sessão
    userId?: string // Campo 'userId' para a sessão
  }
}
