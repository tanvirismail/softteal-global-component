/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, createContext, ReactNode, useState, useEffect} from 'react'
import { initialState } from './datatable.state';
import { useQueryState } from './datatable.hook';
import {useQuery} from 'react-query'

export const QueryResponseContext = createContext(initialState);

type ResponseContextType = {
  tableID?: string
  queryState?: any
  endPoint?: any
}

const RequestProvider: FC<{children?: ReactNode} & ResponseContextType> = ({children, tableID, queryState, endPoint}) => {

  const {query, state, updateState} = useQueryState({queryState});
  // const { isFetching, refetch, data: response } = useQuery(
  //   `${tableID}-${query}`,
  //   () => {
  //     return endPoint(query)
  //   },
  //   {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  // ) 

  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState({});
  const refetch = () => {
    request()
  }

  const request = ()=>{
    setIsFetching(true);
    endPoint(query).then((res:any)=>{
      setResponse(res);
      setIsFetching(false);
    }).catch((res:any)=>{
      setResponse({});
      setIsFetching(false);
    })
  }

  useEffect(() => {
    request()
  }, [query]);

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query, state, updateState}}>
      {children}
    </QueryResponseContext.Provider>
  )
}
const useResponse = () => useContext(QueryResponseContext)

export {
  RequestProvider,
  useResponse
}
