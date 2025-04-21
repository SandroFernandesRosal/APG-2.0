import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcrypt'

export async function GET() {
  try {
    const admins = await prisma.user.findMany()

    return NextResponse.json(admins)
  } catch (error) {
    console.error('Erro ao listar administradores:', error)
    return NextResponse.json(
      { error: 'Erro ao listar administradores' },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  const userSchema = z.object({
    login: z.string().email({ message: 'Email inválido' }),
    name: z.string(),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .max(10, { message: 'A senha deve ter no máximo 10 caracteres' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'A senha deve conter pelo menos um caractere especial',
      })
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: 'A senha deve conter pelo menos uma letra',
      }),
    avatarUrl: z.string().url(),
  })

  try {
    const { login, name, password, avatarUrl } = userSchema.parse(
      await req.json(),
    )

    const existingUser = await prisma.user.findUnique({
      where: { login },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: `Usuário ${login} já existe.` },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        login,
        name,
        avatarUrl,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao registrar usuário' },
      { status: 500 },
    )
  }
}
