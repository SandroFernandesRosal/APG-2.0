import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  igrejaId: z.string().uuid().nullable(),
})

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const adminUser = await authMiddleware(req)
    if (
      !adminUser ||
      (adminUser.role !== 'ADMIN' && adminUser.role !== 'SUPERADMIN')
    ) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const { id: userIdToUpdate } = paramsSchema.parse(await params)
    const body = await req.json()
    const { igrejaId: newIgrejaId } = bodySchema.parse(body)

    const userToUpdate = await prisma.user.findUnique({
      where: { id: userIdToUpdate },
    })

    if (!userToUpdate) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    if (
      adminUser.role === 'ADMIN' &&
      adminUser.igrejaId !== userToUpdate.igrejaId
    ) {
      return NextResponse.json(
        {
          error:
            'Não autorizado a alterar igrejaId de usuários de outra igreja.',
        },
        { status: 403 },
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: userIdToUpdate },
      data: {
        igrejaId: newIgrejaId,
      },
    })

    delete (updatedUser as { password?: string }).password

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
