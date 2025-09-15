'use client'

import { useState } from 'react'
import { useIgrejas } from '@/hooks/useIgrejas'
import { FaMapMarkerAlt, FaChurch } from 'react-icons/fa'
import { Landmark, KeyRound, Copy } from 'lucide-react'
import Link from 'next/link'

export default function Igrejas() {
  const { igrejas, loading } = useIgrejas({ showInactive: false })
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => {
        setCopiedId(null)
      }, 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Nossas Igrejas
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Conheça nossos pontos de encontro e participe das atividades em cada
            localidade
          </p>
        </div>

        {igrejas.length === 0 ? (
          <div className="text-center py-12">
            <FaChurch className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              Nenhuma igreja cadastrada
            </h2>
            <p className="text-gray-500 dark:text-gray-500">
              Aguarde enquanto preparamos as informações das nossas igrejas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {igrejas.map((igreja) => (
              <div
                key={igreja.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header da Igreja */}
                <div className="bg-gradient-to-r from-primary to-secundary p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <FaChurch className="text-2xl" />
                    <h2 className="text-xl font-bold">{igreja.nome}</h2>
                  </div>
                  {igreja.tipo && (
                    <span className="inline-block bg-white/20 text-sm px-3 py-1 rounded-full">
                      {igreja.tipo}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  {/* Endereço */}
                  {igreja.endereco && (
                    <div className="mb-4">
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-primary text-lg mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                            Endereço
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {igreja.endereco}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Descrição */}
                  {igreja.descricao && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                        Sobre este local
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {igreja.descricao}
                      </p>
                    </div>
                  )}

                  {/* Dados Bancários */}
                  {(igreja.banco || igreja.conta || igreja.agencia) && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <Landmark className="text-primary" />
                        Dados Bancários
                      </h3>
                      <div className="space-y-2">
                        {igreja.banco && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Banco:
                            </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                              {igreja.banco}
                            </span>
                          </div>
                        )}
                        {igreja.conta && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Conta:
                            </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                              {igreja.conta}
                            </span>
                          </div>
                        )}
                        {igreja.agencia && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Agência:
                            </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                              {igreja.agencia}
                            </span>
                          </div>
                        )}
                        {igreja.nomebanco && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Titular:
                            </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                              {igreja.nomebanco}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PIX */}
                  {igreja.pix && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <KeyRound className="text-primary" />
                        Chave PIX
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              {igreja.pix}
                            </p>
                            {igreja.nomepix && (
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {igreja.nomepix}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleCopy(igreja.pix!, igreja.id)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                            title="Copiar PIX"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        {copiedId === igreja.id && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ PIX copiado!
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Links para páginas específicas */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 gap-2">
                      <Link
                        href={`/igrejas/${igreja.slug}`}
                        className="bg-gradient-to-r from-primary to-secundary text-white text-center py-3 px-4 rounded-lg hover:from-primary/90 hover:to-secundary/90 transition-all text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        Ver Página da Igreja
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/noticias/${igreja.slug}`}
                          className="bg-primary text-white text-center py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                          Ver Notícias
                        </Link>
                        <Link
                          href={`/agenda`}
                          className="bg-secundary text-white text-center py-2 px-4 rounded-lg hover:bg-secundary/90 transition-colors text-sm font-medium"
                        >
                          Ver Eventos
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
