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

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: passwordResetToken },
      include: { user: true },
    })

    if (!resetToken || !resetToken.user || resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id: resetToken.user.id },
      data: { password: hashedPassword },
    })

    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    })

    return NextResponse.json({ message: 'Senha redefinida com sucesso' })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao redefinir senha' },
      { status: 500 },
    )
  }
}
