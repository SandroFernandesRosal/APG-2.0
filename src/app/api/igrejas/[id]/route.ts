import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const updateIgrejaSchema = z.object({
  nome: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(100).optional(),
  ativa: z.boolean().optional(),
  endereco: z.string().optional(),
  descricao: z.string().optional(),
  tipo: z.string().optional(),
  banco: z.string().optional(),
  conta: z.string().optional(),
  agencia: z.string().optional(),
  nomebanco: z.string().optional(),
  pix: z.string().optional(),
  nomepix: z.string().optional(),
})

// GET - Buscar igreja por ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = paramsSchema.parse(await params)

    const igreja = await prisma.igreja.findUnique({
      where: { id },
    })

    if (!igreja) {
      return NextResponse.json(
        { error: 'Igreja não encontrada' },
        { status: 404 },
      )
    }

    return NextResponse.json(igreja)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    console.error('Erro ao buscar igreja:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// PUT - Atualizar igreja (apenas SUPERADMIN)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await authMiddleware(req)

    if (!user || user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'Apenas SUPERADMIN pode atualizar igrejas' },
        { status: 403 },
      )
    }

    const { id } = paramsSchema.parse(await params)
    const body = await req.json()
    const data = updateIgrejaSchema.parse(body)

    // Verificar se igreja existe
    const existingIgreja = await prisma.igreja.findUnique({
      where: { id },
    })

    if (!existingIgreja) {
      return NextResponse.json(
        { error: 'Igreja não encontrada' },
        { status: 404 },
      )
    }

    // Se está atualizando o slug, verificar se não existe outro com o mesmo slug
    if (data.slug && data.slug !== existingIgreja.slug) {
      const slugExists = await prisma.igreja.findUnique({
        where: { slug: data.slug },
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Slug da igreja já existe' },
          { status: 400 },
        )
      }
    }

    const updatedIgreja = await prisma.igreja.update({
      where: { id },
      data,
    })

    return NextResponse.json(updatedIgreja)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 },
      )
    }

    console.error('Erro ao atualizar igreja:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// DELETE - Desativar igreja (apenas SUPERADMIN)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await authMiddleware(req)

    if (!user || user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'Apenas SUPERADMIN pode desativar igrejas' },
        { status: 403 },
      )
    }

    const { id } = paramsSchema.parse(await params)

    // Verificar se igreja existe
    const existingIgreja = await prisma.igreja.findUnique({
      where: { id },
    })

    if (!existingIgreja) {
      return NextResponse.json(
        { error: 'Igreja não encontrada' },
        { status: 404 },
      )
    }

    // Verificar se há usuários vinculados a esta igreja
    const usersCount = await prisma.user.count({
      where: { igrejaId: id },
    })

    if (usersCount > 0) {
      return NextResponse.json(
        { error: 'Não é possível desativar igreja com usuários vinculados' },
        { status: 400 },
      )
    }

    // Desativar igreja (soft delete)
    const updatedIgreja = await prisma.igreja.update({
      where: { id },
      data: { ativa: false },
    })

    return NextResponse.json(updatedIgreja)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    console.error('Erro ao desativar igreja:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
