import { api } from '@/lib/api'
import LiderQuemSomos from '@/components/LiderQuemSomos'
import ContentQuemSomos from '@/components/ContentQuemSomos'
import { SobreLider } from '@/data/types/sobrelider'
import { Sobre } from '@/data/types/sobre'
import QuemSomosHeader from '@/components/quemsomos-header'

export default async function QuemSomos() {
  const response = await api.get<Sobre[]>('/sobre')
  const dataSobre = response.data

  const responseLider = await api.get<SobreLider[]>('/sobrelider')
  const dataSobreLider = responseLider.data

  return (
    <main className="mb-2  flex min-h-screen flex-col items-center  pt-20 md:mt-0 md:pt-[165px]">
      <article className="mb-5 flex w-full flex-col items-center pb-5 ">
        <QuemSomosHeader />

        <LiderQuemSomos dataSobreLider={dataSobreLider} />
        <ContentQuemSomos dataSobre={dataSobre} />
      </article>
    </main>
  )
}
