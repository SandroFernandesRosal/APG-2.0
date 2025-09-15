'use client'

import { useState, FormEvent } from 'react'
import { FaTimes, FaPlus } from 'react-icons/fa'

interface AddIgrejaProps {
  setOpenAdd: (open: boolean) => void
  onSuccess: () => void
}

export default function AddIgreja({ setOpenAdd, onSuccess }: AddIgrejaProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
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
  })

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

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nome = e.target.value
    setFormData({
      ...formData,
      nome,
      slug: generateSlug(nome),
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/igrejas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
        setOpenAdd(false)
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
        })
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao criar igreja')
      }
    } catch (error) {
      console.error('Erro ao criar igreja:', error)
      alert('Erro ao criar igreja')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Adicionar Igreja
          </h2>
          <button
            onClick={() => setOpenAdd(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome da Igreja *
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={handleNomeChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                placeholder="Ex: Vila da Penha"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                placeholder="Ex: vila-da-penha"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Endereço
              </label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) =>
                  setFormData({ ...formData, endereco: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                placeholder="Endereço completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo
              </label>
              <select
                value={formData.tipo}
                onChange={(e) =>
                  setFormData({ ...formData, tipo: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              >
                <option value="">Selecione o tipo</option>
                <option value="Sede">Sede</option>
                <option value="Filial">Filial</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder="Descrição do ponto de encontro"
            />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              Dados Bancários
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Banco
                </label>
                <input
                  type="text"
                  value={formData.banco}
                  onChange={(e) =>
                    setFormData({ ...formData, banco: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Nome do banco"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Conta
                </label>
                <input
                  type="text"
                  value={formData.conta}
                  onChange={(e) =>
                    setFormData({ ...formData, conta: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Número da conta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Agência
                </label>
                <input
                  type="text"
                  value={formData.agencia}
                  onChange={(e) =>
                    setFormData({ ...formData, agencia: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Número da agência"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome do Beneficiário (Banco)
                </label>
                <input
                  type="text"
                  value={formData.nomebanco}
                  onChange={(e) =>
                    setFormData({ ...formData, nomebanco: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Nome do beneficiário"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
              Dados PIX
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Chave PIX
                </label>
                <input
                  type="text"
                  value={formData.pix}
                  onChange={(e) =>
                    setFormData({ ...formData, pix: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Chave PIX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome do Beneficiário (PIX)
                </label>
                <input
                  type="text"
                  value={formData.nomepix}
                  onChange={(e) =>
                    setFormData({ ...formData, nomepix: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Nome do beneficiário"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="ativa"
              checked={formData.ativa}
              onChange={(e) =>
                setFormData({ ...formData, ativa: e.target.checked })
              }
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor="ativa"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Igreja ativa
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpenAdd(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <FaPlus />
              )}
              {loading ? 'Criando...' : 'Criar Igreja'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
