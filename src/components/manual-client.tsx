'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useToken } from '@/hooks/useToken'
import {
  FaBook,
  FaSearch,
  FaList,
  FaChevronRight,
  FaTimes,
  FaDownload,
} from 'react-icons/fa'
import html2pdf from 'html2pdf.js'

import jsPDF from 'jspdf'

interface ManualSection {
  id: string
  title: string
  level: number
  content: string
  subsections?: ManualSection[]
}

interface ManualClientProps {
  manualContent: string
}

export default function ManualClient({ manualContent }: ManualClientProps) {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState<string>('')
  const [sections, setSections] = useState<ManualSection[]>([])
  const [showSidebar, setShowSidebar] = useState(true)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const router = useRouter()
  const token = useToken()

  useEffect(() => {
    if (token) {
      if (token.role !== 'SUPERADMIN') {
        router.push('/login')
        return
      }
      setLoading(true)
      // Usar setTimeout para garantir que o loading seja renderizado
      setTimeout(() => {
        parseManual(manualContent)
        setLoading(false)
      }, 100)
    }
  }, [token, router, manualContent])

  const parseManual = (content: string) => {
    const lines = content.split('\n')
    const parsedSections: ManualSection[] = []
    let currentSection: ManualSection | null = null
    let currentSubsection: ManualSection | null = null
    let currentContent: string[] = []
    let subsectionContent: string[] = []

    const createId = (title: string) => {
      return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]+/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    }

    const saveCurrentSubsection = () => {
      if (currentSubsection && currentSection) {
        currentSubsection.content = subsectionContent.join('\n')
        if (!currentSection.subsections) {
          currentSection.subsections = []
        }
        currentSection.subsections.push(currentSubsection)
        currentSubsection = null
        subsectionContent = []
      }
    }

    const saveCurrentSection = () => {
      saveCurrentSubsection()
      if (currentSection) {
        currentSection.content = currentContent.join('\n')
        parsedSections.push(currentSection)
      }
    }

    lines.forEach((line) => {
      const trimmedLine = line.trim()

      // Seção principal (# Título) - apenas uma #, não ##
      if (trimmedLine.match(/^#\s+/) && !trimmedLine.match(/^##/)) {
        // Salvar seção anterior
        if (currentSection) {
          saveCurrentSection()
        }

        const title = trimmedLine.replace(/^#+\s+/, '').trim()

        // Se for a primeira seção, criar ela mesmo assim
        currentSection = {
          id: createId(title),
          title,
          level: 1,
          content: '',
        }
        currentContent = []
        currentSubsection = null
        subsectionContent = []
      }
      // Subseção (## Título) - exatamente duas #
      else if (
        trimmedLine.match(/^##\s+/) &&
        !trimmedLine.match(/^###/) &&
        currentSection
      ) {
        // Salvar subseção anterior
        saveCurrentSubsection()

        const title = trimmedLine.replace(/^##+\s+/, '').trim()
        // Pular o índice e guia completo
        if (title.includes('Índice') || title.includes('Guia Completo')) {
          return
        }

        currentSubsection = {
          id: createId(title),
          title,
          level: 2,
          content: '',
        }
        subsectionContent = []
      }
      // Conteúdo
      else {
        // Pular linhas do índice
        if (
          trimmedLine.includes('📋 Índice') ||
          trimmedLine === '## 📋 Índice' ||
          trimmedLine.match(/^\d+\.\s*\[/) ||
          (trimmedLine.includes('Guia Completo') &&
            trimmedLine.includes('Usuários'))
        ) {
          return
        }

        if (currentSubsection) {
          subsectionContent.push(line)
        } else if (currentSection) {
          currentContent.push(line)
        }
      }
    })

    // Salvar última seção
    saveCurrentSection()

    setSections(parsedSections)
    setLoading(false)
  }

  const renderMarkdown = (content: string) => {
    if (!content) return ''

    let html = content

    // Remover emojis dos títulos (já renderizados separadamente)
    html = html.replace(/^###\s+(.*$)/gim, (match, title) => {
      const cleanTitle = title
        .replace(/[\u{1F534}\u{1F7E1}\u{1F7E2}\u{1F4CB}]/gu, '')
        .trim()
      return `### ${cleanTitle}`
    })

    // Headers
    html = html.replace(
      /^####\s+(.*$)/gim,
      '<h4 class="text-lg font-bold mt-5 mb-2 text-textlight dark:text-textdark">$1</h4>',
    )
    html = html.replace(
      /^###\s+(.*$)/gim,
      '<h3 class="text-xl font-bold mt-6 mb-3 text-textlight dark:text-textdark">$1</h3>',
    )
    html = html.replace(
      /^##\s+(.*$)/gim,
      '<h2 class="text-2xl font-bold mt-8 mb-4 text-textlight dark:text-textdark border-b border-gray-200 dark:border-gray-700 pb-2">$1</h2>',
    )
    html = html.replace(
      /^#\s+(.*$)/gim,
      '<h1 class="text-3xl font-bold mt-10 mb-6 text-textlight dark:text-textdark">$1</h1>',
    )

    // Bold (**text**)
    html = html.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-bold text-textlight dark:text-textdark">$1</strong>',
    )

    // Italic (*text*)
    html = html.replace(
      /\*([^*]+)\*/g,
      '<em class="italic text-textlight dark:text-textdark">$1</em>',
    )

    // Links [text](url)
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary dark:text-secundary hover:underline font-medium">$1</a>',
    )

    // Code inline `code`
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-textlight dark:text-textdark">$1</code>',
    )

    // Horizontal rules
    html = html.replace(
      /^---$/gim,
      '<hr class="my-8 border-gray-200 dark:border-gray-700" />',
    )

    // Processar listas (precisa ser feito antes dos parágrafos)
    const lines = html.split('\n')
    const processedLines: string[] = []
    let inList = false
    let listItems: string[] = []
    let listType: 'ul' | 'ol' = 'ul'

    lines.forEach((line) => {
      const trimmed = line.trim()

      // Lista não ordenada
      if (trimmed.match(/^-\s+/)) {
        if (!inList) {
          inList = true
          listType = 'ul'
        }
        const content = trimmed.replace(/^-\s+/, '')
        listItems.push(
          `<li class="ml-6 mb-2 text-textlight dark:text-textdark">${content}</li>`,
        )
      }
      // Lista ordenada
      else if (trimmed.match(/^\d+\.\s+/)) {
        if (!inList) {
          inList = true
          listType = 'ol'
        }
        const content = trimmed.replace(/^\d+\.\s+/, '')
        listItems.push(
          `<li class="ml-6 mb-2 text-textlight dark:text-textdark">${content}</li>`,
        )
      }
      // Fim da lista
      else {
        if (inList && listItems.length > 0) {
          const listClass =
            listType === 'ul'
              ? 'list-disc space-y-2 my-4'
              : 'list-decimal space-y-2 my-4'
          processedLines.push(
            `<${listType} class="${listClass}">${listItems.join('')}</${listType}>`,
          )
          listItems = []
          inList = false
        }
        if (trimmed) {
          processedLines.push(line)
        } else {
          processedLines.push('')
        }
      }
    })

    // Fechar lista se ainda estiver aberta
    if (inList && listItems.length > 0) {
      const listClass =
        listType === 'ul'
          ? 'list-disc space-y-2 my-4'
          : 'list-decimal space-y-2 my-4'
      processedLines.push(
        `<${listType} class="${listClass}">${listItems.join('')}</${listType}>`,
      )
    }

    html = processedLines.join('\n')

    // Parágrafos (apenas linhas que não são tags HTML)
    html = html
      .split('\n\n')
      .map((block) => {
        const trimmed = block.trim()
        if (!trimmed) return ''
        if (trimmed.startsWith('<')) return block
        if (trimmed.match(/^[#-]/)) return block
        return `<p class="mb-4 text-textlight dark:text-textdark leading-relaxed">${trimmed}</p>`
      })
      .join('\n\n')

    return html
  }

  const filteredSections = useMemo(() => {
    if (!searchTerm) return sections

    const term = searchTerm.toLowerCase()
    return sections.filter((section) => {
      const matchesTitle = section.title.toLowerCase().includes(term)
      const matchesContent = section.content.toLowerCase().includes(term)
      const matchesSubsections = section.subsections?.some(
        (sub) =>
          sub.title.toLowerCase().includes(term) ||
          sub.content.toLowerCase().includes(term),
      )
      return matchesTitle || matchesContent || matchesSubsections
    })
  }, [sections, searchTerm])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 100
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }, 100)
  }

  // Detectar scroll para destacar seção ativa
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.id)
        if (element) {
          const elementTop = element.offsetTop
          if (scrollPosition >= elementTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stripHTML = (_html: string) => {
    const tmp = document.createElement('div')
    tmp.innerHTML = _html

    // Adicionar espaços antes de elementos de bloco para preservar separação
    const blockElements = tmp.querySelectorAll(
      'p, div, li, h1, h2, h3, h4, h5, h6',
    )
    blockElements.forEach((el) => {
      el.insertAdjacentText('beforebegin', ' ')
      el.insertAdjacentText('afterend', ' ')
    })

    // Substituir BR por espaço
    const brElements = tmp.querySelectorAll('br')
    brElements.forEach((br) => {
      br.replaceWith(document.createTextNode(' '))
    })

    // Extrair texto
    let text = tmp.textContent || tmp.innerText || ''

    // Normalizar espaços múltiplos em espaços únicos
    text = text.replace(/[ \t\n\r]+/g, ' ')

    return text.trim()
  }

  const downloadPDF = async () => {
    setIsGeneratingPDF(true)
    // Encontrar o elemento que contém o conteúdo do manual
    const contentElement = document.querySelector('main.flex-1') as HTMLElement

    if (!contentElement) {
      alert('Erro ao encontrar conteúdo do manual.')
      setIsGeneratingPDF(false)
      return
    }

    // Carregar logo
    let logoData: string | null = null
    let logoWidth = 0
    const logoHeight = 15

    try {
      const logoUrl = '/img/logo.png'
      const img = new Image()
      img.crossOrigin = 'anonymous'

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = logoUrl
      })

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      logoData = canvas.toDataURL('image/png')
      logoWidth = (img.width / img.height) * logoHeight
    } catch (error) {
      console.warn('Erro ao carregar logo:', error)
    }

    // Configurações para o PDF
    // Margem superior maior para logo (15mm) + margem padrão
    const opt = {
      margin: [15, 10, 10, 10] as [number, number, number, number], // top, right, bottom, left - margem inferior menor
      filename: 'Manual_do_Sistema_APG_2.0.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowHeight: contentElement.scrollHeight,
        windowWidth: contentElement.scrollWidth,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait' as const,
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: [
          '.manual-content p',
          '.manual-content li',
          '.manual-content h1',
          '.manual-content h2',
          '.manual-content h3',
          '.manual-content h4',
          '.manual-content h5',
          '.manual-content h6',
        ],
      },
    }

    // Adicionar estilos CSS para evitar quebras de página
    const style = document.createElement('style')
    style.id = 'pdf-pagebreak-styles'
    style.textContent = `
      .manual-content p {
        page-break-inside: avoid !important;
        break-inside: avoid-page !important;
        orphans: 4 !important;
        widows: 4 !important;
        margin-bottom: 0.5em !important;
      }
      .manual-content li {
        page-break-inside: avoid !important;
        break-inside: avoid-page !important;
        orphans: 3 !important;
        widows: 3 !important;
      }
      .manual-content ul,
      .manual-content ol {
        page-break-inside: avoid !important;
        break-inside: avoid-page !important;
        margin-bottom: 1em !important;
      }
      .manual-content h1,
      .manual-content h2,
      .manual-content h3,
      .manual-content h4,
      .manual-content h5,
      .manual-content h6 {
        page-break-after: avoid !important;
        break-after: avoid-page !important;
        page-break-inside: avoid !important;
        break-inside: avoid-page !important;
        margin-top: 1em !important;
        margin-bottom: 0.5em !important;
      }
      .manual-content > div {
        page-break-inside: avoid !important;
        break-inside: avoid-page !important;
      }
      .manual-content {
        page-break-inside: auto !important;
      }
    `
    // Remover estilo anterior se existir
    const existingStyle = document.getElementById('pdf-pagebreak-styles')
    if (existingStyle) {
      existingStyle.remove()
    }
    document.head.appendChild(style)

    try {
      // Gerar PDF usando html2pdf e adicionar logo/números usando callback
      await html2pdf()
        .set(opt)
        .from(contentElement)
        .toPdf()
        .get('pdf')
        .then((pdf: jsPDF) => {
          // @ts-expect-error - getNumberOfPages existe mas não está na tipagem
          const totalPages = pdf.getNumberOfPages()
          const pageWidth = pdf.internal.pageSize.getWidth()
          const pageHeight = pdf.internal.pageSize.getHeight()

          // Adicionar logo e número de página em cada página
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i)

            // Adicionar logo no topo (centralizado) - menor para não ocupar muito espaço
            if (logoData) {
              const logoX = (pageWidth - logoWidth) / 2
              // Logo menor (10mm ao invés de 15mm) posicionado em 2mm do topo
              const smallLogoHeight = 10
              const smallLogoWidth = (logoWidth / logoHeight) * smallLogoHeight
              pdf.addImage(
                logoData,
                'PNG',
                logoX,
                2,
                smallLogoWidth,
                smallLogoHeight,
              )
            }

            // Adicionar número da página no rodapé (centralizado)
            pdf.setFontSize(10)
            pdf.setTextColor(100, 100, 100)
            pdf.setFont('helvetica', 'normal')
            const pageText = `Página ${i} de ${totalPages}`
            const textWidth = pdf.getTextWidth(pageText)
            pdf.text(pageText, (pageWidth - textWidth) / 2, pageHeight - 8)
          }

          // Salvar PDF
          pdf.save('Manual_do_Sistema_APG_2.0.pdf')
          return pdf
        })
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar PDF. Por favor, tente novamente.')
    } finally {
      // Remover estilo após gerar PDF ou em caso de erro
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
      setIsGeneratingPDF(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bglight dark:bg-bgdark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary dark:border-secundary mx-auto mb-4"></div>
          <p className="text-textlight dark:text-textdark">
            Carregando manual...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bglight dark:bg-bgdark pt-20 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <FaBook className="text-4xl text-primary dark:text-secundary" />
              <div>
                <h1 className="text-3xl font-bold text-textlight dark:text-textdark">
                  Manual do Sistema APG 2.0
                </h1>
                <p className="text-textlight/70 dark:text-textdark/70 mt-1">
                  Guia completo para usuários
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadPDF}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                title="Baixar manual em PDF"
              >
                <FaDownload className="text-lg" />
                <span className="hidden sm:inline">
                  {isGeneratingPDF ? 'Gerando PDF...' : 'Baixar PDF'}
                </span>
              </button>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle sidebar"
              >
                {showSidebar ? (
                  <FaTimes className="text-xl text-gray-700 dark:text-gray-300" />
                ) : (
                  <FaList className="text-xl text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar no manual (ex: criar usuário, notícias, bíblia)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secundary focus:border-transparent bg-white dark:bg-gray-700 text-textlight dark:text-textdark placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-textlight dark:hover:text-textdark"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="mt-2 text-sm text-textlight/70 dark:text-textdark/70">
                {filteredSections.length} seção(ões) encontrada(s)
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          {showSidebar && (
            <>
              <aside className="hidden md:block w-64 flex-shrink-0">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <h2 className="text-lg font-bold text-textlight dark:text-textdark mb-4 flex items-center gap-2">
                    <FaList />
                    Índice
                  </h2>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <div key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                            activeSection === section.id
                              ? 'bg-primary dark:bg-secundary text-white'
                              : 'text-textlight dark:text-textdark hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <FaChevronRight
                            className={`text-xs transition-transform ${activeSection === section.id ? 'rotate-90' : ''}`}
                          />
                          <span className="font-medium">{section.title}</span>
                        </button>
                        {section.subsections &&
                          section.subsections.length > 0 && (
                            <div className="ml-4 mt-1 space-y-1">
                              {section.subsections.map((subsection) => (
                                <button
                                  key={subsection.id}
                                  onClick={() => scrollToSection(subsection.id)}
                                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors text-xs ${
                                    activeSection === subsection.id
                                      ? 'bg-primary/20 dark:bg-secundary/20 text-primary dark:text-secundary font-semibold'
                                      : 'text-textlight/70 dark:text-textdark/70 hover:bg-gray-50 dark:hover:bg-gray-700'
                                  }`}
                                >
                                  {subsection.title}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Mobile Sidebar */}
              <div
                className="md:hidden fixed inset-0 z-50 bg-black/50"
                onClick={() => setShowSidebar(false)}
              >
                <aside
                  className="w-80 h-full bg-white dark:bg-gray-800 shadow-xl p-4 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-textlight dark:text-textdark">
                      Índice
                    </h2>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaTimes className="text-textlight dark:text-textdark" />
                    </button>
                  </div>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <div key={section.id}>
                        <button
                          onClick={() => {
                            scrollToSection(section.id)
                            setShowSidebar(false)
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            activeSection === section.id
                              ? 'bg-primary dark:bg-secundary text-white'
                              : 'text-textlight dark:text-textdark hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {section.title}
                        </button>
                        {section.subsections &&
                          section.subsections.length > 0 && (
                            <div className="ml-4 mt-1 space-y-1">
                              {section.subsections.map((subsection) => (
                                <button
                                  key={subsection.id}
                                  onClick={() => {
                                    scrollToSection(subsection.id)
                                    setShowSidebar(false)
                                  }}
                                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors text-xs ${
                                    activeSection === subsection.id
                                      ? 'bg-primary/20 dark:bg-secundary/20 text-primary dark:text-secundary font-semibold'
                                      : 'text-textlight/70 dark:text-textdark/70 hover:bg-gray-50 dark:hover:bg-gray-700'
                                  }`}
                                >
                                  {subsection.title}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </nav>
                </aside>
              </div>
            </>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary dark:border-secundary mx-auto mb-4"></div>
                  <p className="text-textlight dark:text-textdark text-lg">
                    Carregando manual...
                  </p>
                </div>
              ) : filteredSections.length === 0 ? (
                <div className="text-center py-12">
                  <FaSearch className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-textlight dark:text-textdark text-lg">
                    Nenhum resultado encontrado para &quot;{searchTerm}&quot;
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 px-4 py-2 bg-primary dark:bg-secundary text-white rounded-lg hover:bg-primary/90 dark:hover:bg-secundary/90 transition-colors"
                  >
                    Limpar busca
                  </button>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none">
                  {filteredSections.map((section) => (
                    <div
                      key={section.id}
                      id={section.id}
                      className="mb-12 scroll-mt-24"
                    >
                      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-textlight dark:text-textdark border-b-2 border-primary dark:border-secundary pb-3">
                        {section.title}
                      </h1>
                      <div
                        className="manual-content text-textlight dark:text-textdark"
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdown(section.content),
                        }}
                      />
                      {section.subsections &&
                        section.subsections.length > 0 && (
                          <div className="mt-8 space-y-10">
                            {section.subsections.map((subsection) => (
                              <div
                                key={subsection.id}
                                id={subsection.id}
                                className="scroll-mt-24"
                              >
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-textlight dark:text-textdark border-b border-gray-200 dark:border-gray-700 pb-2">
                                  {subsection.title}
                                </h2>
                                <div
                                  className="manual-content text-textlight dark:text-textdark"
                                  dangerouslySetInnerHTML={{
                                    __html: renderMarkdown(subsection.content),
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
