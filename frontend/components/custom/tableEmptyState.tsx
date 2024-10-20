import { PropsWithChildren } from 'react'
import { Flag } from '../icons/flag'

export function TableEmptyState({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-9 flex-1 items-center justify-center">
      <Flag />
      <p className="text-sm text-neutral-600">{children}</p>
    </div>
  )
}
