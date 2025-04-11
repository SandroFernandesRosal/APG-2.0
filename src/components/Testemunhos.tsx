import { getUserIgreja } from '@/lib/getUserIgreja'
import TestemunhoLine from '@/components/TestemunhoLine'
import { UserIgreja } from '@/data/types/userigreja'
import TestemunhosHeader from '@/components/testemunho-header'

export default async function Testemunhos() {
  const userIgreja: UserIgreja = await getUserIgreja()
  return (
    <div className="w-full">
      <TestemunhosHeader />
      <TestemunhoLine userIgreja={userIgreja} />
    </div>
  )
}
