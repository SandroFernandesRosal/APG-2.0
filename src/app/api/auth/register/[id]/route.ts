import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import bcrypt from 'bcrypt'
import { AuditLogger } from '@/lib/audit'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userAuth = await authMiddleware(req)
  if (!userAuth) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = paramsSchema.parse(await params)

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      login: true,
      avatarUrl: true,
      role: true,
      ministryRole: true,
      cargo: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  return NextResponse.json({ user })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userAuth = await authMiddleware(req)
  if (!userAuth) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const bodySchema = z.object({
    name: z.string(),
    avatarUrl: z.string(),
    password: z.string(),
    ministryRole: z.enum(['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA']).optional(),
    cargo: z.array(z.enum(['PASTOR', 'DIACONO', 'PRESBITERO', 'EVANGELISTA', 'MISSIONARIO', 'SECRETARIO', 'TESOUREIRO', 'PASTOR_PRESIDENTE', 'PASTOR_DIRIGENTE', 'MUSICO', 'AUXILIAR'])).optional(),
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

    // Auditoria - não interfere na resposta
    try {
      await AuditLogger.logUpdate({
        entityType: 'User',
        entityId: id,
        userId: userAuth.sub,
        userName: userAuth.name || 'Administrador',
        userRole: userAuth.role,
        oldData: userToUpdate,
        newData: user,
      })
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error)
      // Não quebra a API se a auditoria falhar
    }

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
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
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
      !(
        userAuth.role === 'ADMIN' &&
        (userToDelete.ministryRole === userAuth.ministryRole ||
          userToDelete.ministryRole === null)
      )
    ) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    await prisma.user.delete({ where: { id } })

    // Auditoria - não interfere na resposta
    try {
      await AuditLogger.logDelete({
        entityType: 'User',
        entityId: id,
        userId: userAuth.sub,
        userName: userAuth.name || 'Administrador',
        userRole: userAuth.role,
        oldData: userToDelete,
      })
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error)
      // Não quebra a API se a auditoria falhar
    }

    return NextResponse.json({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar usuário' },
      { status: 500 },
    )
  }
}
