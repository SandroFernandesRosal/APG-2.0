import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'

const bodySchema = z.object({
  content: z.string(),
  coverUrl: z.string(),
  title: z.string(),
  isPublic: z.coerce.boolean().default(false),
})

export async function GET() {
  const memories = await prisma.sobre.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(memories)
}

export async function POST(req: NextRequest) {
  const user = await authMiddleware(req)
  if (!user || user.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { content, coverUrl, isPublic, title } = bodySchema.parse(body)

  const memory = await prisma.sobre.create({
    data: {
      content,
      coverUrl,
      title,
      isPublic,
      userId: user.sub,
    },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logCreate({
      entityType: 'Sobre',
      entityId: memory.id,
      userId: user.sub,
      userName: user.name || 'Usuário',
      userRole: user.role,
      newData: memory,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json(memory)
}
