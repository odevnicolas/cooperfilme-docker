'use client'

import { AuthResponse } from '@/core/models/login'
import { IHeader } from '@/core/types/header'
import roleDescription from '@/core/utils/role-description'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

const Header: React.FC<IHeader> = ({
  className,
}) => {
  const session = useSession()

  console.log('session', session.data)
  return (
    <div className="flex flex-col gap-[44px]">
      <div
        className={cn(
          'h-fit bg-white mb-6 flex items-center justify-between sticky top-0 z-10 px-6 border-b pb-4 lg:pb-0 lg:h-[9rem]',
          className,
        )}
      >
        <div className="flex flex-col gap-3 lg:gap-0">
          <p className="text-xl leading-none font-medium lg:text-3xl lg:leading-9 lg:font-normal">
            Bem vindo, <span className='text-brand font-medium'>{(session.data?.user as AuthResponse)?.acess.name}</span>!
          </p>
          <p className="text-base text-grays-70 hidden lg:block">
            {roleDescription((session.data?.user as AuthResponse)?.acess.role)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
