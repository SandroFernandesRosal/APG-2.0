import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'
import { AuditLogger } from '@/lib/audit'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const itemsPerPage = 12

  const agenda = await prisma.agenda.findMany({
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: itemsPerPage,
    include: {
      igreja: true, // Incluir dados da igreja
    },
  })

  return NextResponse.json(agenda)
}

export async function POST(req: NextRequest) {
  const user = await authMiddleware(req)
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  // Buscar dados completos do usuário para auditoria
  const userData = await prisma.user.findUnique({
    where: { id: user.sub },
    select: { name: true, igrejaId: true },
  })

  const body = await req.json()

  const schema = z.object({
    name: z.string(),
    day: z.string(),
    hour: z.string(),
    isPublic: z.boolean().optional(),
    destaque: z.boolean().optional(),
    igrejaId: z.string().uuid(),
  })

  const data = schema.parse(body)

  // Verificar se igreja existe
  const igreja = await prisma.igreja.findUnique({
    where: { id: data.igrejaId },
  })

  if (!igreja) {
    return NextResponse.json(
      { error: 'Igreja não encontrada' },
      { status: 400 },
    )
  }

  // Verificar se ADMIN pode postar nesta igreja
  if (user.role === 'ADMIN' && userData?.igrejaId !== data.igrejaId) {
    return NextResponse.json(
      { error: 'ADMIN só pode postar na sua igreja' },
      { status: 403 },
    )
  }

  const agenda = await prisma.agenda.create({
    data: {
      name: data.name,
      day: data.day,
      hour: data.hour,
      isPublic: Boolean(data.isPublic),
      destaque: Boolean(data.destaque),
      igrejaId: data.igrejaId,
      userId: user.sub,
    },
  })

  // Auditoria - não interfere na resposta
  try {
    await AuditLogger.logCreate({
      entityType: 'Agenda',
      entityId: agenda.id,
      userId: user.sub,
      userName: userData?.name || 'Usuário',
      userRole: user.role,
      newData: agenda,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
    // Não quebra a API se a auditoria falhar
  }

  return NextResponse.json(agenda)
}
