'use client'

import { useState, useEffect } from 'react'
import { Calendar, Target, BookOpen, CheckCircle, Clock } from 'lucide-react'
import { toast } from 'react-toastify'
import { ConfirmModal } from './ConfirmModal'

interface ReadingPlan {
  id: string
  userId: string
  totalDays: number
  chaptersPerDay: number
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

interface ReadChapter {
  id: string
  userId: string
  bookName: string
  chapter: number
  readAt: string
}

interface ReadVerse {
  id: string
  userId: string
  bookName: string
  chapter: number
  verse: number
  readAt: string
}

const TOTAL_BIBLE_CHAPTERS = 1189 // Total de capítulos da Bíblia
const TOTAL_BIBLE_VERSES = 31102 // Total de versículos da Bíblia

export function BibliaReadingPlan() {
  const [readingPlan, setReadingPlan] = useState<ReadingPlan | null>(null)
  const [readChapters, setReadChapters] = useState<ReadChapter[]>([])
  const [readVerses, setReadVerses] = useState<ReadVerse[]>([])
  const [showPlan, setShowPlan] = useState(false)
  const [showCreatePlan, setShowCreatePlan] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [totalDays, setTotalDays] = useState(365)
  const [loading, setLoading] = useState(false)

  // Carregar plano de leitura e capítulos lidos
  const loadReadingData = async () => {
    try {
      console.log('🔄 Carregando dados de leitura...')

      const [planResponse, chaptersResponse, versesResponse] =
        await Promise.all([
          fetch('/api/bible/reading-plan'),
          fetch('/api/bible/read-chapters'),
          fetch('/api/bible/read-verses'),
        ])

      if (planResponse.ok) {
        const plan = await planResponse.json()
        console.log('📋 Plano carregado:', plan)
        setReadingPlan(plan)
      } else {
        console.log('❌ Erro ao carregar plano:', planResponse.status)
      }

      if (chaptersResponse.ok) {
        const chapters = await chaptersResponse.json()
        console.log(
          '📖 Capítulos carregados:',
          chapters.length,
          chapters.slice(0, 3),
        )
        setReadChapters(chapters)
      } else {
        console.log('❌ Erro ao carregar capítulos:', chaptersResponse.status)
      }

      if (versesResponse.ok) {
        const verses = await versesResponse.json()
        console.log(
          '📖 Versículos carregados:',
          verses.length,
          verses.slice(0, 3),
        )
        setReadVerses(verses)
      } else {
        console.log('❌ Erro ao carregar versículos:', versesResponse.status)
      }
    } catch (error) {
      console.error('Erro ao carregar dados de leitura:', error)
      toast.error('Erro ao carregar dados de leitura')
    }
  }

  useEffect(() => {
    loadReadingData()
  }, [])

  // Escutar eventos de atualização de versículos lidos
  useEffect(() => {
    const handleVersesUpdated = () => {
      loadReadingData()
    }

    window.addEventListener('versesUpdated', handleVersesUpdated)

    return () => {
      window.removeEventListener('versesUpdated', handleVersesUpdated)
    }
  }, [])

  // Escutar eventos de reset de leitura para atualizar versículos
  useEffect(() => {
    const handleReadingReset = () => {
      loadReadingData()
      // Disparar evento para atualizar versículos
      window.dispatchEvent(new CustomEvent('versesUpdated'))
    }

    window.addEventListener('readingReset', handleReadingReset)

    return () => {
      window.removeEventListener('readingReset', handleReadingReset)
    }
  }, [])

  // Calcular estatísticas
  const calculateStats = () => {
    const totalReadChapters = readChapters.length
    const totalReadVerses = readVerses.length
    const chaptersPercentage = Math.round(
      (totalReadChapters / TOTAL_BIBLE_CHAPTERS) * 100,
    )
    const versesPercentage = Math.round(
      (totalReadVerses / TOTAL_BIBLE_VERSES) * 100,
    )

    console.log('🔍 Dados carregados:', {
      totalReadChapters,
      totalReadVerses,
      readChapters: readChapters.slice(0, 3), // Primeiros 3 para debug
      readVerses: readVerses.slice(0, 3), // Primeiros 3 para debug
    })

    if (!readingPlan)
      return {
        totalReadChapters,
        totalReadVerses,
        chaptersPercentage,
        versesPercentage,
        chaptersPerDay: 0,
        versesPerDay: 0,
        daysRemaining: 0,
        isOnTrack: true,
        progressMessage: '',
        expectedChaptersByToday: 0,
        expectedVersesByToday: 0,
      }

    const startDate = new Date(readingPlan.startDate)
    const endDate = new Date(readingPlan.endDate)
    const today = new Date()

    // Dias restantes até o fim do plano
    const daysRemaining = Math.max(
      0,
      Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    )

    // Dias já passados desde o início (mais preciso)
    const daysElapsed = Math.max(
      0,
      Math.floor(
        (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ),
    )

    // Capítulos restantes
    const chaptersRemaining = TOTAL_BIBLE_CHAPTERS - totalReadChapters

    // Versículos restantes
    const versesRemaining = TOTAL_BIBLE_VERSES - totalReadVerses

    // Calcular o que deveria ter sido lido até hoje (mais preciso)
    const expectedChaptersByToday = Math.floor(
      (TOTAL_BIBLE_CHAPTERS / readingPlan.totalDays) * daysElapsed,
    )
    const expectedVersesByToday = Math.floor(
      (TOTAL_BIBLE_VERSES / readingPlan.totalDays) * daysElapsed,
    )

    // Verificar se está no ritmo
    const isOnTrack = totalReadChapters >= expectedChaptersByToday

    // Calcular objetivos diários baseados no progresso atual
    let chaptersPerDay = 0
    let versesPerDay = 0
    let progressMessage = ''

    if (daysRemaining > 0) {
      // Capítulos por dia necessários para terminar no prazo (mais preciso)
      chaptersPerDay = Math.ceil(chaptersRemaining / daysRemaining)

      // Versículos por dia necessários para terminar no prazo (mais preciso)
      versesPerDay = Math.ceil(versesRemaining / daysRemaining)

      if (isOnTrack) {
        const chaptersAhead = totalReadChapters - expectedChaptersByToday
        progressMessage = `No ritmo! ${chaptersAhead > 0 ? `${chaptersAhead} capítulos à frente! ` : ''}Continue lendo ${chaptersPerDay} capítulos por dia.`
      } else {
        const chaptersBehind = expectedChaptersByToday - totalReadChapters
        progressMessage = `Atrasado ${chaptersBehind} capítulos. Leia ${chaptersPerDay} capítulos por dia para recuperar.`
      }
    } else if (daysRemaining === 0) {
      progressMessage = 'Prazo finalizado hoje!'
    }

    // Log para debug
    console.log('📊 Debug do Plano de Leitura:', {
      totalReadChapters,
      totalReadVerses,
      daysElapsed,
      daysRemaining,
      expectedChaptersByToday,
      expectedVersesByToday,
      chaptersRemaining,
      versesRemaining,
      chaptersPerDay,
      versesPerDay,
      isOnTrack,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      today: today.toISOString(),
      readingPlanTotalDays: readingPlan.totalDays,
    })

    return {
      totalReadChapters,
      totalReadVerses,
      chaptersPercentage,
      versesPercentage,
      chaptersPerDay,
      versesPerDay,
      daysRemaining,
      isOnTrack,
      progressMessage,
      expectedChaptersByToday,
      expectedVersesByToday,
    }
  }

  const {
    totalReadChapters,
    totalReadVerses,
    chaptersPercentage,
    versesPercentage,
    chaptersPerDay,
    versesPerDay,
    daysRemaining,
    isOnTrack,
    progressMessage,
    expectedChaptersByToday,
    expectedVersesByToday,
  } = calculateStats()

  // Atualizar dados automaticamente a cada 5 minutos para recalcular objetivos diários
  useEffect(() => {
    const interval = setInterval(
      () => {
        loadReadingData()
      },
      5 * 60 * 1000,
    ) // 5 minutos

    return () => clearInterval(interval)
  }, [])

  // Atualizar também quando a página ganha foco (usuário volta à aba)
  useEffect(() => {
    const handleFocus = () => {
      loadReadingData()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Criar novo plano de leitura
  const createReadingPlan = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/bible/reading-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalDays,
        }),
      })

      if (response.ok) {
        await loadReadingData()
        setShowCreatePlan(false)
        setShowPlan(true)
        toast.success('Plano de leitura criado com sucesso!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao criar plano de leitura')
      }
    } catch (error) {
      console.error('Erro ao criar plano:', error)
      toast.error('Erro ao criar plano de leitura')
    } finally {
      setLoading(false)
    }
  }

  // Deletar plano de leitura
  const deleteReadingPlan = async () => {
    if (!readingPlan) return

    try {
      const response = await fetch(
        `/api/bible/reading-plan?id=${readingPlan.id}`,
        {
          method: 'DELETE',
        },
      )

      if (response.ok) {
        setReadingPlan(null)
        setShowPlan(false)
        toast.success('Plano de leitura deletado com sucesso!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erro ao deletar plano')
      }
    } catch (error) {
      console.error('Erro ao deletar plano:', error)
      toast.error('Erro ao deletar plano')
    }
  }

  // Resetar dados de leitura
  const handleResetReading = async () => {
    try {
      const response = await fetch('/api/bible/reset-reading', {
        method: 'POST',
      })

      if (response.ok) {
        const result = await response.json()
        toast.success(
          `Leitura resetada com sucesso! ${result.removed.verses} versículos e ${result.removed.chapters} capítulos removidos.`,
        )

        // Recarregar dados
        await loadReadingData()

        // Disparar evento específico de reset para atualizar versículos
        window.dispatchEvent(new CustomEvent('readingReset'))
      } else {
        const error = await response.json()
        toast.error('Erro ao resetar leitura: ' + error.error)
      }
    } catch (error) {
      console.error('Erro ao resetar leitura:', error)
      toast.error('Erro ao resetar leitura')
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Plano de Leitura
          </h3>
          <div className="flex gap-2">
            {!readingPlan ? (
              <button
                onClick={() => setShowCreatePlan(!showCreatePlan)}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Criar Plano
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowPlan(!showPlan)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {showPlan ? 'Ocultar' : 'Ver Plano'}
                </button>

                {/* Botão de Reset de Leitura */}
                {(totalReadChapters > 0 || totalReadVerses > 0) && (
                  <button
                    onClick={() => setShowResetModal(true)}
                    className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    title="Resetar dados de leitura (mantém o plano)"
                  >
                    🔄 Reset Leitura
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-700 dark:text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Capítulos Lidos
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-600">
              {chaptersPercentage}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {totalReadChapters} de {TOTAL_BIBLE_CHAPTERS} capítulos
            </div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-purple-700 dark:text-purple-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Versículos Lidos
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-600">
              {versesPercentage}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {totalReadVerses} de {TOTAL_BIBLE_VERSES} versículos
            </div>
          </div>

          {readingPlan && (
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-green-700 dark:text-green-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dias Restantes
                </span>
              </div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-600">
                {daysRemaining}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                até {new Date(readingPlan.endDate).toLocaleDateString('pt-BR')}
              </div>
            </div>
          )}

          {readingPlan && (
            <div
              className={`p-4 rounded-lg ${
                isOnTrack
                  ? 'bg-green-100 dark:bg-green-900/20'
                  : 'bg-red-100 dark:bg-red-900/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target
                  className={`w-4 h-4 ${isOnTrack ? 'text-green-700 dark:text-green-600' : 'text-red-700 dark:text-red-600'}`}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </span>
              </div>
              <div
                className={`text-lg font-bold ${isOnTrack ? 'text-green-700 dark:text-green-600' : 'text-red-700 dark:text-red-600'}`}
              >
                {isOnTrack ? 'No Ritmo!' : 'Atrasado'}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {progressMessage}
              </div>
            </div>
          )}
        </div>

        {/* Objetivos Diários */}
        {readingPlan && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-orange-700 dark:text-orange-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Capítulos/Dia
                </span>
              </div>
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-600">
                {chaptersPerDay}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                para terminar no prazo
              </div>
              {expectedChaptersByToday > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Esperado até hoje: {expectedChaptersByToday} capítulos
                </div>
              )}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Restantes: {TOTAL_BIBLE_CHAPTERS - totalReadChapters} capítulos
              </div>
            </div>

            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-yellow-700 dark:text-yellow-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Versículos/Dia
                </span>
              </div>
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-600">
                {versesPerDay}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                para terminar no prazo
              </div>
              {expectedVersesByToday > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Esperado até hoje: {expectedVersesByToday} versículos
                </div>
              )}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Restantes: {TOTAL_BIBLE_VERSES - totalReadVerses} versículos
              </div>
            </div>
          </div>
        )}

        {/* Progresso Atual vs Esperado */}
        {readingPlan && expectedChaptersByToday > 0 && (
          <div className="bg-indigo-100 dark:bg-indigo-900/20 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-indigo-700 dark:text-indigo-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progresso Atual vs Esperado
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Capítulos:
                </div>
                <div className="text-lg font-bold text-indigo-700 dark:text-indigo-600">
                  {totalReadChapters} / {expectedChaptersByToday}
                </div>
                <div
                  className={`text-xs ${isOnTrack ? 'text-green-700 dark:text-green-600' : 'text-red-700 dark:text-red-600'}`}
                >
                  {isOnTrack
                    ? `✅ ${totalReadChapters - expectedChaptersByToday} à frente`
                    : `⚠️ ${expectedChaptersByToday - totalReadChapters} atrasados`}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Versículos:
                </div>
                <div className="text-lg font-bold text-indigo-700 dark:text-indigo-600">
                  {totalReadVerses} / {expectedVersesByToday}
                </div>
                <div
                  className={`text-xs ${
                    totalReadVerses >= expectedVersesByToday
                      ? 'text-green-700 dark:text-green-600'
                      : 'text-red-700 dark:text-red-600'
                  }`}
                >
                  {totalReadVerses >= expectedVersesByToday
                    ? `✅ ${totalReadVerses - expectedVersesByToday} à frente`
                    : `⚠️ ${expectedVersesByToday - totalReadVerses} atrasados`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Criar Plano */}
        {showCreatePlan && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-gray-800 dark:text-white mb-3">
              Criar Novo Plano de Leitura
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Em quantos dias você quer terminar a Bíblia?
                </label>
                <input
                  type="number"
                  min="1"
                  max="3650"
                  value={totalDays}
                  onChange={(e) => setTotalDays(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Aproximadamente {Math.ceil(TOTAL_BIBLE_CHAPTERS / totalDays)}{' '}
                  capítulos por dia
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={createReadingPlan}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Criando...' : 'Criar Plano'}
                </button>
                <button
                  onClick={() => setShowCreatePlan(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detalhes do Plano */}
        {showPlan && readingPlan && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-800 dark:text-white">
                Detalhes do Plano
              </h4>
              <button
                onClick={deleteReadingPlan}
                className="text-red-500 hover:text-red-700 text-sm transition-colors"
              >
                Deletar Plano
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Início:
                </span>
                <span className="ml-2 text-gray-800 dark:text-white">
                  {new Date(readingPlan.startDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Fim:</span>
                <span className="ml-2 text-gray-800 dark:text-white">
                  {new Date(readingPlan.endDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Duração:
                </span>
                <span className="ml-2 text-gray-800 dark:text-white">
                  {readingPlan.totalDays} dias
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Capítulos por dia:
                </span>
                <span className="ml-2 text-gray-800 dark:text-white">
                  {readingPlan.chaptersPerDay}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Barra de Progresso */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Progresso Geral</span>
            <span>{versesPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${versesPercentage}%` }}
            ></div>
          </div>

          {readingPlan && expectedChaptersByToday > 0 && (
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Progresso vs Esperado</span>
                <span>
                  {totalReadChapters} / {expectedChaptersByToday} capítulos
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isOnTrack ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{
                    width: `${Math.min(100, (totalReadChapters / expectedChaptersByToday) * 100)}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {isOnTrack
                  ? `✅ ${totalReadChapters - expectedChaptersByToday} capítulos à frente!`
                  : `⚠️ ${expectedChaptersByToday - totalReadChapters} capítulos atrasados`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleResetReading}
        title="Resetar Dados de Leitura"
        message={`⚠️ ATENÇÃO: Esta ação irá resetar seus dados de leitura!

• Todos os versículos marcados como lidos serão desmarcados
• Todos os capítulos marcados como lidos serão desmarcados
• Seu plano de leitura será MANTIDO
• Esta ação NÃO pode ser desfeita

Tem certeza que deseja continuar?`}
        confirmText="Resetar Leitura"
        cancelText="Cancelar"
        type="warning"
      />
    </>
  )
}

// Componente para o botão de marcar como lido (usado no VerseDisplay)
export function MarkAsReadButton({
  isRead,
  onMarkAsRead,
}: {
  isRead: boolean
  onMarkAsRead: () => void
}) {
  return (
    <button
      onClick={onMarkAsRead}
      className={`px-2 py-1 text-xs rounded transition-all duration-200 flex-shrink-0 ${
        isRead
          ? 'bg-green-500 text-white hover:bg-green-600 shadow-sm'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isRead ? 'Capítulo já lido' : 'Marcar como lido'}
    >
      {isRead ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <BookOpen className="w-3 h-3" />
      )}
    </button>
  )
}
