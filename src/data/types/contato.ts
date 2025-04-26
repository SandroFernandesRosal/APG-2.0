export interface Contato {
  id: string
  local: string
  whatsapp: string
  instagram: string
  facebook: string
  createdAt: string
  updatedAt: string
  contatoitem: Contato | null
}
