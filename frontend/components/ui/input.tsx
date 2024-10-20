import * as React from 'react'

import { cn } from '@/lib/utils'
import { wl } from '@/lib/wl'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          wl({
            className:
              'flex h-12 w-full rounded-[2px] border border-grays-30 bg-white px-4 py-4 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-gray-50 read-only:cursor-not-allowed',
            uses: ['focusVisibleRing'],
          }),
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
