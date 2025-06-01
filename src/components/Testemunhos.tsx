import { getUser } from '@/lib/getUser'
import TestemunhoLine from '@/components/TestemunhoLine'
import { User } from '@/data/types/user'
import TestemunhosHeader from '@/components/testemunho-header'

export default async function Testemunhos() {
  const user: User = await getUser()
  return (
    <div className="w-full">
      <TestemunhosHeader />
      <TestemunhoLine userIgreja={user} />
    </div>
  )
}
