import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

// Schema para validação
const createIgrejaSchema = z.object({
  nome: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug deve conter apenas letras minúsculas, números e hífens',
    ),
  ativa: z.boolean().default(true),
  endereco: z.string().optional(),
  descricao: z.string().optional(),
  tipo: z.string().optional(),
  // Campos de doação
  banco: z.string().optional(),
  conta: z.string().optional(),
  agencia: z.string().optional(),
  nomebanco: z.string().optional(),
  pix: z.string().optional(),
  nomepix: z.string().optional(),
})

const updateIgrejaSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(1).max(100).optional(),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug deve conter apenas letras minúsculas, números e hífens',
    )
    .optional(),
  ativa: z.boolean().optional(),
  endereco: z.string().optional(),
  descricao: z.string().optional(),
  tipo: z.string().optional(),
  // Campos de doação
  banco: z.string().optional(),
  conta: z.string().optional(),
  agencia: z.string().optional(),
  nomebanco: z.string().optional(),
  pix: z.string().optional(),
  nomepix: z.string().optional(),
})

// GET - Listar todas as igrejas
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const ativa = searchParams.get('ativa')

    const where = ativa !== null ? { ativa: ativa === 'true' } : {}

    const igrejas = await prisma.igreja.findMany({
      where,
      orderBy: { nome: 'asc' },
    })

    return NextResponse.json(igrejas)
  } catch (error) {
    console.error('Erro ao buscar igrejas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// POST - Criar nova igreja (apenas SUPERADMIN)
export async function POST(req: NextRequest) {
  try {
    const user = await authMiddleware(req)

    if (!user || user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'Apenas SUPERADMIN pode criar igrejas' },
        { status: 403 },
      )
    }

    const body = await req.json()
    const data = createIgrejaSchema.parse(body)

    // Verificar se slug já existe
    const existingIgreja = await prisma.igreja.findUnique({
      where: { slug: data.slug },
    })

    if (existingIgreja) {
      return NextResponse.json(
        { error: 'Slug da igreja já existe' },
        { status: 400 },
      )
    }

    const igreja = await prisma.igreja.create({
      data,
    })

    return NextResponse.json(igreja, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 },
      )
    }

    console.error('Erro ao criar igreja:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

// PUT - Atualizar igreja (apenas SUPERADMIN)
export async function PUT(req: NextRequest) {
  try {
    const user = await authMiddleware(req)

    if (!user || user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'Apenas SUPERADMIN pode atualizar igrejas' },
        { status: 403 },
      )
    }

    const body = await req.json()
    const { id, ...data } = updateIgrejaSchema.parse(body)

    if (!id) {
      return NextResponse.json(
        { error: 'ID da igreja é obrigatório' },
        { status: 400 },
      )
    }

    const igreja = await prisma.igreja.update({
      where: { id },
      data,
    })

    return NextResponse.json(igreja)
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
