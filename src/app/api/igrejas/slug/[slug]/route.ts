import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const paramsSchema = z.object({
  slug: z.string(),
})

// GET - Buscar igreja por slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = paramsSchema.parse(await params)

    const igreja = await prisma.igreja.findUnique({
      where: { slug },
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
      return NextResponse.json({ error: 'Slug inválido' }, { status: 400 })
    }

    console.error('Erro ao buscar igreja por slug:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
