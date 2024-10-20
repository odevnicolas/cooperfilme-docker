export function formatOrderBy(orderBy?: string, order?: "asc" | "desc") {
  if (orderBy) return {
    [orderBy]: order
  }

  return undefined
}