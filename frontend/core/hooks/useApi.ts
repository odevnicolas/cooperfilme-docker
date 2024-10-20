'use client'
import { useSession } from 'next-auth/react'
import { AuthResponse } from '../models/login'
import { api } from '../services/api'

export function useApi() {
  const session = useSession()
  const token = (session.data?.user as AuthResponse)?.token
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  if (session.status === 'authenticated') {
    api.defaults.headers.common = headers
  } else {
    api.defaults.headers.common = {}
  }

  return {
    api,
  }
}
