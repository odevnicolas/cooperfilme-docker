import { PropsWithChildren } from 'react'

export function FieldError({ children }: PropsWithChildren) {
  return children ? (
    <span className="text-red-500 text-xs">{children}</span>
  ) : null
}
