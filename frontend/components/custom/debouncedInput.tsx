'use client'

import { useDebounce } from '@/core/hooks/useDebounce'
import { ChangeEvent, ComponentProps } from 'react'
import { Input } from '../ui/input'

type Props = {
  delayMs?: number
  onInputChange?: (str: string) => void
} & Omit<ComponentProps<'input'>, 'onChange'>

export function DebouncedInput({
  delayMs = 300,
  onInputChange,
  ...rest
}: Props) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (onInputChange) {
      onInputChange(event.target.value)
    }
  }
  const debouncedChange = useDebounce(handleChange, delayMs)

  return <Input {...rest} onChange={debouncedChange} />
}
