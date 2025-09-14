import { PrismaClient } from '../src/app/generated/prisma'

const prisma = new PrismaClient()

async function migrateData() {
  console.log('🔄 Iniciando migração dos dados...')

  try {
    // 1. Migrar usuários
    console.log('📝 Migrando usuários...')
    const users = await prisma.user.findMany()

    for (const user of users) {
      // Migrar apenas usuários que ainda não têm igrejaId
      if (!user.igrejaId) {
        // Pular usuários sem igreja definida
        console.log(`⏭️ Usuário ${user.login} sem igreja definida - pulando`)
        continue
      }
    }

    // 2. Migrar notícias
    console.log('📰 Migrando notícias...')
    const news = await prisma.new.findMany()

    for (const newItem of news) {
      // Migrar apenas notícias que ainda não têm igrejaId
      if (!newItem.igrejaId) {
        // Pular notícias sem igreja definida
        console.log(`⏭️ Notícia "${newItem.title}" sem igreja definida - pulando`)
        continue
      }
    }

    // 3. Migrar ministérios
    console.log('⛪ Migrando ministérios...')
    const ministerios = await prisma.ministerio.findMany()

    for (const ministerio of ministerios) {
      // Migrar apenas ministérios que ainda não têm igrejaId
      if (!ministerio.igrejaId) {
        // Pular ministérios sem igreja definida
        console.log(`⏭️ Ministério "${ministerio.name}" sem igreja definida - pulando`)
        continue
      }
    }

    // 4. Migrar agenda
    console.log('📅 Migrando agenda...')
    const agendas = await prisma.agenda.findMany()

    for (const agenda of agendas) {
      // Migrar apenas eventos que ainda não têm igrejaId
      if (!agenda.igrejaId) {
        // Pular eventos sem igreja definida
        console.log(`⏭️ Evento "${agenda.name}" sem igreja definida - pulando`)
        continue
      }
    }

    // 5. Migrar testemunhos
    console.log('🙏 Migrando testemunhos...')
    const testemunhos = await prisma.testemunho.findMany()

    for (const testemunho of testemunhos) {
      // Migrar apenas testemunhos que ainda não têm igrejaId
      if (!testemunho.igrejaId) {
        // Pular testemunhos sem igreja definida
        console.log(`⏭️ Testemunho de "${testemunho.name}" sem igreja definida - pulando`)
        continue
      }
    }

    console.log('🎉 Migração concluída com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante a migração:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  migrateData()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export default migrateData
