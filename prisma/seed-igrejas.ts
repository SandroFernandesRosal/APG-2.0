import { PrismaClient } from '../src/app/generated/prisma'

const prisma = new PrismaClient()

async function seedIgrejas() {
  console.log('🌱 Iniciando seed das igrejas...')

  try {
    // Verificar se já existem igrejas
    const existingIgrejas = await prisma.igreja.count()
    if (existingIgrejas > 0) {
      console.log('✅ Igrejas já existem no banco de dados')
      return
    }

    // Criar as igrejas com a nova estrutura
    const igrejas = [
      {
        nome: 'Vila da Penha',
        slug: 'vila-da-penha',
        ativa: true,
        endereco: 'Rua da Vila da Penha, 123 - Vila da Penha',
        descricao: 'Igreja matriz da Vila da Penha',
        tipo: 'Matriz',
        banco: 'Banco do Brasil',
        conta: '12345-6',
        agencia: '1234',
        nomebanco: 'Banco do Brasil',
        pix: 'vila.penha@igreja.com',
        nomepix: 'Igreja Vila da Penha'
      },
      {
        nome: 'Tomazinho',
        slug: 'tomazinho',
        ativa: true,
        endereco: 'Rua do Tomazinho, 456 - Tomazinho',
        descricao: 'Filial do Tomazinho',
        tipo: 'Filial',
        banco: 'Caixa Econômica',
        conta: '67890-1',
        agencia: '5678',
        nomebanco: 'Caixa Econômica Federal',
        pix: 'tomazinho@igreja.com',
        nomepix: 'Igreja Tomazinho'
      },
      {
        nome: 'Vila Maria Helena',
        slug: 'vila-maria-helena',
        ativa: true,
        endereco: 'Rua Maria Helena, 789 - Vila Maria Helena',
        descricao: 'Filial da Vila Maria Helena',
        tipo: 'Filial',
        banco: 'Itaú',
        conta: '11111-2',
        agencia: '9999',
        nomebanco: 'Itaú Unibanco',
        pix: 'maria.helena@igreja.com',
        nomepix: 'Igreja Vila Maria Helena'
      }
    ]

    for (const igreja of igrejas) {
      const created = await prisma.igreja.create({
        data: igreja
      })
      console.log(`✅ Igreja criada: ${created.nome} (${created.slug})`)
    }

    console.log('🎉 Seed das igrejas concluído com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao fazer seed das igrejas:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  seedIgrejas()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export default seedIgrejas
