import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const users = await prisma.user.findMany()

    return NextResponse.json(users)
  } catch (error) {
    console.error('Erro ao listar usuários:', error)
    return NextResponse.json(
      { error: 'Erro ao listar usuários' },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  const userSchema = z
    .object({
      login: z.string().email({ message: 'Email inválido' }),
      name: z.string(),
      avatarUrl: z.string().url(),
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
      role: z.enum(['SUPERADMIN', 'ADMIN', 'MEMBRO']).optional(),
      ministryRole: z
        .enum(['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA'])
        .optional(),
    })
    .refine(
      (data) => {
        if (data.role === 'ADMIN') return !!data.ministryRole
        if (data.role === 'SUPERADMIN') return !data.ministryRole
        return true
      },
      {
        message:
          'ADMIN precisa de ministryRole e SUPERADMIN não pode ter ministryRole',
        path: ['ministryRole'],
      },
    )

  try {
    const { login, name, avatarUrl, password, role, ministryRole } =
      userSchema.parse(await req.json())

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
    const refreshToken = uuidv4()

    const user = await prisma.user.create({
      data: {
        login,
        name,
        avatarUrl,
        password: hashedPassword,
        role: role || 'MEMBRO',
        cargo: [],
        ministryRole: ministryRole || null,
      },
    })

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    })

    return NextResponse.json({ user, refreshToken })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      )
    }
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
