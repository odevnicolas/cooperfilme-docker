import { z } from 'zod';

export const loginResolver = z.object({
  username: z.string().min(1, 'Campo obrigatório'),
  password: z.string().min(12, 'Campo obrigatório'),
})

export type AuthLoginRequest = z.infer<typeof loginResolver>

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  scripts?: string[];
}
export interface AuthResponse {
  token: string;
  expiresIn: number;
  acess: User
}
