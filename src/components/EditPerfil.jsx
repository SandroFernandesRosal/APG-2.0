import EditUserIgreja from '@/components/crud/EditUserIgreja'

import { getUserIgreja } from '@/lib/getUserIgreja'

export default async function EditPerfil() {
  const { name, avatarUrl, login, id } = getUserIgreja()
  return <EditUserIgreja nome={name} img={avatarUrl} email={login} id={id} />
}
