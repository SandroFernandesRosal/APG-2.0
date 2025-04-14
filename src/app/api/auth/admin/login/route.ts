import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

async function authenticateUser(login: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      login,
    },
  })

  if (!user) {
    return false
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  return isPasswordValid ? user : false
}

export async function POST(req: Request) {
  const userSchema = z.object({
    login: z.string(),
    password: z.string(),
  })

  try {
    const { login, password } = userSchema.parse(await req.json())

    const user = await authenticateUser(login, password)

    if (!user) {
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
        name: user.name,
        avatarUrl: user.avatarUrl,
        login: user.login,
        id: user.id,
      },
      process.env.JWT_SECRET || 'secret',
      {
        subject: user.id.toString(),
        expiresIn: '30d',
      },
    )

    const response = NextResponse.json({ user, token, refreshToken })
    response.cookies.set('tokenigreja', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 dias
    })

    return response
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return NextResponse.json({ error: 'Erro na autenticação' }, { status: 500 })
  }
}
