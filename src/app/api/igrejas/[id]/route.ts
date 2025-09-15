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
  // Campos de contato
  telefone: z.string().optional(),
  whatsapp: z.string().optional(),
  facebook: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
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

// DELETE - Deletar igreja (apenas SUPERADMIN)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await authMiddleware(req)

    if (!user || user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'Apenas SUPERADMIN pode deletar igrejas' },
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

    // Verificar se há dependências vinculadas a esta igreja
    const [
      usersCount,
      newsCount,
      ministeriosCount,
      agendasCount,
      testemunhosCount,
    ] = await Promise.all([
      prisma.user.count({ where: { igrejaId: id } }),
      prisma.new.count({ where: { igrejaId: id } }),
      prisma.ministerio.count({ where: { igrejaId: id } }),
      prisma.agenda.count({ where: { igrejaId: id } }),
      prisma.testemunho.count({ where: { igrejaId: id } }),
    ])

    const totalDependencies =
      usersCount +
      newsCount +
      ministeriosCount +
      agendasCount +
      testemunhosCount

    if (totalDependencies > 0) {
      const dependencies = []
      if (usersCount > 0) dependencies.push(`${usersCount} usuário(s)`)
      if (newsCount > 0) dependencies.push(`${newsCount} notícia(s)`)
      if (ministeriosCount > 0)
        dependencies.push(`${ministeriosCount} ministério(s)`)
      if (agendasCount > 0) dependencies.push(`${agendasCount} evento(s)`)
      if (testemunhosCount > 0)
        dependencies.push(`${testemunhosCount} testemunho(s)`)

      return NextResponse.json(
        {
          error: 'Não é possível deletar igreja com dependências vinculadas',
          details: `Esta igreja possui: ${dependencies.join(', ')}`,
        },
        { status: 400 },
      )
    }

    // Deletar igreja permanentemente
    const deletedIgreja = await prisma.igreja.delete({
      where: { id },
    })

    return NextResponse.json({
      message: 'Igreja deletada com sucesso',
      igreja: deletedIgreja,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    console.error('Erro ao deletar igreja:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
