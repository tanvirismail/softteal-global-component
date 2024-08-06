import { useEffect, useMemo, useState } from "react"
import { QueryState } from "./datatable.types"
import { initialQueryState } from "./datatable.state"
import qs from "qs";

// Example: page=1&items_per_page=10&sort=id&order=desc&search=a&filter_name=a&filter_online=false
function stringifyRequestQuery(state: QueryState): string {
    return qs.stringify(state);
}

export const useQueryState = ({queryState}:any) => {
    const [state, setState] = useState<QueryState>({...initialQueryState, ...queryState})
    const updateState = (updates: Partial<QueryState>) => {
      const updatedState = {...state, ...updates} as QueryState
      setState(updatedState)
    }
  
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])
  
    useEffect(() => {
      if (query !== updatedQuery) {
        setQuery(updatedQuery)
      }
    }, [updatedQuery])
    
    return {
      query, state, updateState
    }
}

export const responseContextAPI = (useQueryResponse:any) => {
  const useQueryResponseData = () => {
    const {response} = useQueryResponse()
    if (!response) {
      return []
    }

    return response?.data || []
  }

  const useQueryResponsePagination = () => {
    const defaultPaginationState:any = {
      recordsTotal: 0,
      recordsFiltered: 0,
      ...initialQueryState,
    }

    const {response} = useQueryResponse()
    if (!response || !response.recordsTotal || !response.recordsFiltered) {
      return defaultPaginationState
    }

    return {
      ...defaultPaginationState,
      recordsTotal: response.recordsTotal,
      recordsFiltered: response.recordsFiltered
    };

    // return response.payload.pagination
  }

  const useQueryResponseLoading = (): boolean => {
    const {isLoading} = useQueryResponse()
    return isLoading
  }

  return {
    useQueryResponse,
    useQueryResponseData,
    useQueryResponsePagination,
    useQueryResponseLoading
  }
}