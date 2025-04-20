import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout realizado com sucesso',
      },
      { status: 200 },
    )

    response.cookies.set('tokennn', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0),
    })

    return response
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erro no servidor' },
      { status: 500 },
    )
  }
}
