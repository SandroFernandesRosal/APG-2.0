'use client'
import { useEffect, useState, useMemo } from 'react'
import { useToken } from '@/hooks/useToken'
import Image from 'next/image'
import {
  FaEdit,
  FaUsers,
  FaUserTie,
  FaUserShield,
  FaFilter,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useIgrejas } from '@/hooks/useIgrejas'

type User = {
  id: string
  name: string
  login: string
  avatarUrl: string
  role: 'ADMIN' | 'SUPERADMIN' | 'MEMBRO'
  igrejaId: string | null
  cargo?: string[]
}

const cargos = [
  'PASTOR',
  'DIACONO',
  'PRESBITERO',
  'EVANGELISTA',
  'MISSIONARIO',
  'SECRETARIO',
  'TESOUREIRO',
  'PASTOR_PRESIDENTE',
  'PASTOR_DIRIGENTE',
  'MUSICO',
  'AUXILIAR',
]

// Removido: sistema antigo de igrejas fixas
// Agora usa sistema dinâmico via API

const funcoes = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'MEMBRO', label: 'Membro' },
]

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [igrejaNames, setIgrejaNames] = useState<Record<string, string>>({})
  const token = useToken()
  const { igrejas } = useIgrejas()

  // Estados para filtros
  const [filterIgreja, setFilterIgreja] = useState<string>('')
  const [filterCargo, setFilterCargo] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [cargo, setCargo] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estados para igreja
  const [showIgrejaModal, setShowIgrejaModal] = useState(false)
  const [igreja, setIgreja] = useState<string>('')

  // Estados para função (role)
  const [showFuncaoModal, setShowFuncaoModal] = useState(false)
  const [funcao, setFuncao] = useState<'ADMIN' | 'MEMBRO'>('MEMBRO')

  // Calcular estatísticas
  const stats = {
    total: users.filter((u) => {
      if (token?.role === 'SUPERADMIN') return u.role !== 'SUPERADMIN'
      if (token?.role === 'ADMIN')
        return u.role !== 'SUPERADMIN' && u.igrejaId === token.igrejaId
      return false
    }).length,
    pastores: users.filter((u) => {
      if (token?.role === 'SUPERADMIN') {
        return (
          u.role !== 'SUPERADMIN' &&
          u.cargo &&
          u.cargo.some((c) => c.includes('PASTOR'))
        )
      }
      if (token?.role === 'ADMIN') {
        return (
          u.role !== 'SUPERADMIN' &&
          u.igrejaId === token.igrejaId &&
          u.cargo &&
          u.cargo.some((c) => c.includes('PASTOR'))
        )
      }
      return false
    }).length,
    diaconos: users.filter((u) => {
      if (token?.role === 'SUPERADMIN') {
        return u.role !== 'SUPERADMIN' && u.cargo && u.cargo.includes('DIACONO')
      }
      if (token?.role === 'ADMIN') {
        return (
          u.role !== 'SUPERADMIN' &&
          u.igrejaId === token.igrejaId &&
          u.cargo &&
          u.cargo.includes('DIACONO')
        )
      }
      return false
    }).length,
    membros: users.filter((u) => {
      if (token?.role === 'SUPERADMIN') {
        return u.role !== 'SUPERADMIN' && u.role === 'MEMBRO'
      }
      if (token?.role === 'ADMIN') {
        return (
          u.role !== 'SUPERADMIN' &&
          u.igrejaId === token.igrejaId &&
          u.role === 'MEMBRO'
        )
      }
      return false
    }).length,
    admins: users.filter((u) => {
      if (token?.role === 'SUPERADMIN') return u.role === 'ADMIN'
      if (token?.role === 'ADMIN')
        return u.role === 'ADMIN' && u.igrejaId === token.igrejaId
      return false
    }).length,
    semIgreja: users.filter((u) => {
      if (token?.role === 'SUPERADMIN') {
        return u.role !== 'SUPERADMIN' && !u.igrejaId
      }
      if (token?.role === 'ADMIN') {
        return (
          u.role !== 'SUPERADMIN' &&
          u.igrejaId === token.igrejaId &&
          !u.igrejaId
        )
      }
      return false
    }).length,
    semCargo: users.filter((u) => {
      if (token?.role === 'SUPERADMIN') {
        return u.role !== 'SUPERADMIN' && (!u.cargo || u.cargo.length === 0)
      }
      if (token?.role === 'ADMIN') {
        return (
          u.role !== 'SUPERADMIN' &&
          u.igrejaId === token.igrejaId &&
          (!u.cargo || u.cargo.length === 0)
        )
      }
      return false
    }).length,
    outrosCargos: users.filter((u) => {
      if (token?.role === 'SUPERADMIN') {
        return (
          u.role !== 'SUPERADMIN' &&
          u.cargo &&
          u.cargo.length > 0 &&
          !u.cargo.some((c) => c.includes('PASTOR')) &&
          !u.cargo.includes('DIACONO')
        )
      }
      if (token?.role === 'ADMIN') {
        return (
          u.role !== 'SUPERADMIN' &&
          u.igrejaId === token.igrejaId &&
          u.cargo &&
          u.cargo.length > 0 &&
          !u.cargo.some((c) => c.includes('PASTOR')) &&
          !u.cargo.includes('DIACONO')
        )
      }
      return false
    }).length,
    presbiteros: users.filter((u) => {
      if (token?.role === 'SUPERADMIN') {
        return (
          u.role !== 'SUPERADMIN' && u.cargo && u.cargo.includes('PRESBITERO')
        )
      }
      if (token?.role === 'ADMIN') {
        return (
          u.role !== 'SUPERADMIN' &&
          u.igrejaId === token.igrejaId &&
          u.cargo &&
          u.cargo.includes('PRESBITERO')
        )
      }
      return false
    }).length,
  }

  // Carregar nomes das igrejas
  useEffect(() => {
    if (igrejas.length > 0) {
      const namesMap: Record<string, string> = {}
      igrejas.forEach((igreja) => {
        namesMap[igreja.id] = igreja.nome
      })
      setIgrejaNames(namesMap)
    }
  }, [igrejas])

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      const res = await fetch('/api/auth/cargo', {
        credentials: 'include',
      })
      const data = await res.json()
      const usersData = Array.isArray(data)
        ? data.map((u) => ({
            ...u,
            cargo: Array.isArray(u.cargo) ? u.cargo : u.cargo ? [u.cargo] : [],
          }))
        : []
      setUsers(usersData)
      setFilteredUsers(
        usersData.filter((u) => {
          if (token?.role === 'SUPERADMIN') return u.role !== 'SUPERADMIN'
          if (token?.role === 'ADMIN')
            return u.role !== 'SUPERADMIN' && u.igrejaId === token.igrejaId
          return false
        }),
      )
      setLoading(false)
    }
    if (token) fetchUsers()
  }, [token])

  // Aplicar filtros
  useEffect(() => {
    let filtered = users.filter((u) => {
      if (token?.role === 'SUPERADMIN') return u.role !== 'SUPERADMIN'
      if (token?.role === 'ADMIN')
        return u.role !== 'SUPERADMIN' && u.igrejaId === token.igrejaId
      return false
    })

    if (filterIgreja) {
      filtered = filtered.filter((u) => u.igrejaId === filterIgreja)
    }

    if (filterCargo) {
      if (filterCargo === 'MEMBRO') {
        filtered = filtered.filter((u) => u.role === 'MEMBRO')
      } else {
        filtered = filtered.filter(
          (u) => u.cargo && u.cargo.includes(filterCargo),
        )
      }
    }

    setFilteredUsers(filtered)
  }, [users, filterIgreja, filterCargo, token])

  // Função para limpar filtros
  const clearFilters = () => {
    setFilterIgreja('')
    setFilterCargo('')
  }

  // Função memoizada para obter nome da igreja
  const getIgrejaName = useMemo(() => {
    return (igrejaId: string | null) => {
      if (!igrejaId) return 'Sem Igreja'
      return igrejaNames[igrejaId] || 'Igreja não encontrada'
    }
  }, [igrejaNames])

  async function handleSaveCargo() {
    if (!selectedUser) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/auth/cargo/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cargo }),
      })
      if (!res.ok) {
        const err = await res.json()
        const errorMessage = err.error || 'Erro desconhecido'
        setError(errorMessage)
        toast.error(errorMessage)
        setSaving(false)
        return
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, cargo } : u)),
      )
      toast.success('Cargo atualizado com sucesso!')
      setShowModal(false)
      setCargo([])
      setSelectedUser(null)
    } catch {
      const errorMessage = 'Erro de rede'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveIgreja() {
    if (!selectedUser) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/auth/igreja/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ igrejaId: igreja || null }),
      })
      if (!res.ok) {
        const err = await res.json()
        const errorMessage = err.error || 'Erro desconhecido'
        setError(errorMessage)
        toast.error(errorMessage)
        setSaving(false)
        return
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, igrejaId: igreja || null } : u,
        ),
      )
      toast.success('Igreja atualizada com sucesso!')
      setShowIgrejaModal(false)
      setIgreja('')
      setSelectedUser(null)
    } catch {
      const errorMessage = 'Erro de rede'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveFuncao() {
    if (!selectedUser) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/auth/role/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: funcao }),
      })
      if (!res.ok) {
        const err = await res.json()
        const errorMessage = err.error || 'Erro desconhecido'
        setError(errorMessage)
        toast.error(errorMessage)
        setSaving(false)
        return
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, role: funcao } : u,
        ),
      )
      toast.success('Função atualizada com sucesso!')
      setShowFuncaoModal(false)
      setFuncao('MEMBRO')
      setSelectedUser(null)
    } catch {
      const errorMessage = 'Erro de rede'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <div className="min-h-screen text-center mt-[160px] text-lg">
        Carregando usuários...
      </div>
    )

  const handleCargoCheckboxChange = (cargoSelecionado: string) => {
    setCargo((cargosAtuais) => {
      if (cargosAtuais.includes(cargoSelecionado)) {
        // Se o cargo já está selecionado, remove-o
        return cargosAtuais.filter((c) => c !== cargoSelecionado)
      } else {
        // Se não está selecionado, adiciona-o
        return [...cargosAtuais, cargoSelecionado]
      }
    })
  }

  return (
    <div className="mx-4 lg:mx-auto max-w-[1200px] min-h-screen mt-[160px] px-2">
      <h1 className="text-3xl font-bold mb-8  text-primary dark:text-secundary flex items-center  gap-3">
        <FaUsers className="w-8 h-8" />
        Gerenciamento de Usuários
      </h1>

      {/* Cards Informativos */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total de Usuários
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <FaUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Administradores
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.admins}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
              <FaUserShield className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pastores
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.pastores}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <FaUserTie className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Presbíteros
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.presbiteros}
              </p>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
              <FaUserTie className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Diáconos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.diaconos}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <FaUserShield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Membros
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.membros}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <FaUsers className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Sem Cargo
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.semCargo}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <FaUsers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Sem Igreja
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.semIgreja}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <FaUsers className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FaFilter className="w-5 h-5" />
            Filtros
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-primary dark:text-secundary hover:text-primary/80 dark:hover:text-secundary/80 transition-colors"
          >
            {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro por Igreja */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filtrar por Igreja
              </label>
              <select
                value={filterIgreja}
                onChange={(e) => setFilterIgreja(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Todas as igrejas</option>
                {igrejas.map((igreja) => (
                  <option key={igreja.id} value={igreja.id}>
                    {igreja.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Cargo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filtrar por Cargo
              </label>
              <select
                value={filterCargo}
                onChange={(e) => setFilterCargo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Todos os cargos</option>
                <option value="MEMBRO">Membros</option>
                {cargos.map((cargo) => (
                  <option key={cargo} value={cargo}>
                    {cargo.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão Limpar Filtros */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Resultados */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Mostrando {filteredUsers.length} de{' '}
          {
            users.filter((u) => {
              if (token?.role === 'SUPERADMIN') return u.role !== 'SUPERADMIN'
              if (token?.role === 'ADMIN')
                return u.role !== 'SUPERADMIN' && u.igrejaId === token.igrejaId
              return false
            }).length
          }{' '}
          usuários
        </div>
      </div>

      {/* Tabela de Usuários ou Mensagem de Aviso */}
      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow mb-10">
          <table className="w-full ">
            <thead className="hidden md:table-header-group">
              <tr className="bg-primary/90 dark:bg-secundary/80 text-white ">
                <th data-label="Avatar" className="px-3 py-2">
                  Avatar
                </th>
                <th data-label="Nome" className="px-3 py-2">
                  Nome
                </th>
                <th data-label="Email" className="px-3 py-2">
                  Email
                </th>
                <th data-label="Cargo" className="px-3 py-2">
                  Cargo
                </th>
                <th data-label="Igreja" className="px-3 py-2">
                  Igreja
                </th>
                <th data-label="Tipo" className="px-3 py-2">
                  Tipo
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className={`hover:bg-primary/10 dark:hover:bg-gray-800/10 transition-colors ${u.id === selectedUser?.id ? 'dark:bg-secundary/10' : 'dark:bg-gray-800 border border-zinc-300 dark:border-gray-700'}`}
                >
                  <td data-label="Avatar" className="px-3 py-2 text-center ">
                    <Image
                      src={u.avatarUrl || '/img/Placeholder.png'}
                      alt={u.name}
                      className="w-10 h-10 rounded-full border-2 border-primary dark:border-secundary p-[1px]"
                      width={40}
                      height={40}
                      priority
                      quality={100}
                    />
                  </td>
                  <td data-label="Nome" className=" py-2 font-semibold ">
                    {u.name}
                  </td>
                  <td data-label="Email" className="px-3 py-2">
                    {u.login}
                  </td>
                  <td data-label="Cargo" className="py-2 ">
                    {Array.isArray(u.cargo) && u.cargo.length > 0 ? (
                      u.cargo.map((c) => c.replace(/_/g, ' ')).join(', ')
                    ) : (
                      <span className="text-gray-400">Sem Cargo</span>
                    )}
                    <button
                      className="ml-2 text-blue-500 hover:text-blue-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => {
                        setSelectedUser(u)
                        setCargo(Array.isArray(u.cargo) ? u.cargo : [])
                        setShowModal(true)
                      }}
                      title="Editar cargo"
                    >
                      <FaEdit size={16} />
                    </button>
                  </td>
                  <td data-label="Igreja" className="py-2 text-center ">
                    <span className={u.igrejaId ? '' : 'text-gray-400'}>
                      {getIgrejaName(u.igrejaId)}
                    </span>
                    <button
                      className="ml-2 text-blue-500 hover:text-blue-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => {
                        setSelectedUser(u)
                        setIgreja(u.igrejaId ?? '')
                        setShowIgrejaModal(true)
                      }}
                      title="Editar igreja"
                    >
                      <FaEdit size={16} />
                    </button>
                  </td>
                  <td data-label="Tipo" className="py-2 text-center">
                    <span
                      className={
                        u.role === 'SUPERADMIN'
                          ? 'bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold'
                          : u.role === 'ADMIN'
                            ? 'bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold'
                            : 'bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold'
                      }
                    >
                      {u.role}
                    </span>
                    <button
                      className={`ml-2 text-blue-500 hover:text-blue-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        token?.role !== 'SUPERADMIN' && 'hidden'
                      }`}
                      onClick={() => {
                        setSelectedUser(u)
                        setFuncao(u.role === 'ADMIN' ? 'ADMIN' : 'MEMBRO')
                        setShowFuncaoModal(true)
                      }}
                      title="Editar função"
                      disabled={token?.role !== 'SUPERADMIN'}
                    >
                      <FaEdit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <FaUsers className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {filterIgreja || filterCargo
                ? 'Não há usuários que correspondam aos filtros aplicados.'
                : 'Ainda não há usuários cadastrados no sistema.'}
            </p>
            {(filterIgreja || filterCargo) && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-primary dark:bg-secundary text-white rounded-lg font-medium hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal de cargo */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-bgdark p-8 rounded-lg shadow-lg min-w-[320px] max-w-xs w-full flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">
              Atribuir Cargo para{' '}
              <span className="text-primary dark:text-secundary">
                {selectedUser.name}
              </span>
            </h2>

            {/* LISTA DE CHECKBOXES SUBSTITUINDO O <SELECT> */}
            <div className="w-full p-3 border rounded-lg border-gray-300 dark:border-gray-600 max-h-48 overflow-y-auto mb-6">
              <div className="flex flex-col gap-2">
                {cargos.map((c) => (
                  <label
                    key={c}
                    className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <span className="text-textlight dark:text-textdark">
                      {c.replace(/_/g, ' ')}
                    </span>
                    <input
                      type="checkbox"
                      value={c}
                      checked={cargo.includes(c)}
                      onChange={() => handleCargoCheckboxChange(c)}
                      className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary focus:ring-primary focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm mb-2 text-center">
                {error}
              </div>
            )}

            <div className="flex gap-2 justify-center">
              <button
                className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded font-bold shadow"
                disabled={saving}
                onClick={handleSaveCargo}
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-bold"
                onClick={() => {
                  setShowModal(false)
                  setCargo([])
                  setSelectedUser(null)
                  setError(null)
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de igreja */}
      {showIgrejaModal && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-bgdark p-8 rounded-lg shadow-lg min-w-[320px] max-w-xs w-full flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">
              Atribuir Igreja para{' '}
              <span className="text-primary dark:text-secundary">
                {selectedUser.name}
              </span>
            </h2>
            <select
              className="input w-full mb-6 border rounded px-2 py-2"
              value={igreja}
              onChange={(e) => setIgreja(e.target.value)}
            >
              <option value="">Sem igreja</option>
              {igrejas.map((igreja) => (
                <option key={igreja.id} value={igreja.id}>
                  {igreja.nome}
                </option>
              ))}
            </select>
            {error && (
              <div className="text-red-600 text-sm mb-2 text-center">
                {error}
              </div>
            )}
            <div className="flex gap-2 justify-center">
              <button
                className="bg-secundary hover:bg-secundary/80 text-white px-4 py-2 rounded font-bold shadow"
                disabled={saving}
                onClick={handleSaveIgreja}
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-bold"
                onClick={() => {
                  setShowIgrejaModal(false)
                  setIgreja('')
                  setSelectedUser(null)
                  setError(null)
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de função */}
      {showFuncaoModal && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-bgdark p-8 rounded-lg shadow-lg min-w-[320px] max-w-xs w-full flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">
              Atribuir Função para{' '}
              <span className="text-primary dark:text-secundary">
                {selectedUser.name}
              </span>
            </h2>
            <select
              className="input w-full mb-6 border rounded px-2 py-2"
              value={funcao}
              onChange={(e) => setFuncao(e.target.value as 'ADMIN' | 'MEMBRO')}
            >
              {funcoes.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            {error && (
              <div className="text-red-600 text-sm mb-2 text-center">
                {error}
              </div>
            )}
            <div className="flex gap-2 justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow"
                disabled={saving}
                onClick={handleSaveFuncao}
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-bold"
                onClick={() => {
                  setShowFuncaoModal(false)
                  setFuncao('MEMBRO')
                  setSelectedUser(null)
                  setError(null)
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
