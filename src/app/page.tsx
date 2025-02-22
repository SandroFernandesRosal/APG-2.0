import CarouselAgenda from '@/components/carousel-agenda'
import CarouselEndereco from '@/components/carousel-endereco'
import CarouselHighlight from '@/components/carousel-highlight'
import CarouselMinisterio from '@/components/carousel-ministerio'
import CarouselNews from '@/components/carousel-news'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col   items-center gap-5 pt-24 md:pt-[165px]">
      <CarouselHighlight />
      <CarouselNews titleproducts="Últimas noticias" />
      <CarouselAgenda titleproducts="Últimos eventos" />
      <CarouselMinisterio titleproducts="Membros" />
      <CarouselEndereco titleproducts="Endereços" />
    </main>
  )
}
