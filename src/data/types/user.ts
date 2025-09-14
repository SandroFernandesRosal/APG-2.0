export interface User {
  id: string
  login: string
  name: string
  avatarUrl?: string
  sub?: string
  userId: string
  role: 'ADMIN' | 'MEMBRO' | 'SUPERADMIN'
  igrejaId?: string | null // Nova estrutura
  password?: string
  cargo?: string
}
