import { create } from 'zustand'
import { Paginated } from '../models/paginated'
import { Script } from '../models/script'

type Filters = {
  search?: string
}

type ScriptStoreData = {
  scripts: Paginated<Script>
  ScriptSheetActive: boolean
  filters: Filters
  actions: {
    setScriptSheetActive: (active: boolean) => void
    setScripts: (scripts: Paginated<Script>) => void
    updateFilters: (partialFilter: Partial<Filters>) => void
  }
}

export const useScriptsStore = create<ScriptStoreData>((set) => ({
  scripts: {
    count: 0,
    rows: [],
  },
  ScriptSheetActive: false,
  filters: { search: '' },
  actions: {
    setScripts(scripts) {
      set({
        scripts,
      })
    },
    updateFilters(partialFilter) {
      set((state) => ({
        filters: { ...state.filters, ...partialFilter },
      }))
    },
    setScriptSheetActive(active) {
      set({ScriptSheetActive: active})
    }
  },
}))
