/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { queryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'
import { SessionLoader } from './sessionLoad'

export function GlobalProviders({ children }: PropsWithChildren) {

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SessionLoader>{children}</SessionLoader>
        <ToastContainer />
      </QueryClientProvider>
    </SessionProvider>
  )
}
