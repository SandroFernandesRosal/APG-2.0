import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const resetPasswordSchema = z.object({
    passwordResetToken: z.string(),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .max(10, { message: 'A senha deve ter no máximo 10 caracteres' }),
  })

  try {
    const { passwordResetToken, password } = resetPasswordSchema.parse(
      await req.json(),
    )

    const user = await prisma.user.findFirst({
      where: { passwordResetToken },
    })

    if (!user || !user.expires || user.expires < new Date()) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        expires: null,
      },
    })

    return NextResponse.json({ message: 'Senha redefinida com sucesso' })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao redefinir senha' },
      { status: 500 },
    )
  }
}
