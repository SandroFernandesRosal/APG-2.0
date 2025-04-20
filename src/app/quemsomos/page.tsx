import LiderQuemSomos from '@/components/LiderQuemSomos'
import ContentQuemSomos from '@/components/ContentQuemSomos'
import { SobreLider } from '@/data/types/sobrelider'
import { Sobre } from '@/data/types/sobre'
import QuemSomosHeader from '@/components/quemsomos-header'

export default async function QuemSomos() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api'

    const [sobreResponse, liderResponse] = await Promise.all([
      fetch(`${baseUrl}/sobre`),
      fetch(`${baseUrl}/sobrelider`),
    ])

    if (!sobreResponse.ok || !liderResponse.ok) {
      throw new Error('Falha ao carregar dados')
    }

    const dataSobre: Sobre[] = await sobreResponse.json()
    const dataSobreLider: SobreLider[] = await liderResponse.json()

    return (
      <main className="mb-2 flex min-h-screen flex-col items-center pt-20 md:mt-0 md:pt-[165px]">
        <article className="mb-5 flex w-full flex-col items-center pb-5">
          <QuemSomosHeader />
          <LiderQuemSomos dataSobreLider={dataSobreLider} />
          <ContentQuemSomos dataSobre={dataSobre} />
        </article>
      </main>
    )
  } catch (error) {
    console.error('Erro ao carregar dados:', error)

    return (
      <main className="mb-2 flex min-h-screen flex-col items-center pt-20 md:mt-0 md:pt-[165px]">
        <article className="mb-5 flex w-full flex-col items-center pb-5">
          <QuemSomosHeader />
          <div className="text-red-500 p-4">
            Erro ao carregar os dados. Por favor, tente novamente mais tarde.
          </div>
        </article>
      </main>
    )
  }
}
