'use client'
import { loginResolver } from '@/core/models/login'
import { wl } from '@/lib/wl'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn as nextAuthSignIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { FieldError } from './fieldError'
import { Spinner } from './spinner'

type AuthCredentials = z.infer<typeof loginResolver>

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const { replace } = useRouter()
    const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthCredentials>({
    resolver: zodResolver(loginResolver),
  })

  async function signIn(data: AuthCredentials) {
    setLoading(true)
    console.log(data)
    const result = await nextAuthSignIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: '/home',
    })
    console.log(result)
    setLoading(false)

    if (result?.error) {
      toast.error(
        (
          JSON.parse(result?.error || '') as unknown as {
            message: string
          }
        )?.message || 'Usuário ou senha inválido(s)',
      )
      return
    }
    replace('/home')
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col bg-white w-full border-0 rounded shadow-none py-16 px-6 lg:w-[30rem] lg:px-10 lg:border lg:shadow-sm"
        onSubmit={handleSubmit(signIn)}
      >
        <h1 className="text-[28px] text-neutral-950 font-medium leading-none">
          Logar no{' '}
          <strong
            className={wl({
              className: 'font-medium text-brand',
              uses: ['text'],
            })}
          >
            COOPERFILME
          </strong>
        </h1>
        <p className="text-neutral-400 text-base mt-4 font-normal">
          Bem vindo de volta
        </p>

        <div className="flex flex-col mt-10 gap-6 lg:mt-16 lg:gap-8">
          <div className="flex flex-col gap-4">
            <Label htmlFor="">Usuário <span className='text-brand'>*</span></Label>
            <Input type="text" placeholder="usuário ou email" {...register('username')} />
            <FieldError>{errors?.username?.message}</FieldError>
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="">Senha <span className='text-brand'>*</span></Label>
            <Input
              type="password"
              placeholder="Senha"
              {...register('password')}
            />
            <FieldError>{errors?.password?.message}</FieldError>
          </div>

          <div>
            <Button type="submit" className=" bg-brand w-full" disabled={loading}>
              {loading ? <Spinner /> : 'Entrar'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
