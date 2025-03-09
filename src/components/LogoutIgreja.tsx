'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LogoutIgreja() {
  const router = useRouter()

  function Sair() {
    Cookies.remove('tokenigreja')
    router.push('/login/igreja')

    window.location.href = '/login/igreja'
  }

  return (
    <button className="button" onClick={Sair}>
      Sair
    </button>
  )
}
