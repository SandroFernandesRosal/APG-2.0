import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const user = await authMiddleware(req)
  if (!user || user.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)

  // Parâmetros de paginação
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  // Filtros
  const action = searchParams.get('action')
  const entityType = searchParams.get('entityType')
  const userId = searchParams.get('userId')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const search = searchParams.get('search')

  // Construir where clause
  const where: any = {}

  if (action) {
    where.action = action
  }

  if (entityType) {
    where.entityType = entityType
  }

  if (userId) {
    where.userId = userId
  }

  if (startDate || endDate) {
    where.timestamp = {}
    if (startDate) {
      where.timestamp.gte = new Date(startDate)
    }
    if (endDate) {
      where.timestamp.lte = new Date(endDate)
    }
  }

  if (search) {
    where.OR = [
      { userName: { contains: search, mode: 'insensitive' } },
      { entityType: { contains: search, mode: 'insensitive' } },
      { action: { contains: search, mode: 'insensitive' } },
    ]
  }

  try {
    // Testar se o modelo AuditLog está disponível
    console.log('Prisma client:', prisma)
    console.log('AuditLog model:', (prisma as any).auditLog)

    // Se o modelo não estiver disponível, retornar dados vazios
    if (!(prisma as any).auditLog) {
      console.log('Modelo AuditLog não encontrado, retornando dados vazios')
      return NextResponse.json({
        logs: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
        stats: {
          actions: {},
          entities: {},
        },
      })
    }

    // Se estiver disponível, tentar usar
    const [logs, total] = await Promise.all([
      (prisma as any).auditLog.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        skip: offset,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true,
              ministryRole: true,
            },
          },
        },
      }),
      (prisma as any).auditLog.count({ where }),
    ])

    // Calcular estatísticas
    const stats = await (prisma as any).auditLog.groupBy({
      by: ['action'],
      where,
      _count: {
        action: true,
      },
    })

    const entityStats = await (prisma as any).auditLog.groupBy({
      by: ['entityType'],
      where,
      _count: {
        entityType: true,
      },
    })

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        actions: stats.reduce((acc, stat) => {
          acc[stat.action] = stat._count.action
          return acc
        }, {} as Record<string, number>),
        entities: entityStats.reduce((acc, stat) => {
          acc[stat.entityType] = stat._count.entityType
          return acc
        }, {} as Record<string, number>),
      },
    })
  } catch (error) {
    console.error('Erro ao buscar logs de auditoria:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
