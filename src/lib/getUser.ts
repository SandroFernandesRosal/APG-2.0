import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { User } from '@/data/types/user'

export async function getUser(): Promise<User> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  try {
    const user: User = jwtDecode(token as string)
    return user
  } catch {
    return null as unknown as User
  }
}
