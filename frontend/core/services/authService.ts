import axios from 'axios'
import { AuthLoginRequest, AuthResponse } from '../models/login'

export async function authenticate(data: AuthLoginRequest) {
  const result = await axios.post<AuthResponse>('http://backend:3333/auth/singin', {
    ...data,
  })
  return result.data
}
