import { create } from 'zustand'
import Cookies from 'js-cookie'
import { Contato } from '@/data/types/contato'
import { New } from '@/data/types/new'

import { SobreLider } from '@/data/types/sobrelider'
import { Ministerio } from '@/data/types/ministerio'
import { Agenda } from '@/data/types/agenda'
import { Testemunho } from '@/data/types/testemunho'

interface SearchState {
  search: string
  setSearch: (query: string) => void
}

interface DataState {
  data: New[]
  setData: (state: New[] | ((prevData: New[]) => New[])) => void
}

interface LocalState {
  local: string
  setLocal: (state: string) => void
}

interface LoadingState {
  loading: boolean
  setLoading: (state: boolean) => void
}

interface DataSearchState {
  dataSearch: New[]
  setDataSearch: (state: New[] | ((prevData: New[]) => New[])) => void
}

interface OpenNewState {
  openNew: boolean
  setOpenNew: (state: boolean) => void
}

interface DataContatoState {
  dataContato: Contato[]
  setDataContato: (state: Contato[]) => void
}

interface ShowModalState {
  showModal: string | null
  setShowModal: (state: string | null) => void
}

interface MenuState {
  menu: boolean
  setMenu: (state: boolean) => void
}

interface DataSobreState {
  dataSobre: SobreLider[]
  setDataSobre: (state: SobreLider[]) => void
}

interface ActivePageState {
  activePage: string
  setActivePage: (state: string) => void
}

interface CurrentPageState {
  currentPage: number
  setCurrentPage: (state: number) => void
}

interface DataLineState {
  dataLine: New[]
  setDataLine: (state: New[]) => void
}

interface DataMinisterioState {
  dataMinisterio: Ministerio[]
  setDataMinisterio: (
    state: Ministerio[] | ((prevData: Ministerio[]) => Ministerio[]),
  ) => void
}

interface DataAgendaState {
  dataAgenda: Agenda[]
  setDataAgenda: (state: Agenda[] | ((prevData: Agenda[]) => Agenda[])) => void
}

interface DataTestemunhoState {
  dataTestemunho: Testemunho[]
  setDataTestemunho: (state: Testemunho[]) => void
}

export const useShowModal = create<ShowModalState>((set) => ({
  showModal: null,
  setShowModal: (state) => set({ showModal: state }),
}))

export const useSearch = create<SearchState>((set) => ({
  search: '',
  setSearch: (query) => set({ search: query }),
}))

export const useData = create<DataState>((set) => ({
  data: [],
  setData: (state) => {
    if (typeof state === 'function') {
      set((prev) => ({ data: state(prev.data) }))
    } else {
      set({ data: state })
    }
  },
}))

export const useLocal = create<LocalState>((set) => {
  const cookieValue = Cookies.get('local')
  const initialValue = cookieValue || 'VILADAPENHA'

  return {
    local: initialValue,
    setLocal: (state) => {
      set({ local: state })
      Cookies.set('local', state, { expires: 7 })
    },
  }
})

export const useLoading = create<LoadingState>((set) => ({
  loading: true,
  setLoading: (state) => set({ loading: state }),
}))

export const useDataSearch = create<DataSearchState>((set) => ({
  dataSearch: [],
  setDataSearch: (state) => {
    if (typeof state === 'function') {
      set((prev) => ({ dataSearch: state(prev.dataSearch) }))
    } else {
      set({ dataSearch: state })
    }
  },
}))

export const useOpenNew = create<OpenNewState>((set) => ({
  openNew: false,
  setOpenNew: (state) => set({ openNew: state }),
}))

export const useDataContato = create<DataContatoState>((set) => ({
  dataContato: [],
  setDataContato: (state) => set({ dataContato: state }),
}))

export const useMenu = create<MenuState>((set) => ({
  menu: false,
  setMenu: (state) => set({ menu: state }),
}))

export const useDataSobre = create<DataSobreState>((set) => ({
  dataSobre: [],
  setDataSobre: (state) => set({ dataSobre: state }),
}))

export const useActivePage = create<ActivePageState>((set) => ({
  activePage: '',
  setActivePage: (state) => set({ activePage: state }),
}))

export const useCurrentPage = create<CurrentPageState>((set) => ({
  currentPage: 1,
  setCurrentPage: (state) => set({ currentPage: state }),
}))

export const useDataLine = create<DataLineState>((set) => ({
  dataLine: [],
  setDataLine: (state) => set({ dataLine: state }),
}))

export const useDataMinisterio = create<DataMinisterioState>((set) => ({
  dataMinisterio: [],
  setDataMinisterio: (state) => {
    if (typeof state === 'function') {
      set((prev) => ({ dataMinisterio: state(prev.dataMinisterio) }))
    } else {
      set({ dataMinisterio: state })
    }
  },
}))

export const useDataAgenda = create<DataAgendaState>((set) => ({
  dataAgenda: [],
  setDataAgenda: (state) => {
    if (typeof state === 'function') {
      set((prev) => ({ dataAgenda: state(prev.dataAgenda) }))
    } else {
      set({ dataAgenda: state })
    }
  },
}))

export const useDataTestemunho = create<DataTestemunhoState>((set) => ({
  dataTestemunho: [],
  setDataTestemunho: (state) => set({ dataTestemunho: state }),
}))
