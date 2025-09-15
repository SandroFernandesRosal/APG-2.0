'use client'

import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaChurch, FaEye } from 'react-icons/fa'
import { useIgrejas } from '@/hooks/useIgrejas'
import { useToken } from '@/hooks/useToken'

interface Igreja {
  id: string
  nome: string
  slug: string
  ativa: boolean
  endereco?: string
  descricao?: string
  tipo?: string
  banco?: string
  conta?: string
  agencia?: string
  nomebanco?: string
  pix?: string
  nomepix?: string
  telefone?: string
  whatsapp?: string
  facebook?: string
  youtube?: string
  instagram?: string
  createdAt: string
  updatedAt: string
}

interface IgrejaFormData {
  nome: string
  slug: string
  ativa: boolean
  endereco: string
  descricao: string
  tipo: string
  banco: string
  conta: string
  agencia: string
  nomebanco: string
  pix: string
  nomepix: string
  telefone: string
  whatsapp: string
  facebook: string
  youtube: string
  instagram: string
}

export default function AdminIgrejasPage() {
  const token = useToken()
  const {
    igrejas,
    loading: igrejasLoading,
    refetch,
  } = useIgrejas({ showInactive: true })
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete'>('add')
  const [selectedIgreja, setSelectedIgreja] = useState<Igreja | null>(null)
  const [igrejaDependencies, setIgrejaDependencies] = useState<
    Record<
      string,
      {
        users: number
        news: number
        ministerios: number
        agendas: number
        testemunhos: number
        total: number
      }
    >
  >({})
  const [formData, setFormData] = useState<IgrejaFormData>({
    nome: '',
    slug: '',
    ativa: true,
    endereco: '',
    descricao: '',
    tipo: '',
    banco: '',
    conta: '',
    agencia: '',
    nomebanco: '',
    pix: '',
    nomepix: '',
    telefone: '',
    whatsapp: '',
    facebook: '',
    youtube: '',
    instagram: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkIgrejaDependencies = async (igrejaId: string) => {
    try {
      const [
        usersCount,
        newsCount,
        ministeriosCount,
        agendasCount,
        testemunhosCount,
      ] = await Promise.all([
        fetch(`/api/users?igrejaId=${igrejaId}`)
          .then((res) => res.json())
          .then((data) => data.length)
          .catch(() => 0),
        fetch(`/api/news?igrejaId=${igrejaId}`)
          .then((res) => res.json())
          .then((data) => data.length)
          .catch(() => 0),
        fetch(`/api/ministerio?igrejaId=${igrejaId}`)
          .then((res) => res.json())
          .then((data) => data.length)
          .catch(() => 0),
        fetch(`/api/agenda?igrejaId=${igrejaId}`)
          .then((res) => res.json())
          .then((data) => data.length)
          .catch(() => 0),
        fetch(`/api/testemunhos?igrejaId=${igrejaId}`)
          .then((res) => res.json())
          .then((data) => data.length)
          .catch(() => 0),
      ])

      const dependencies = {
        users: usersCount,
        news: newsCount,
        ministerios: ministeriosCount,
        agendas: agendasCount,
        testemunhos: testemunhosCount,
        total:
          usersCount +
          newsCount +
          ministeriosCount +
          agendasCount +
          testemunhosCount,
      }

      setIgrejaDependencies((prev) => ({
        ...prev,
        [igrejaId]: dependencies,
      }))

      return dependencies
    } catch (error) {
      console.error('Erro ao verificar dependências:', error)
      return {
        users: 0,
        news: 0,
        ministerios: 0,
        agendas: 0,
        testemunhos: 0,
        total: 0,
      }
    }
  }

  // Verificar dependências quando as igrejas carregarem
  useEffect(() => {
    if (igrejas.length > 0) {
      igrejas.forEach((igreja) => {
        checkIgrejaDependencies(igreja.id)
      })
    }
  }, [igrejas])

  // Verificar se é admin
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (token.role !== 'ADMIN' && token.role !== 'SUPERADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            403
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Acesso negado</p>
        </div>
      </div>
    )
  }

  const generateSlug = (nome: string) => {
    return nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Auto-gerar slug quando o nome mudar
    if (name === 'nome') {
      setFormData((prev) => ({
        ...prev,
        nome: value,
        slug: generateSlug(value),
      }))
    }
  }

  const openModal = (type: 'add' | 'edit' | 'delete', igreja?: Igreja) => {
    setModalType(type)
    setSelectedIgreja(igreja || null)
    setError(null)

    if (type === 'add') {
      setFormData({
        nome: '',
        slug: '',
        ativa: true,
        endereco: '',
        descricao: '',
        tipo: '',
        banco: '',
        conta: '',
        agencia: '',
        nomebanco: '',
        pix: '',
        nomepix: '',
        telefone: '',
        whatsapp: '',
        facebook: '',
        youtube: '',
        instagram: '',
      })
    } else if (type === 'edit' && igreja) {
      setFormData({
        nome: igreja.nome,
        slug: igreja.slug,
        ativa: igreja.ativa,
        endereco: igreja.endereco || '',
        descricao: igreja.descricao || '',
        tipo: igreja.tipo || '',
        banco: igreja.banco || '',
        conta: igreja.conta || '',
        agencia: igreja.agencia || '',
        nomebanco: igreja.nomebanco || '',
        pix: igreja.pix || '',
        nomepix: igreja.nomepix || '',
        telefone: igreja.telefone || '',
        whatsapp: igreja.whatsapp || '',
        facebook: igreja.facebook || '',
        youtube: igreja.youtube || '',
        instagram: igreja.instagram || '',
      })
    }

    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedIgreja(null)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url =
        modalType === 'add'
          ? '/api/igrejas'
          : `/api/igrejas/${selectedIgreja?.id}`
      const method = modalType === 'add' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao salvar igreja')
      }

      await refetch()
      closeModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar igreja')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedIgreja) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/igrejas/${selectedIgreja.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao deletar igreja')
      }

      await refetch()
      closeModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar igreja')
    } finally {
      setLoading(false)
    }
  }

  if (igrejasLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <main className="mb-8 mt-28 flex flex-col items-center justify-center gap-4 md:items-start">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FaChurch className="text-primary" />
                Administrar Igrejas
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Gerencie as igrejas do sistema
              </p>
            </div>
            <button
              onClick={() => openModal('add')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <FaPlus />
              Nova Igreja
            </button>
          </div>
        </div>

        {/* Lista de Igrejas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Igreja
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Endereço
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {igrejas.map((igreja) => (
                  <tr
                    key={igreja.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {igreja.nome}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {igreja.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                        {igreja.tipo || 'Não informado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          igreja.ativa
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {igreja.ativa ? 'Ativa' : 'Inativa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {igreja.endereco || 'Não informado'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/igrejas/${igreja.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Ver página"
                        >
                          <FaEye />
                        </a>
                        <button
                          onClick={() => openModal('edit', igreja)}
                          className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            const dependencies = igrejaDependencies[igreja.id]
                            if (dependencies && dependencies.total > 0) {
                              const deps = []
                              if (dependencies.users > 0)
                                deps.push(`${dependencies.users} usuário(s)`)
                              if (dependencies.news > 0)
                                deps.push(`${dependencies.news} notícia(s)`)
                              if (dependencies.ministerios > 0)
                                deps.push(
                                  `${dependencies.ministerios} ministério(s)`,
                                )
                              if (dependencies.agendas > 0)
                                deps.push(`${dependencies.agendas} evento(s)`)
                              if (dependencies.testemunhos > 0)
                                deps.push(
                                  `${dependencies.testemunhos} testemunho(s)`,
                                )

                              alert(
                                `Não é possível deletar esta igreja pois ela possui: ${deps.join(', ')}`,
                              )
                            } else {
                              openModal('delete', igreja)
                            }
                          }}
                          className={`${
                            igrejaDependencies[igreja.id]?.total > 0
                              ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
                              : 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                          }`}
                          title={
                            igrejaDependencies[igreja.id]?.total > 0
                              ? 'Não é possível deletar - possui dependências'
                              : 'Deletar'
                          }
                          disabled={igrejaDependencies[igreja.id]?.total > 0}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {modalType === 'add' && 'Nova Igreja'}
                    {modalType === 'edit' && 'Editar Igreja'}
                    {modalType === 'delete' && 'Deletar Igreja'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {modalType === 'delete' ? (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Tem certeza que deseja deletar a igreja{' '}
                      <strong>{selectedIgreja?.nome}</strong>? Esta ação não
                      pode ser desfeita.
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        disabled={loading}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? 'Deletando...' : 'Deletar'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nome da Igreja *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tipo
                        </label>
                        <input
                          type="text"
                          name="tipo"
                          value={formData.tipo}
                          onChange={handleInputChange}
                          placeholder="Ex: Filial, Matriz"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="ativa"
                            checked={formData.ativa}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Igreja Ativa
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Descrição
                      </label>
                      <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Endereço
                      </label>
                      <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Banco
                        </label>
                        <input
                          type="text"
                          name="banco"
                          value={formData.banco}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Conta
                        </label>
                        <input
                          type="text"
                          name="conta"
                          value={formData.conta}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Agência
                        </label>
                        <input
                          type="text"
                          name="agencia"
                          value={formData.agencia}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Titular
                        </label>
                        <input
                          type="text"
                          name="nomebanco"
                          value={formData.nomebanco}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Chave PIX
                        </label>
                        <input
                          type="text"
                          name="pix"
                          value={formData.pix}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nome PIX
                        </label>
                        <input
                          type="text"
                          name="nomepix"
                          value={formData.nomepix}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Campos de Contato */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Informações de Contato
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Telefone
                          </label>
                          <input
                            type="text"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleInputChange}
                            placeholder="(21) 99999-9999"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            WhatsApp
                          </label>
                          <input
                            type="text"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            placeholder="(21) 99999-9999"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Facebook
                          </label>
                          <input
                            type="url"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            placeholder="https://facebook.com/igreja"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            YouTube
                          </label>
                          <input
                            type="url"
                            name="youtube"
                            value={formData.youtube}
                            onChange={handleInputChange}
                            placeholder="https://youtube.com/@igreja"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Instagram
                          </label>
                          <input
                            type="url"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            placeholder="https://instagram.com/igreja"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        disabled={loading}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? 'Salvando...' : 'Salvar'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
