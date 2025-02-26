import EditUser from '@/components/crud/EditUser'

import { getUser } from '@/lib/getUser'

export default async function EditPerfil() {
  const { name, avatarUrl, login, id } = await getUser()
  return <EditUser nome={name} img={avatarUrl} email={login} id={id} />
}
