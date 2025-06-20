import EnderecosHeader from '@/components/enderecos-header'
import Locais from '@/components/Locais'

export default function Enderecos() {
  return (
    <main className="mb-2  flex min-h-screen flex-col items-center w-full gap-5 pt-20  md:my-0 md:mb-4 md:mt-0 md:pt-[165px] ">
      <EnderecosHeader />
      <Locais />
    </main>
  )
}
