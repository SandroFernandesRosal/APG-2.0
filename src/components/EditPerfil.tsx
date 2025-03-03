import EditUserIgreja from '@/components/crud/EditUserIgreja'
import { getUserIgreja } from '@/lib/getUserIgreja'
import { UserIgreja } from '@/data/types/userigreja'

export default async function EditPerfil() {
  const user: UserIgreja | null = await getUserIgreja()

  if (!user) {
    return <div>Usuário não encontrado</div>
  }

  const { name, avatarUrl, login, id } = user
  return <EditUserIgreja nome={name} img={avatarUrl} email={login} id={id} />
}
