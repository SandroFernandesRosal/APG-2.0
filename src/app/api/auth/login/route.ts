import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  const userSchema = z.object({
    login: z.string(),
    password: z.string(),
  })

  try {
    const { login, password } = userSchema.parse(await req.json())

    const user = await prisma.user.findUnique({
      where: { login },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 },
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 },
      )
    }

    const refreshToken = uuidv4()

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    })

    const token = jwt.sign(
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

    const response = NextResponse.json({ user, token, refreshToken })
    response.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 dias
    })

    return response
  } catch {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
