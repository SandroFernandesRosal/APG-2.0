import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { randomUUID } from 'crypto'
import slugify from 'slugify'
import { AuditLogger } from '@/lib/audit'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const itemsPerPage = 12

  // Construir where clause
  const where: Record<string, unknown> = {}

  // Só filtrar por página se especificado
  if (page) {
    where.page = page
  }

  const news = await prisma.new.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: itemsPerPage,
    include: {
      igreja: true, // Incluir dados da igreja
    },
  })

  return NextResponse.json(news)
}

export async function POST(req: NextRequest) {
  try {
    console.log('Iniciando POST /api/news')

    const user = await authMiddleware(req)
    console.log('Usuário autenticado:', user ? 'sim' : 'não')

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
      console.log('Usuário não autorizado:', user?.role)
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar dados completos do usuário para auditoria
    const userData = await prisma.user.findUnique({
      where: { id: user.sub },
      select: { name: true, igrejaId: true },
    })

    const body = await req.json()
    console.log('Body recebido:', body)

    const schema = z.object({
      content: z.string(),
      coverUrl: z.string().nullable().optional(),
      videoUrl: z.string().nullable().optional(),
      title: z.string(),
      isPublic: z.coerce.boolean().default(false),
      destaque: z.coerce.boolean().default(false),
      page: z.string(),
      igrejaId: z.string().uuid(),
    })

    const data = schema.parse(body)
    console.log('Dados validados:', data)

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
      console.log('ADMIN tentando postar em igreja diferente')
      return NextResponse.json(
        { error: 'ADMIN só pode postar na sua igreja' },
        { status: 403 },
      )
    }

    const uuid = randomUUID()
    const slug = `${slugify(data.title)}-${uuid.slice(-5)}`
    console.log('Slug gerado:', slug)

    console.log('Tentando criar no banco...')
    const created = await prisma.new.create({
      data: {
        content: data.content,
        coverUrl: data.coverUrl,
        videoUrl: data.videoUrl,
        title: data.title,
        isPublic: data.isPublic,
        destaque: data.destaque,
        page: data.page,
        igrejaId: data.igrejaId,
        userId: user.sub,
        url: slug,
      },
    })
    console.log('Notícia criada com sucesso:', created.id)

    // Auditoria - não interfere na resposta
    try {
      await AuditLogger.logCreate({
        entityType: 'New',
        entityId: created.id,
        userId: user.sub,
        userName: userData?.name || 'Usuário',
        userRole: user.role,
        newData: created,
      })
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error)
      // Não quebra a API se a auditoria falhar
    }

    return NextResponse.json(created)
  } catch (error) {
    console.error('Erro completo na API /api/news:', error)
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 },
    )
  }
}
