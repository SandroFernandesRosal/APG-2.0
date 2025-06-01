import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

import { z } from 'zod'
const PlaceHolder =
  'https://drive.google.com/uc?export=view&id=1hYXAUQfIieWGK0P9VCW8bpCgnamvnB1C'

const senha = process.env.NEXT_PUBLIC_PASSWORD_ADMIN || ''

async function main() {
  const userSchema = z.object({
    login: z.string().email({ message: 'Email inválido' }),
    name: z.string(),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .max(10, { message: 'A senha deve ter no máximo 10 caracteres' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'A senha deve conter pelo menos um caractere especial',
      })
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: 'A senha deve conter pelo menos uma letra',
      }),
    avatarUrl: z.string().url(),
      role: z.enum(['ADMIN', 'MEMBRO']),
  })

  const defaultAdmin = {
    login: 'apg.adm.viladapenha@gmail.com',
    name: 'Administrador Vila da Penha',
    password: senha,
    avatarUrl: PlaceHolder,
    
  }

  try {
    userSchema.parse(defaultAdmin)

    const existingAdmin = await prisma.user.findUnique({
      where: { login: defaultAdmin.login },
    })

    if (existingAdmin) {
      console.log(`${defaultAdmin.login} já existe.`)
      return
    }

    const hashedPassword = await bcrypt.hash(defaultAdmin.password, 10)

    await prisma.user.create({
      data: {
        login: defaultAdmin.login,
        name: defaultAdmin.name,
        password: hashedPassword,
        avatarUrl: defaultAdmin.avatarUrl,
        role: "ADMIN",
      },
    })

    console.log('✅ Admin criado com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
