import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const offsetParam = searchParams.get('offset')
  const offset = offsetParam ? parseInt(offsetParam, 10) : 0
  const itemsPerPage = 12

  const ministerios = await prisma.ministerio.findMany({
    skip: offset,
    take: itemsPerPage,
    orderBy: { createdAt: 'desc' },
    include: {
      igreja: true, // Incluir dados da igreja
    },
  })

  return NextResponse.json(ministerios)
}

export async function POST(req: NextRequest) {
  try {
    const user = await authMiddleware(req)

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar dados completos do usuário
    const userData = await prisma.user.findUnique({
      where: { id: user.sub },
      select: { igrejaId: true },
    })

    const body = await req.json()

    const schema = z.object({
      name: z.string(),
      title: z.string(),
      local: z.string(),
      coverUrl: z.string(),
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

    const ministerio = await prisma.ministerio.create({
      data: {
        name: data.name,
        title: data.title,
        local: data.local,
        coverUrl: data.coverUrl,
        igrejaId: data.igrejaId,
        userId: user.sub,
      },
    })

    return NextResponse.json(ministerio, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 },
      )
    }

    console.error('Erro ao criar ministério:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
