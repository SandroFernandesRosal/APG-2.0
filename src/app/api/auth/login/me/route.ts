import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('tokenigreja')?.value

  if (!token) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      id: string
    }

    const user = await prisma.userIgreja.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        login: true,
        avatarUrl: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }
}
