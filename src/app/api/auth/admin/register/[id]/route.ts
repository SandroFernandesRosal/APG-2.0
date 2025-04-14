import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcrypt'

interface ParamsProps {
  params: Promise<{ id: string }>
}

export async function GET(req: Request, { params }: ParamsProps) {
  try {
    const { id } = await params

    const admin = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Administrador não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(admin)
  } catch (error) {
    console.error('Erro ao buscar administrador:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar administrador' },
      { status: 500 },
    )
  }
}

export async function PUT(req: Request, { params }: ParamsProps) {
  const bodySchema = z.object({
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
  })

  try {
    const { id } = await params
    const { name, avatarUrl, password } = bodySchema.parse(await req.json())

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await prisma.user.update({
      where: { id },
      data: {
        name,
        avatarUrl,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ admin })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { error: 'Erro ao atualizar administrador' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: Request, { params }: ParamsProps) {
  try {
    const { id } = await params

    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Administrador excluído com sucesso' })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao excluir administrador' },
      { status: 500 },
    )
  }
}
