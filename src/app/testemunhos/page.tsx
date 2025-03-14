import { getUserIgreja } from '@/lib/getUserIgreja'
import TestemunhoLine from '@/components/TestemunhoLine'
import { UserIgreja } from '@/data/types/userigreja'

export default async function Testemunhos() {
  const userIgreja: UserIgreja = await getUserIgreja()

  return (
    <main className="mb-2 mt-4 flex min-h-screen flex-col items-center gap-5 pt-24 md:mt-0 md:pt-[165px]">
      <TestemunhoLine userIgreja={userIgreja} />
    </main>
  )
}
