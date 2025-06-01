import EditUser from '@/components/crud/EditUser'
import { getUser } from '@/lib/getUser'
import { User } from '@/data/types/user'

export default async function EditPerfil() {
  const user: User | null = await getUser()

  if (!user) {
    return <div>Usuário não encontrado</div>
  }

  const { name, avatarUrl, login, id } = user
  return <EditUser nome={name} img={avatarUrl} email={login} id={id} />
}
