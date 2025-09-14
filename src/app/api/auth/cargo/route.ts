import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const requestingUser = await authMiddleware(req)
    if (
      !requestingUser ||
      (requestingUser.role !== 'ADMIN' && requestingUser.role !== 'SUPERADMIN')
    ) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    // Busca todos os usuários
    const users = await prisma.user.findMany({
      select: {
        id: true,
        login: true,
        name: true,
        avatarUrl: true,
        role: true,
        igrejaId: true,
        cargo: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    // SUPERADMIN vê todos, ADMIN só vê da sua igreja ou null
    const filteredUsers =
      requestingUser.role === 'SUPERADMIN'
        ? users
        : users.filter(
            (u) =>
              u.igrejaId === requestingUser.igrejaId || u.igrejaId === null,
          )

    return NextResponse.json(filteredUsers)
  } catch (error) {
    console.error('Erro ao listar utilizadores:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
