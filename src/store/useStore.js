import { create } from 'zustand'
import Cookies from 'js-cookie'

export const useSearch = create((set) => ({
  search: '',
  setSearch: (query) => set({ search: query }),
}))

export const useData = create((set) => ({
  data: [],
  setData: (state) => set({ data: state }),
}))

export const useLocal = create((set) => {
  const cookieValue = Cookies.get('local')
  const initialValue = cookieValue || 'viladapenha'

  return {
    local: initialValue,
    setLocal: (state) => {
      set({ local: state })
      Cookies.set('local', state, { expires: 7 })
    },
  }
})

export const useLoading = create((set) => ({
  loading: true,
  setLoading: (state) => set({ loading: state }),
}))

export const useDataSearch = create((set) => ({
  dataSearch: [],
  setDataSearch: (state) => set({ dataSearch: state }),
}))

export const useOpenNew = create((set) => ({
  openNew: false,
  setOpenNew: (state) => set({ openNew: state }),
}))

export const useDataContato = create((set) => ({
  dataContato: [],
  setDataContato: (state) => set({ dataContato: state }),
}))

export const useMenu = create((set) => ({
  menu: false,
  setMenu: (state) => set({ menu: state }),
}))

export const useDataSobre = create((set) => ({
  dataSobre: [],
  setDataSobre: (state) => set({ dataSobre: state }),
}))

export const useActivePage = create((set) => ({
  activePage: '',
  setActivePage: (state) => set({ activePage: state }),
}))

export const useCurrentPage = create((set) => ({
  currentPage: 1,
  setCurrentPage: (state) => set({ currentPage: state }),
}))

export const useDataLine = create((set) => ({
  dataLine: [],
  setDataLine: (state) => set({ dataLine: state }),
}))

export const useDataMinisterio = create((set) => ({
  dataMinisterio: [],
  setDataMinisterio: (state) => set({ dataMinisterio: state }),
}))

export const useDataAgenda = create((set) => ({
  dataAgenda: [],
  setDataAgenda: (state) => set({ dataAgenda: state }),
}))

export const useDataTestemunho = create((set) => ({
  dataTestemunho: [],
  setDataTestemunho: (state) => set({ dataTestemunho: state }),
}))
