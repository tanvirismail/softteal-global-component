import { QueryResponseContextProps, QueryState } from "./datatable.types"

export const initialQueryState: QueryState = {
  draw: 0,
  start: 0,
  length: 5,
  search: {
    value: "",
  },
  columns: [],
  order: []
}

export const initialState: QueryResponseContextProps<any> = {
  refetch: () => {}, 
  isLoading: false, 
  query: '', 
  state: initialQueryState, 
  updateState: () => {}
}