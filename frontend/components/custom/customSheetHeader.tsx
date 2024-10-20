import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { SheetClose, SheetHeader } from '../ui/sheet'

type Props = {
  title: string
  description?: string
  className?: string
}

export function CustomSheetHeader({ title, description, className }: Props) {
  return (
    <SheetHeader className={cn('flex flex-col bg-background', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-black font-medium text-lg">{title}</h3>
        <SheetClose className="text-neutral-400">
          <X className="size-4 text-neutral-400" />
        </SheetClose>
      </div>
      <p className="text-sm text-neutral-400 font-normal mt-1 text-left">
        {description}
      </p>
    </SheetHeader>
  )
}
