import CarouselAgenda from '@/components/carousel-agenda'
import CarouselDoacao from '@/components/carousel-doacao'
import CarouselEndereco from '@/components/carousel-endereco'
import CarouselHighlight from '@/components/carousel-highlight'
import CarouselMinisterio from '@/components/carousel-ministerio'
import CarouselNews from '@/components/carousel-news'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col   items-center gap-5 pt-20 md:pt-[100px]">
      <CarouselHighlight />
      <CarouselNews titleproducts="Últimas noticias" />
      <CarouselAgenda titleproducts="Últimos eventos" />
      <CarouselMinisterio titleproducts="Membros" />
      <CarouselEndereco titleproducts="Endereços" />
      <CarouselDoacao titleproducts="Doações" />
    </main>
  )
}
