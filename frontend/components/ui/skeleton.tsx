import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={cn(
        'animate-pulse rounded-md block bg-neutral-100 dark:bg-neutral-800',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
