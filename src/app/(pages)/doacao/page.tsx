import DoacaoHeader from '@/components/doacao-header'
import Doe from '../../../components/Doe'

export default function Doacao() {
  return (
    <main className="mb-2  flex  min-h-screen flex-col items-center  gap-5 pt-20 md:mt-0 md:pt-[165px]">
      <DoacaoHeader />
      <Doe />
    </main>
  )
}
