import CarouselAgenda from '@/components/carousel-agenda'
import CarouselDoacao from '@/components/carousel-doacao'
import CarouselEndereco from '@/components/carousel-endereco'

import CarouselHighlight from '@/components/carousel-highlight'
import CarouselMinisterio from '@/components/carousel-ministerio'
import CarouselNews from '@/components/carousel-news'
import Testemunhos from '@/components/Testemunhos'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col   items-center pt-20 md:pt-[80px]">
      <CarouselHighlight />
      <CarouselNews titleproducts="Últimas noticias" />
      <CarouselEndereco />
      <CarouselMinisterio titleproducts="Membros" />
      <CarouselAgenda title="Últimos eventos" />
      <CarouselDoacao />
      <Testemunhos />
    </main>
  )
}
