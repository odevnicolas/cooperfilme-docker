import { useQuery } from '@tanstack/react-query'
import { Paginated } from '../models/paginated'
import { Script } from '../models/script'
import { useScriptsStore } from '../stores/scriptStore'
import { useApi } from './useApi'
import { usePagination } from './usePagination'
import { useSession } from 'next-auth/react'
import { AuthResponse } from '../models/login'

export function useScripts() {
  const { api } = useApi()
  const paging = usePagination()
  const session = useSession()

  const scripts = useScriptsStore.getState().scripts
  const filters = useScriptsStore.getState().filters
  const setScripts = useScriptsStore.getState().actions.setScripts
  const setFilters = useScriptsStore.getState().actions.updateFilters
  const scriptSheetActive = useScriptsStore.getState().ScriptSheetActive
  const setScriptSheetActive = useScriptsStore.getState().actions.setScriptSheetActive


  async function fetchScripts() {
    const result = await api.get<Paginated<Script>>(
      `/script/all/${(session.data?.user as AuthResponse)?.acess.id}?order=asc&orderBy=createdAt`,
      {
        params: {
          name: filters.search,
          page: paging.page,
        },
      },
    )
    console.log('teste', result.data)
    const scripts = result.data
    setScripts(scripts)
    return scripts
  }

  const {
    isLoading: isLoadingScripts,
    isFetching: isFetchingScripts,
    refetch: refetchScripts,
  } = useQuery({
    queryKey: ['@cooperfilme-eureka:scripts', filters],
    queryFn: fetchScripts,
  });


  function handleSearch(value: string) {
    setFilters({ search: value })
  }

  return {
    scripts,
    isLoadingScripts,
    isFetchingScripts,
    handleSearch,
    refetchScripts,
    paging,
    scriptSheetActive,
    setScriptSheetActive,
  }
}
