'use client'
import { wl } from '@/lib/wl'
import { ChevronDown, MoveLeft } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import HomeIcon from '../icons/home'
import CooperFilmeIcon from '../icons/logo'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'

const TriggerComponent = ({
  expand,
  path,
  children,
  onClick,
}: {
  expand: boolean
  path: string
  children: ReactNode
  onClick?: () => void
}) => {
  return expand ? (
    <AccordionTrigger
      showArrow={false}
      className="py-0 flex w-full hover:no-underline hover:bg-grays-10"
    >
      {children}
    </AccordionTrigger>
  ) : (
    <Link
      className="w-full py-0 flex hover:bg-grays-10"
      href={path}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export default function SideBar() {
  const path = usePathname()
  const { replace } = useRouter()

  const sideMenuOptions = [
    {
      name: 'Inicio',
      icon: HomeIcon({
        className: path === '/home' ? 'fill-[#1C3D6C]' : 'fill-[#909090]',
      }),
      expand: false,
      path: '/home',
    },
  ]

  function handleSignOut() {
    replace('/')
    signOut()
  }

  return (
    <div className="w-screen bg-background border-r flex flex-col border-grays-30 h-[calc(90dvh_-_2rem)] relative lg:w-60 lg:min-w-60 lg:h-screen">
      <div className="w-full border-b border-grays-30 flex items-start justify-start h-fit px-6 lg:h-36 lg:items-center lg:justify-center">
        <div className="hidden lg:block rounded-full">
          <Link className="cursor-pointer rounded-full h-2" href="/home">
            <CooperFilmeIcon/>
          </Link>
        </div>
      </div>

      <Accordion type="single" collapsible asChild>
        <div className="w-full mt-5 flex-1 overflow-y-auto scrollbar-hide lg:mt-6">
          <p className="px-6 mb-5 block text-[#49657E] font-medium text-sm lg:hidden">
            Menu
          </p>
          {sideMenuOptions
            .map((data, index) => (
              <AccordionItem
                value={data.name}
                key={index}
                className="w-full mb-2 border-b-0"
              >
                <TriggerComponent
                  expand={data.expand}
                  path={data.path as string}
                >
                  <div
                    className={`w-full h-12 flex px-6 items-center hover:bg-grays-10 ${path === '/home' && index === 0 && wl({ className: 'border-r-2 bg-brand/5', uses: ['border', 'bgOutline'] })}`}
                  >
                    {data.icon}
                    <p
                      className={`ml-4 text-sm ${path === '/home' && index === 0 ? wl({ className: 'font-medium', uses: ['text'] }) : 'text-grays-50 font-normal'}`}
                    >
                      {data.name}
                    </p>
                  </div>
                  {data.expand && (
                    <ChevronDown className="size-5 mr-4 self-center" />
                  )}
                </TriggerComponent>
              </AccordionItem>
            ))}
        </div>
      </Accordion>

      <div className="w-full border-t border-grays-30 py-7  bg-background flex sticky bottom-0 justify-center lg:justify-start lg:py-14">
        <button
          onClick={() => handleSignOut()}
          className="flex items-center h-fit gap-4 ml-6 cursor-pointer text-grays-60 self-center"
        >
          <MoveLeft className="size-5" />
          <p className="font-medium">Sair da conta</p>
        </button>
      </div>
    </div>
  )
}
