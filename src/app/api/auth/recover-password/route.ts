import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'apg.adm.viladapenha@gmail.com',
    pass: process.env.PASSWORD_GMAIL,
  },
})

export async function POST(req: Request) {
  const userSchema = z.object({
    login: z.string().email({ message: 'Email inválido' }),
  })

  try {
    const { login } = userSchema.parse(await req.json())

    const user = await prisma.userIgreja.findUnique({
      where: { login },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'E-mail não encontrado' },
        { status: 404 },
      )
    }

    const token = uuidv4()

    await prisma.userIgreja.update({
      where: { login },
      data: {
        passwordResetToken: token,
        expires: new Date(Date.now() + 3600000), // Expira em 1 hora
      },
    })

    const mailOptions = {
      from: 'apg.adm.viladapenha@gmail.com',
      to: login,
      subject: 'Recuperação de Senha',
      text: `Para redefinir sua senha, clique no link abaixo:
      https://apg-2-0.vercel.app/reset-password/${token}
      Este link expira em 1 hora.`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: 'E-mail de recuperação enviado' })
  } catch (error) {
    console.error('Erro na rota /recover-password:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar e-mail' },
      { status: 500 },
    )
  }
}
