import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { authMiddleware } from '@/lib/auth'
import { CargoRole } from '@/app/generated/prisma'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = paramsSchema.parse(await params)

    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar usuário' },
      { status: 500 },
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userAuth = await authMiddleware(req)
  if (!userAuth) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

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
    ministryRole: z
      .enum(['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA'])
      .optional(),
    cargo: z.array(z.nativeEnum(CargoRole)).optional(),
  })

  try {
    const { id } = paramsSchema.parse(await params)

    const userToUpdate = await prisma.user.findUnique({ where: { id } })
    if (!userToUpdate) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    if (
      userAuth.role !== 'SUPERADMIN' &&
      userAuth.sub !== id &&
      !(
        userAuth.role === 'ADMIN' &&
        (userToUpdate.ministryRole === userAuth.ministryRole ||
          userToUpdate.ministryRole === null)
      )
    ) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const { name, avatarUrl, password, ministryRole, cargo } = bodySchema.parse(
      await req.json(),
    )

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        avatarUrl,
        password: hashedPassword,
        ministryRole: ministryRole || null,
        cargo: cargo || [],
      },
    })

    await prisma.testemunho.updateMany({
      where: { userId: id },
      data: {
        ministryRole: ministryRole || null,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userAuth = await authMiddleware(req)
  if (!userAuth) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  try {
    const { id } = paramsSchema.parse(await params)

    const userToDelete = await prisma.user.findUnique({ where: { id } })
    if (!userToDelete) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    if (
      userAuth.role !== 'SUPERADMIN' &&
      userAuth.sub !== id &&
      !(
        userAuth.role === 'ADMIN' &&
        (userToDelete.ministryRole === userAuth.ministryRole ||
          userToDelete.ministryRole === null)
      )
    ) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Usuário excluído com sucesso' })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao excluir usuário' },
      { status: 500 },
    )
  }
}
