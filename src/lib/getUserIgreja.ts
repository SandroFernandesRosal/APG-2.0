import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { UserIgreja } from '@/data/types/userigreja'

export async function getUserIgreja(): Promise<UserIgreja> {
  const cookieStore = await cookies()
  const tokenigreja = cookieStore.get('tokenigreja')?.value

  try {
    const user: UserIgreja = jwtDecode(tokenigreja as string)
    return user
  } catch {
    return {} as UserIgreja
  }
}
