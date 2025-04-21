import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

import { z } from 'zod'

async function main() {
  const userSchema = z.object({
    login: z.string().email({ message: 'Email inválido' }),
    name: z.string(),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .max(10, { message: 'A senha deve ter no máximo 10 caracteres' }),
  })

  const defaultAdmin = {
    login: 'apg.adm.viladapenha@gmail.com',
    name: 'Administrador Vila da Penha',
    password: 'Apgadm#84',
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
