'use client'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { wl } from '@/lib/wl'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: wl({
          className: 'text-neutral-50 transition-colors duration-100',
          uses: ['bg', 'hover'],
        }),
        destructive: 'bg-red-500 text-neutral-50 hover:bg-red-500/90',
        outline: wl({
          className: 'border',
          uses: ['bgOutline', 'border', 'hoverOutline', 'text'],
        }),
        outlineSecondary: wl({
          className: 'border border-gray-300 bg-transparent',
          uses: ['hoverOutline', 'text'],
        }),
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900 ',
        link: 'text-neutral-900 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-9 rounded-[2px] px-3',
        lg: 'h-11 rounded-[2px] px-8',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
