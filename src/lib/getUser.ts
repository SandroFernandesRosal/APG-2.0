import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: string
  name: string
  email: string
}

export async function getUser(): Promise<User | string> {
  const cookieStore = await cookies()
  const token = cookieStore.get('tokennn')?.value

  try {
    const user: User = jwtDecode(token as string)
    return user
  } catch {
    return ''
  }
}
