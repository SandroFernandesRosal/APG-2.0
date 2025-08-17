import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

export async function GET() {
  const contatos = await prisma.contato.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(contatos)
}

export async function POST(req: NextRequest) {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  const body = await req.json()

  const bodySchema = z.object({
    local: z.string(),
    whatsapp: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    isPublic: z.coerce.boolean().default(false),
  })

  const { local, whatsapp, instagram, facebook, isPublic } =
    bodySchema.parse(body)

  const contato = await prisma.contato.create({
    data: {
      local,
      whatsapp,
      instagram,
      facebook,
      isPublic,
      userId: user.sub,
    },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logCreate({
      entityType: 'Contato',
      entityId: contato.id,
      userId: user.sub,
      userName: user.name || 'Administrador',
      userRole: user.role,
      newData: contato,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json(contato)
}
