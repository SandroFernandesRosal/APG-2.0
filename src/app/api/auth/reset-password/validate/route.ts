import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Token não fornecido' }, { status: 400 })
  }

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!resetToken || !resetToken.user) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 404 })
    }

    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Token expirado' }, { status: 400 })
    }

    return NextResponse.json({
      email: resetToken.user.login,
      valid: true,
    })
  } catch (error) {
    console.error('Erro ao validar token:', error)
    return NextResponse.json(
      { error: 'Erro ao validar token' },
      { status: 500 },
    )
  }
}
