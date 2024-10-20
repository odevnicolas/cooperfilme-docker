import { Request } from "express"

export interface IIndex {
  orderBy?: string
  userId?: string
  order?: "asc" | "desc"
  skip?: number,
  take?: number,
  where?: {
    [key: string]: string | boolean | object
  }
}

export const formatIndexFilters = ({ query }: Request): IIndex => {

  const { orderBy: ob, order: o, page: p, size: s, ...f } = query

  const orderBy = ob?.toString() || "createdAt"
  const order = o as "asc" | "desc" || "desc"

  let page = parseInt(p?.toString() || "")
  page = !isNaN(page) ? page : 1

  let size = parseInt(s?.toString() || "")
  size = !isNaN(size) ? size : 10

  const skip = (page - 1) * size
  const take = size
  const where = f as { [key: string]: string | boolean | object }

  return {
    orderBy,
    order,
    skip,
    take,
    where
  }
}
