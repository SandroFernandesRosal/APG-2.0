import IgrejasHeader from '@/components/igrejas-header'
import Locais from '@/components/Locais'

export default function Igrejas() {
  return (
    <main className="mb-2 flex min-h-screen flex-col items-center w-full gap-5 pt-20 md:my-0 md:mb-4 md:mt-0 md:pt-[165px]">
      <IgrejasHeader />
      <Locais />
    </main>
  )
}
