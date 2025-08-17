'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToken } from '@/hooks/useToken'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import {
  FaHistory,
  FaSearch,
  FaFilter,
  FaEye,
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaPlus,
  FaEdit,
  FaTrash,
} from 'react-icons/fa'

interface AuditLog {
  id: string
  action: string
  entityType: string
  entityId: string
  userId: string
  userName: string
  userRole: string
  oldData: Record<string, unknown> | null
  newData: Record<string, unknown> | null
  changes: Record<string, { from: unknown; to: unknown }> | null
  timestamp: string
  user: {
    id: string
    name: string
    role: string
    ministryRole: string
  }
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface Stats {
  actions: Record<string, number>
  entities: Record<string, number>
}

export default function HistoricoPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })
  const [stats, setStats] = useState<Stats>({ actions: {}, entities: {} })
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Filtros
  const [filters, setFilters] = useState({
    action: '',
    entityType: '',
    userId: '',
    startDate: '',
    endDate: '',
    search: '',
  })

  const router = useRouter()
  const token = useToken()

  useEffect(() => {
    if (token) {
      if (token.role !== 'SUPERADMIN') {
        router.push('/login')
        return
      }
      fetchLogs()
    }
  }, [token, pagination.page, filters])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...filters,
      })

      const response = await fetch(`/api/admin/audit-logs?${params}`, {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs)
        setPagination(data.pagination)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Erro ao buscar logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const clearFilters = () => {
    setFilters({
      action: '',
      entityType: '',
      userId: '',
      startDate: '',
      endDate: '',
      search: '',
    })
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getEntityTypeColor = (entityType: string) => {
    switch (entityType) {
      case 'User':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'New':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
      case 'Testemunho':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Agenda':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      case 'Sobre':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Endereco':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
      case 'Contato':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
      case 'Doacao':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const translateFieldName = (fieldName: string): string => {
    const translations: Record<string, string> = {
      // Campos gerais
      id: 'ID',
      createdAt: 'Data de Criação',
      updatedAt: 'Data de Atualização',

      // Campos de usuário
      name: 'Nome',
      email: 'E-mail',
      password: 'Senha',
      role: 'Cargo',
      ministryRole: 'Função Ministerial',
      church: 'Igreja',

      // Campos de notícias
      title: 'Título',
      content: 'Conteúdo',
      coverUrl: 'URL da Capa',
      videoUrl: 'URL do Vídeo',

      // Campos de testemunhos
      testimony: 'Testemunho',
      author: 'Autor',

      // Campos de agenda
      day: 'Dia',
      time: 'Horário',
      description: 'Descrição',
      event: 'Evento',

      // Campos de sobre
      about: 'Sobre',
      mission: 'Missão',
      vision: 'Visão',

      // Campos de endereço
      address: 'Endereço',
      city: 'Cidade',
      state: 'Estado',
      zipCode: 'CEP',
      neighborhood: 'Bairro',

      // Campos de contato
      phone: 'Telefone',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      facebook: 'Facebook',

      // Campos de doação
      amount: 'Valor',
      type: 'Tipo',
      status: 'Status',

      // Campos de configuração
      key: 'Chave',
      value: 'Valor',
      setting: 'Configuração',
    }

    return (
      translations[fieldName.toLowerCase()] ||
      fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()
    )
  }

  const formatChanges = (
    changes: Record<string, { from: unknown; to: unknown }> | null,
  ) => {
    if (!changes) return null

    const formatValue = (value: unknown): string | React.ReactElement => {
      if (value === null || value === undefined) return 'N/A'

      const strValue = String(value)

      // Verificar se é uma data (formato ISO)
      const dateRegex = /^\d{4}-\d{2}-\d{2}/
      if (dateRegex.test(strValue)) {
        try {
          return format(new Date(strValue), 'dd/MM/yyyy', { locale: ptBR })
        } catch {
          return strValue
        }
      }

      // Verificar se é uma URL de imagem
      const imageRegex = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i
      if (imageRegex.test(strValue) && strValue.startsWith('http')) {
        return (
          <div className="relative w-full max-w-xs">
            <Image
              src={strValue}
              alt="Imagem"
              width={320}
              height={128}
              className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden absolute inset-0  items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Erro ao carregar imagem
              </span>
            </div>
          </div>
        )
      }

      return strValue
    }

    return Object.entries(changes).map(([field, change]) => (
      <div
        key={field}
        className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-blue-100 dark:border-gray-600"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="font-semibold text-sm text-gray-900 dark:text-white capitalize">
            {translateFieldName(field)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
            <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">
              Valor Anterior
            </div>
            <div className="text-sm text-gray-900 dark:text-white">
              {typeof formatValue(change.from) === 'string' ? (
                <span className="font-mono">
                  {formatValue(change.from) as string}
                </span>
              ) : (
                (formatValue(change.from) as React.ReactElement)
              )}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
            <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
              Novo Valor
            </div>
            <div className="text-sm text-gray-900 dark:text-white">
              {typeof formatValue(change.to) === 'string' ? (
                <span className="font-mono">
                  {formatValue(change.to) as string}
                </span>
              ) : (
                (formatValue(change.to) as React.ReactElement)
              )}
            </div>
          </div>
        </div>
      </div>
    ))
  }

  if (!token || token.role !== 'SUPERADMIN') {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Acesso Negado
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Você não tem permissão para acessar esta página.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaHistory className="w-8 h-8 text-primary dark:text-secundary" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Histórico de Mudanças
              </h1>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaCog className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total de Ações
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pagination.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaPlus className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Criações
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.actions.CREATE || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaEdit className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Atualizações
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.actions.UPDATE || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaTrash className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Remoções
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.actions.DELETE || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filtros
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Buscar
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar por usuário, ação, recurso..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange('search', e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ação
                </label>
                <select
                  value={filters.action}
                  onChange={(e) => handleFilterChange('action', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Todas as ações</option>
                  <option value="CREATE">Criar</option>
                  <option value="UPDATE">Editar</option>
                  <option value="DELETE">Remover</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Recurso
                </label>
                <select
                  value={filters.entityType}
                  onChange={(e) =>
                    handleFilterChange('entityType', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Todos os recursos</option>
                  <option value="User">Usuários</option>
                  <option value="New">Notícias</option>
                  <option value="Testemunho">Testemunhos</option>
                  <option value="Agenda">Agenda</option>
                  <option value="Sobre">Sobre</option>
                  <option value="Endereco">Endereços</option>
                  <option value="Contato">Contatos</option>
                  <option value="Doacao">Doações</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data Início
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      handleFilterChange('startDate', e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data Fim
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      handleFilterChange('endDate', e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Logs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Data/Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Recurso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Detalhes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      Carregando...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      Nenhum log encontrado
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {format(
                          new Date(log.timestamp),
                          'dd/MM/yyyy HH:mm:ss',
                          { locale: ptBR },
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaUser className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {log.userName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {log.userRole}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(log.action)}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEntityTypeColor(log.entityType)}`}
                        >
                          {log.entityType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => {
                            setSelectedLog(log)
                            setShowModal(true)
                          }}
                          className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          <FaEye className="w-3 h-3" />
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {pagination.totalPages > 1 && (
            <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                  disabled={pagination.page === pagination.totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Mostrando{' '}
                    <span className="font-medium">
                      {(pagination.page - 1) * pagination.limit + 1}
                    </span>{' '}
                    a{' '}
                    <span className="font-medium">
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total,
                      )}
                    </span>{' '}
                    de <span className="font-medium">{pagination.total}</span>{' '}
                    resultados
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1,
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() =>
                          setPagination((prev) => ({ ...prev, page }))
                        }
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === pagination.page
                            ? 'z-10 bg-primary dark:bg-secundary border-primary dark:border-secundary text-white'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {showModal && selectedLog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                      Detalhes da Ação
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Informações Gerais
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Data/Hora:</span>{' '}
                            {format(
                              new Date(selectedLog.timestamp),
                              'dd/MM/yyyy HH:mm:ss',
                              { locale: ptBR },
                            )}
                          </div>
                          <div>
                            <span className="font-medium">Usuário:</span>{' '}
                            {selectedLog.userName}
                          </div>
                          <div>
                            <span className="font-medium">Role:</span>{' '}
                            {selectedLog.userRole}
                          </div>
                          <div>
                            <span className="font-medium">Ação:</span>{' '}
                            {selectedLog.action}
                          </div>
                          <div>
                            <span className="font-medium">Recurso:</span>{' '}
                            {selectedLog.entityType}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Mudanças
                        </h4>
                        <div className="max-h-96 overflow-y-auto">
                          {selectedLog.changes ? (
                            formatChanges(selectedLog.changes)
                          ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {selectedLog.action === 'CREATE'
                                ? 'Recurso criado'
                                : selectedLog.action === 'DELETE'
                                  ? 'Recurso removido'
                                  : 'Nenhuma mudança detectada'}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary dark:bg-secundary text-base font-medium text-white hover:bg-primary/90 dark:hover:bg-secundary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-secundary sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
