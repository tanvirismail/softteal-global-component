export type QueryState = {
  draw?: number,
  start: number
  length: 5 | 10 | 25 | 50 | 100
  recordsTotal?: Number
  recordsFiltered?: Number
  search?:any
  order?: any
  columns?: any
}

export type Response<T> = {
  draw?: Number
  data?: T
  recordsTotal?: Number
  recordsFiltered?: Number
  input?: QueryState
}

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}