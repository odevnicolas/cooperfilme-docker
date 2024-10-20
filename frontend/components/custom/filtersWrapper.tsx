import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type Props = {
  className?: string
}

export function FiltersWrapper({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        'px-5 pt-5 pb-8 flex flex-col items-start justify-start shadow-none border-b gap-3 border-[#DAE4ED] lg:flex-row lg:justify-between lg:items-center lg:gap-0 lg:px-6 lg:shadow-border-b lg:pt-5 lg:pb-5',
        className,
      )}
    >
      {children}
    </div>
  )
}
