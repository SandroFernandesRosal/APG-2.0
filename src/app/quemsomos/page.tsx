import LiderQuemSomos from '@/components/LiderQuemSomos'
import ContentQuemSomos from '@/components/ContentQuemSomos'
import { SobreLider } from '@/data/types/sobrelider'
import { Sobre } from '@/data/types/sobre'
import QuemSomosHeader from '@/components/quemsomos-header'

export default async function QuemSomos() {
  const resSobre = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sobre`)
  const dataSobre = (await resSobre.json()) as Sobre[]

  const resLider = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sobrelider`)
  const dataSobreLider = (await resLider.json()) as SobreLider[]

  const hasSobre = Array.isArray(dataSobre) && dataSobre.length > 0
  const hasLider = Array.isArray(dataSobreLider) && dataSobreLider.length > 0

  return (
    <main className="mb-2 flex min-h-screen flex-col items-center pt-20 md:mt-0 md:pt-[165px]">
      <article className="mb-5 flex w-full flex-col items-center pb-5">
        <QuemSomosHeader />

        {hasLider ? (
          <LiderQuemSomos dataSobreLider={dataSobreLider} />
        ) : (
          <p className="text-center text-lg text-gray-500">
            Nenhuma informação de liderança disponível.
          </p>
        )}

        {hasSobre ? (
          <ContentQuemSomos dataSobre={dataSobre} />
        ) : (
          <p className="text-center text-lg text-gray-500">
            Nenhuma informação sobre a igreja disponível.
          </p>
        )}
      </article>
    </main>
  )
}
