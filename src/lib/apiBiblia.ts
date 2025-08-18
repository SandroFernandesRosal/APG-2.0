import axios from 'axios'

// API Bible.com (funciona garantidamente)
const apiBiblia = axios.create({
  baseURL: 'https://bible-api.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Interceptor para tratamento de erros
apiBiblia.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    if (error.response?.status === 500) {
      throw new Error(
        'Serviço temporariamente indisponível. Tente novamente em alguns minutos.',
      )
    }
    if (error.response?.status === 404) {
      throw new Error('Capítulo não encontrado.')
    }
    if (error.response?.status === 401) {
      throw new Error(
        'Chave da API inválida. Obtenha uma chave gratuita em: https://scripture.api.bible/',
      )
    }
    if (error.response?.status === 403) {
      throw new Error(
        'Acesso negado. Verifique as permissões da sua chave da API.',
      )
    }
    throw error
  },
)

export default apiBiblia
