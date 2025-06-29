import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'
import { CargoRole } from '@/app/generated/prisma'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  cargo: z
    .union([
      z.array(z.nativeEnum(CargoRole)), // Aceita um array de cargos
      z.nativeEnum(CargoRole), // Aceita um único cargo
      z.literal(''),
      z.null(),
      z.undefined(),
    ])
    .transform((val) => {
      if (Array.isArray(val)) return val // Se já for um array, ótimo.
      if (!val) return [] // Se for null, undefined ou '', transforma num array vazio.
      return [val] // Se for um valor único, envolve-o num array.
    }),
  ministryRole: z
    .union([
      z.enum(['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA']),
      z.literal(''),
      z.null(),
      z.undefined(),
    ])
    .transform((val) => (val === '' || val === undefined ? null : val)),
})

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = paramsSchema.parse(await params)

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        cargo: true,
        ministryRole: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(user)
  } catch {
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
  try {
    const userAuth = await authMiddleware(req)
    if (
      !userAuth ||
      (userAuth.role !== 'ADMIN' && userAuth.role !== 'SUPERADMIN')
    ) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = paramsSchema.parse(await params)
    const body = await req.json()
    const { cargo, ministryRole } = bodySchema.parse(body)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        cargo,
        ministryRole,
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        cargo: true,
        ministryRole: true,
      },
    })

    return NextResponse.json({
      message: 'Cargo e igreja atualizados com sucesso.',
      user: updatedUser,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 },
      )
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2025'
    ) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
