export interface User {
  id: string
  login: string
  name: string
  avatarUrl?: string
  sub?: string
  userId: string
  role: 'ADMIN' | 'MEMBRO' | 'SUPERADMIN'
  ministryRole?: 'VILADAPENHA' | 'TOMAZINHO' | 'MARIAHELENA' | null
  password?: string
  cargo?: string
}
