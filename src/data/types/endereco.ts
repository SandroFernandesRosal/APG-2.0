export interface Endereco {
  id: string
  local: string
  rua: string
  cep: string
  numero: string
  cidade: string
  createdAt: string
  updatedAt: string
  role: 'VILADAPENHA' | 'MARIAHELENA' | 'TOMAZINHO'
}
