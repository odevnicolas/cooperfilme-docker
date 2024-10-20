import axios from 'axios'
import { env } from '../constants/env'
import { AuthLoginRequest, AuthResponse } from '../models/login'

export async function authenticate(data: AuthLoginRequest) {
  const result = await axios.post<AuthResponse>(env.LOGIN_URL as string, {
    ...data,
  })
  return result.data
}
