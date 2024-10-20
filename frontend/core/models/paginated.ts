export interface Paginated<T = unknown> {
  count: number
  rows: T[]
}
