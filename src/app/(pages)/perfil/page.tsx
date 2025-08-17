import { getUser } from '@/lib/getUser'
import Image from 'next/image'
import RemoveUser from '@/components/crud/RemoveUser'
import Link from 'next/link'
import { User } from '@/data/types/user'

export default async function Perfil() {
  const user: User | null = await getUser()

  // Debug: verificar o role do usuário
  console.log('User role:', user?.role)

  return (
    <div className="mb-2 mt-4 flex min-h-screen flex-col items-center gap-5 pt-24 md:mt-0 md:pt-[165px]">
      <div className="mb-4 flex min-h-screen w-full flex-col items-center">
        {user ? (
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Perfil de {user.name.split(' ')[0]}
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secundary mx-auto rounded-full"></div>
            </div>

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-primary/10 to-secundary/10 dark:from-primary/20 dark:to-secundary/20 p-8 text-center">
                {user.avatarUrl && (
                  <div className="relative inline-block mb-4">
                    <Image
                      src={user.avatarUrl}
                      width={150}
                      height={150}
                      alt={`Foto de perfil de ${user.name}`}
                      className="h-[150px] w-[150px] rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  </div>
                )}

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {user.login}
                </p>
                <div className="mt-3">
                  <span className="inline-block bg-primary/10 dark:bg-secundary/10 text-primary dark:text-secundary px-4 py-2 rounded-full text-sm font-medium">
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    href={'/perfil/editar'}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Editar perfil</span>
                  </Link>

                  <div className="flex items-center justify-center">
                    <div className="w-full">
                      <RemoveUser id={user.id} />
                    </div>
                  </div>
                </div>

                {user.role === 'SUPERADMIN' && (
                  <Link
                    href={'/register'}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Criar novo administrador</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Você não está logado
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Faça login ou registre-se para acessar seu perfil
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href={'/login/igreja'}
                  className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-primary to-secundary hover:from-primary/90 hover:to-secundary/90 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Fazer login</span>
                </Link>

                <Link
                  href={'/register'}
                  className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span>Registrar-se</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
