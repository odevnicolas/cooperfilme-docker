'use client'

import { useSession } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { LoadingScreen } from './loadScreen'

export function SessionLoader({ children }: PropsWithChildren) {
  const session = useSession()
  if (session.status === 'loading') {
    return <LoadingScreen />
  }

  return children
}
