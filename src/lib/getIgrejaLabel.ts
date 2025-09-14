// Função dinâmica que busca do banco de dados por slug
export async function getIgrejaLabel(slug: string): Promise<string> {
  try {
    const response = await fetch(`/api/igrejas/slug/${slug}`)
    if (response.ok) {
      const igreja = await response.json()
      return igreja.nome
    }
  } catch (error) {
    console.error('Erro ao buscar nome da igreja por slug:', error)
  }
  return slug // Fallback para o slug se não encontrar
}

// Função que busca do banco de dados por ID
export async function getIgrejaLabelFromId(igrejaId: string): Promise<string> {
  try {
    const response = await fetch(`/api/igrejas/${igrejaId}`)
    if (response.ok) {
      const igreja = await response.json()
      return igreja.nome
    }
  } catch (error) {
    console.error('Erro ao buscar nome da igreja por ID:', error)
  }
  return 'Igreja não encontrada'
}

// Função para buscar igreja completa por slug
export async function getIgrejaBySlug(slug: string) {
  try {
    const response = await fetch(`/api/igrejas/slug/${slug}`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Erro ao buscar igreja por slug:', error)
  }
  return null
}

// Função para buscar igreja completa por ID
export async function getIgrejaById(igrejaId: string) {
  try {
    const response = await fetch(`/api/igrejas/${igrejaId}`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Erro ao buscar igreja por ID:', error)
  }
  return null
}
