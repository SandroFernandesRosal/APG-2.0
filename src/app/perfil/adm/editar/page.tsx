import EditUser from '@/components/crud/EditUser'
import { User } from '@/data/types/user'
import { getUser } from '@/lib/getUser'

export default async function EditPerfilAdm() {
  const user: User | null = await getUser()

  if (!user) {
    return <div>Usuário não encontrado</div>
  }

  const { name, avatarUrl, login, id } = user
  return <EditUser nome={name} img={avatarUrl} email={login} id={id} />
}
