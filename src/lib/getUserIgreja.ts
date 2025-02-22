import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: string
  name: string
  email: string
}

export async function getUserIgreja(): Promise<User | string> {
  const cookieStore = await cookies()
  const tokenigreja = cookieStore.get('tokenigreja')?.value

  try {
    const user: User = jwtDecode(tokenigreja as string)
    return user
  } catch {
    return ''
  }
}
