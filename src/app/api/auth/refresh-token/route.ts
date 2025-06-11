import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const refreshTokenSchema = z.object({
    refreshToken: z.string(),
  })

  try {
    const { refreshToken } = refreshTokenSchema.parse(await req.json())

    const refreshTokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    })

    if (!refreshTokenRecord || !refreshTokenRecord.user) {
      return NextResponse.json(
        { error: 'Refresh token inválido.' },
        { status: 401 },
      )
    }

    const user = refreshTokenRecord.user

    const newToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        login: user.login,
        role: user.role,
        ministryRole: user.ministryRole,
      },
      process.env.JWT_SECRET || 'secret',
      {
        subject: user.id.toString(),
        expiresIn: '30d',
      },
    )

    return NextResponse.json({ token: newToken })
  } catch (error) {
    console.error('Erro ao processar o refresh token:', error)
    return NextResponse.json(
      { error: 'Erro ao processar o refresh token' },
      { status: 500 },
    )
  }
}
