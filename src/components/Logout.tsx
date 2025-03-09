'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  function Sair() {
    Cookies.remove('tokennn')
    router.push('/login/adm')

    window.location.href = '/login/adm'
  }

  return (
    <button className="button" onClick={Sair}>
      Sair
    </button>
  )
}
