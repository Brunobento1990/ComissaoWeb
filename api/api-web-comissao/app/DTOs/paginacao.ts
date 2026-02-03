export interface PaginacaoResponse<T> {
  values: T[]
  totalDePaginas: number
}

export interface PaginacaoRequest {
  skip: number
  take: number
  orderBy?: string
  asc: boolean
  search?: string
}
