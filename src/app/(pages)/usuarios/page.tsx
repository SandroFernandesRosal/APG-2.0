'use client'
import { useEffect, useState } from 'react'
import { useToken } from '@/hooks/useToken'
import Image from 'next/image'

type User = {
  id: string
  name: string
  login: string
  avatarUrl: string
  role: 'ADMIN' | 'SUPERADMIN' | 'MEMBRO'
  ministryRole: string | null
  cargo?: string | null
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

const igrejas = ['VILADAPENHA', 'TOMAZINHO', 'MARIAHELENA']

const funcoes = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'MEMBRO', label: 'Membro' },
]

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const token = useToken()

  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [cargo, setCargo] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estados para igreja
  const [showIgrejaModal, setShowIgrejaModal] = useState(false)
  const [igreja, setIgreja] = useState<string>('')

  // Estados para função (role)
  const [showFuncaoModal, setShowFuncaoModal] = useState(false)
  const [funcao, setFuncao] = useState<'ADMIN' | 'MEMBRO'>('MEMBRO')

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      const res = await fetch('/api/auth/cargo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
      setLoading(false)
    }
    if (token) fetchUsers()
  }, [token])

  async function handleSaveCargo() {
    if (!selectedUser) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/auth/cargo/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cargo: cargo || null }),
      })
      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Erro desconhecido')
        setSaving(false)
        return
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, cargo: cargo || null } : u,
        ),
      )
      setShowModal(false)
      setCargo('')
      setSelectedUser(null)
    } catch {
      setError('Erro de rede')
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
        body: JSON.stringify({ ministryRole: igreja || null }),
      })
      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Erro desconhecido')
        setSaving(false)
        return
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, ministryRole: igreja || null } : u,
        ),
      )
      setShowIgrejaModal(false)
      setIgreja('')
      setSelectedUser(null)
    } catch {
      setError('Erro de rede')
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
        setError(err.error || 'Erro desconhecido')
        setSaving(false)
        return
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, role: funcao } : u,
        ),
      )
      setShowFuncaoModal(false)
      setFuncao('MEMBRO')
      setSelectedUser(null)
    } catch {
      setError('Erro de rede')
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

  return (
    <div className="mx-4 lg:mx-auto max-w-[1200px] min-h-screen mt-[160px] px-2">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary dark:text-secundary">
        Usuários
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
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
              <th data-label="Ações" className="px-3 py-2">
                Alterar Cargo
              </th>
              <th data-label="Ações" className="px-3 py-2">
                Alterar Igreja
              </th>
              <th data-label="Ações" className="px-3 py-2">
                Alterar Função
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((u) => u.role !== 'SUPERADMIN')
              .map((u) => (
                <tr
                  key={u.id}
                  className={`hover:bg-primary/10 bg- dark:hover:bg-secundary/10 transition-colors ${u.id === selectedUser?.id ? ' dark:bg-secundary/10' : ' dark:bg-primary/10 border border-zinc-300 dark:border-gray-700'}   `}
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
                  <td data-label="Nome" className="px-3 py-2 font-semibold">
                    {u.name}
                  </td>
                  <td data-label="Email" className="px-3 py-2">
                    {u.login}
                  </td>
                  <td data-label="Cargo" className="px-3 py-2">
                    {u.cargo ? (
                      u.cargo.replace(/_/g, ' ')
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td data-label="Igreja" className="px-3 py-2">
                    {u.ministryRole ?? <span className="text-gray-400">-</span>}
                  </td>
                  <td data-label="Tipo" className="px-3 py-2">
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
                  </td>
                  <td data-label="Alterar Cargo" className="px-3 py-2">
                    <button
                      className="bg-primary hover:bg-primary/80 text-white px-3 py-1 rounded shadow transition"
                      onClick={() => {
                        setSelectedUser(u)
                        setCargo(u.cargo ?? '')
                        setShowModal(true)
                      }}
                    >
                      Atribuir Cargo
                    </button>
                  </td>
                  <td data-label="Alterar Igreja" className="px-3 py-2">
                    <button
                      className="bg-primary hover:bg-primary/80 text-white px-3 py-1 rounded shadow transition"
                      onClick={() => {
                        setSelectedUser(u)
                        setIgreja(u.ministryRole ?? '')
                        setShowIgrejaModal(true)
                      }}
                    >
                      Atribuir Igreja
                    </button>
                  </td>
                  <td data-label="Alterar Função" className="px-3 py-2">
                    <button
                      className="bg-primary hover:bg-primary/80 text-white px-3 py-1 rounded shadow transition"
                      onClick={() => {
                        setSelectedUser(u)
                        setFuncao(u.role === 'ADMIN' ? 'ADMIN' : 'MEMBRO')
                        setShowFuncaoModal(true)
                      }}
                      disabled={token?.role !== 'SUPERADMIN'}
                    >
                      Atribuir Função
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

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
            <select
              className="input w-full mb-6 border rounded px-2 py-2"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            >
              <option value="">Sem cargo</option>
              {cargos.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/_/g, ' ')}
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
                  setCargo('')
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
              {igrejas.map((i) => (
                <option key={i} value={i}>
                  {i}
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
