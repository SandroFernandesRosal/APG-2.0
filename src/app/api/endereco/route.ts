import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

const bodySchema = z.object({
  local: z.string(),
  rua: z.string(),
  cep: z.string(),
  numero: z.string(),
  cidade: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Se vier ?geocode=1&q=..., faz proxy para o Nominatim
  const { searchParams } = new URL(req.url)
  if (searchParams.get('geocode') === '1') {
    const q = searchParams.get('q')
    if (!q)
      return NextResponse.json({ error: 'Missing query' }, { status: 400 })

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'SeuApp/1.0' },
    })
    const data = await res.json()
    return NextResponse.json(data)
  }

  // Caso contrário, busca endereços do banco normalmente
  const enderecos = await prisma.endereco.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(enderecos)
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { local, rua, cep, numero, cidade, isPublic } = bodySchema.parse(body)

  const endereco = await prisma.endereco.create({
    data: {
      local,
      rua,
      cep,
      numero,
      cidade,
      isPublic,
      userId: user.sub,
    },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logCreate({
      entityType: 'Endereco',
      entityId: endereco.id,
      userId: user.sub,
      userName: user.name || 'Usuário',
      userRole: user.role,
      newData: endereco,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json(endereco)
}
