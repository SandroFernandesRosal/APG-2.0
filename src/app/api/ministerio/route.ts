import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const offsetParam = searchParams.get('offset')
  const offset = offsetParam ? parseInt(offsetParam, 10) : 0
  const itemsPerPage = 12

  const users = await prisma.user.findMany({
    skip: offset,
    take: itemsPerPage,
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      cargo: true,
      ministryRole: true,
    },
  })

  return NextResponse.json(users)
}
