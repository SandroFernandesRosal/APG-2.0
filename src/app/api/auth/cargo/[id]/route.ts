import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authMiddleware } from '@/lib/auth'

// Schema para validar o ID do utilizador vindo da URL
const paramsSchema = z.object({
  id: z.string().uuid(),
})

const cargoEnum = z.enum([
  'PASTOR',
  'DIACONO',
  'PRESBITERO',
  'EVANGELISTA',
  'MISSIONARIO',
  'SECRETARIO',
  'TESOUREIRO',
  'PASTOR_PRESIDENTE',
  'PASTOR_DIRIGENTE',
  'MUSICO',
  'AUXILIAR',
])

// Schema para validar o cargo enviado no corpo da requisição
const bodySchema = z.object({
  cargo: z
    .union([
      z.array(cargoEnum), // 1. Tenta validar como um array de cargos.
      cargoEnum, // 2. Tenta validar como um único cargo (string).
      z.literal(''),
      z.null(),
      z.undefined(),
    ])
    .transform((val) => {
      if (Array.isArray(val)) return val // Se já for um array, mantém-no.
      if (!val) return [] // Se for null, undefined ou '', retorna um array vazio.
      return [val] // Se for um valor único, transforma-o num array.
    }),
})

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // 1. Verifica se quem faz a requisição é um admin
    const adminUser = await authMiddleware(req)
    if (
      !adminUser ||
      (adminUser.role !== 'ADMIN' && adminUser.role !== 'SUPERADMIN')
    ) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    // 2. Valida o ID do utilizador a ser alterado e o cargo enviado
    const { id: userIdToUpdate } = paramsSchema.parse(await params)
    const body = await req.json()
    console.log('REQ BODY:', body)
    const { cargo: newCargoRole } = bodySchema.parse(body)

    // 3. Busca o utilizador que sofrerá a alteração para verificar a permissão
    const userToUpdate = await prisma.user.findUnique({
      where: { id: userIdToUpdate },
    })

    if (!userToUpdate) {
      return NextResponse.json(
        { error: 'Utilizador não encontrado' },
        { status: 404 },
      )
    }

    // 4. Lógica de Permissão Avançada
    if (
      adminUser.role === 'ADMIN' &&
      adminUser.igrejaId !== userToUpdate.igrejaId
    ) {
      return NextResponse.json(
        {
          error:
            'Não autorizado a alterar cargos de utilizadores de outra igreja.',
        },
        { status: 403 },
      )
    }

    // 5. Se todas as permissões estiverem corretas, atualiza apenas o cargo do utilizador.
    const updatedUser = await prisma.user.update({
      where: { id: userIdToUpdate },
      data: {
        cargo: newCargoRole,
      },
    })

    // Remove a propriedade 'password' do objeto antes de o retornar.
    delete (updatedUser as { password?: string }).password

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('ZOD ERROR:', error.issues)
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 },
      )
    }
    console.error('Erro ao atribuir cargo:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
