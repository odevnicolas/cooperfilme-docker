import { create } from 'zustand'

type LayoutStoreData = {
  isSidebarOpened: boolean
  actions: {
    setIsSidebarOpened: (opened: boolean) => void
  }
}

export const useLayoutStore = create<LayoutStoreData>((set) => ({
  isSidebarOpened: false,
  actions: {
    setIsSidebarOpened(opened: boolean) {
      set({
        isSidebarOpened: opened,
      })
    },
  },
}))
