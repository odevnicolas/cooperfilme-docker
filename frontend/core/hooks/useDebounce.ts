export function useDebounce<T = unknown>(
  fn: (...params: T[]) => void | Promise<void>,
  delay = 250,
) {
  let timeout: NodeJS.Timeout

  return (...args: T[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
