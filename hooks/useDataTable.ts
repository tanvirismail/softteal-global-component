import { useState } from "react";

export function useDataTable() {

  const [isLoading, setIsLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(true);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [recordsFiltered, setRecordsFiltered] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [queryParams, setQueryParams] = useState<any>({
    start: 0,
    length: 5,
    search: {
      value: "",
      // name: "",
      // status: "",
      // isActive: false,
      // multipleSelect: {}
    },
    columns: [
      // {
      //   data: "first_name",
      // },
      // {
      //   data: "last_name",
      // },
      // {
      //   data: "email",
      // },
      // {
      //   data: "username",
      // },
      // {
      //   data: "status",
      // },
      // {
      //   data: "created_at",
      //   searchable: "false",
      // },
      // {
      //   data: "action",
      //   searchable: "false",
      //   orderable: "false",
      // },
    ],
    order: [
      // {
      //   column: 'first_name',
      //   dir: "desc" // desc // asc
      // }
    ],
  });
  const handleStart = (value:any) => {
    setQueryParams((q:any)=>({...q, start: value }));
  }
  const handleRowsPerPage = (value:any) => {
    setQueryParams((q:any)=>({...q, length: value }));
  }
  const handleSearch = (value:any) => {
    setQueryParams((q:any)=>({...q, start: 0, search: {...q.search, value: value}}));
  }
  const handleFilter = (data: any)=>{
    setQueryParams( (q:any) => ({...q, 
      search: {
        ...q.search,
        ...data
      }
    }));
  }
  const handleOrderBy = (value:any) => {
    setQueryParams((q:any)=>({...q, order: value }));
  }

  return {
    isLoading, setIsLoading,
    checkbox, setCheckbox,
    recordsTotal, setRecordsTotal,
    recordsFiltered, setRecordsFiltered,
    tableData, setTableData,
    queryParams, setQueryParams,
    handleStart,
    handleRowsPerPage,
    handleSearch,
    handleFilter,
    handleOrderBy,
  }
}
