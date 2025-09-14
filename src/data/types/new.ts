export interface New {
  id: string
  coverUrl?: string
  videoUrl?: string
  content: string
  title: string
  createdAt: string
  destaque: boolean
  page: string
  updatedAt: string
  url: string
  igrejaId: string | null // Nova estrutura
}
