import { Url } from 'next/dist/shared/lib/router/router'

export interface IHeader {
  isHome?: boolean | undefined
  category?: string
  page?: string
  className?: string
  title?: string
  backRoute?: Url
}
