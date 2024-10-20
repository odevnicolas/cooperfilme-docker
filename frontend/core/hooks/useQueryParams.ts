import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useQueryParams() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  return {
    get(key: string) {
      return searchParams.get(key)
    },
    push(params: Record<string, string>) {
      const current = new URLSearchParams(Array.from(searchParams.entries()))

      Object.entries(params).forEach(([key, value]) => {
        current.set(key, value)
      })

      const search = current?.toString() || ''
      const query = search ? `?${search}` : ''
      router.push(`${pathname}${query}`)
    },
  }
}
