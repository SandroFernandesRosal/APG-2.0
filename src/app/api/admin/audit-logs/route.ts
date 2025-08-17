import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

// Tipos para as estatísticas
interface ActionStat {
  action: string
  _count: {
    action: number
  }
}

interface EntityStat {
  entityType: string
  _count: {
    entityType: number
  }
}

// Tipo para o where clause
interface WhereClause {
  action?: string
  entityType?: string
  userId?: string
  timestamp?: {
    gte?: Date
    lte?: Date
  }
  OR?: Array<{
    userName?: { contains: string; mode: 'insensitive' }
    entityType?: { contains: string; mode: 'insensitive' }
    action?: { contains: string; mode: 'insensitive' }
  }>
}

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
  const where: WhereClause = {}

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
    // Verificar se o modelo AuditLog está disponível no Prisma client
    const prismaClient = prisma as unknown as Record<string, unknown>
    const auditLogModel = prismaClient.auditLog

    if (!auditLogModel || typeof auditLogModel !== 'object') {
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

    // Cast para o tipo correto do modelo AuditLog
    const auditLog = auditLogModel as {
      findMany: (params: {
        where: WhereClause
        orderBy: { timestamp: string }
        skip: number
        take: number
        include: {
          user: {
            select: {
              id: boolean
              name: boolean
              role: boolean
              ministryRole: boolean
            }
          }
        }
      }) => Promise<unknown[]>
      count: (params: { where: WhereClause }) => Promise<number>
      groupBy: (params: {
        by: string[]
        where: WhereClause
        _count: Record<string, boolean>
      }) => Promise<ActionStat[] | EntityStat[]>
    }

    // Buscar logs e total
    const [logs, total] = await Promise.all([
      auditLog.findMany({
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
      auditLog.count({ where }),
    ])

    // Calcular estatísticas
    const stats = (await auditLog.groupBy({
      by: ['action'],
      where,
      _count: {
        action: true,
      },
    })) as ActionStat[]

    const entityStats = (await auditLog.groupBy({
      by: ['entityType'],
      where,
      _count: {
        entityType: true,
      },
    })) as EntityStat[]

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        actions: stats.reduce(
          (acc: Record<string, number>, stat: ActionStat) => {
            acc[stat.action] = stat._count.action
            return acc
          },
          {} as Record<string, number>,
        ),
        entities: entityStats.reduce(
          (acc: Record<string, number>, stat: EntityStat) => {
            acc[stat.entityType] = stat._count.entityType
            return acc
          },
          {} as Record<string, number>,
        ),
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
