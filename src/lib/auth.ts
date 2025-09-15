import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

// Função para buscar token do header Authorization
function getTokenFromHeader(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7) // Remove "Bearer " prefix
  }
  return null
}

// Função para buscar token do sistema de credentials
function getTokenFromCredentials(req: NextRequest): string | null {
  // Buscar token do cookie atual do sistema
  return req.cookies.get('tokennn')?.value || null
}

// Função para validar token JWT
function validateJWT(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    return decoded as {
      role: string
      sub: string
      id?: string
      igrejaId?: string | null
      [key: string]: unknown
    }
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error)
    return null
  }
}

// Função para buscar dados do usuário via API /me
async function getUserFromAPI(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/login/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Erro ao buscar dados do usuário via API:', error)
  }
  return null
}

export async function authMiddleware(req: NextRequest) {
  // 1. Tentar buscar token do header Authorization (preferido)
  let token = getTokenFromHeader(req)

  // 2. Se não encontrar, tentar do sistema de credentials (fallback)
  if (!token) {
    token = getTokenFromCredentials(req)
  }

  if (!token) return null

  // 3. Validar JWT localmente primeiro (mais rápido)
  const decoded = validateJWT(token)

  if (decoded) {
    // Mapear corretamente os campos do token
    return {
      role: decoded.role,
      sub: decoded.sub || decoded.id,
      igrejaId: decoded.igrejaId,
    }
  }

  // 4. Se JWT inválido, tentar buscar via API /me (para tokens externos)
  const userData = await getUserFromAPI(token)
  if (userData) {
    return {
      role: userData.role,
      sub: userData.id,
      igrejaId: userData.igrejaId,
    }
  }

  return null
}
