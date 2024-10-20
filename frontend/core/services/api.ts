import axios from 'axios'
import { env } from '../constants/env'

export const api = axios.create({
  baseURL: env.API_URL,
})
