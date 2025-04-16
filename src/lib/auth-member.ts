import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export async function authMiddlewareMember(req: NextRequest) {
  const token = req.cookies.get('tokenigreja')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    return decoded as { sub: string }
  } catch {
    return null
  }
}
