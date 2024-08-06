import { forwardRef, useState, useMemo } from "react";
import { initialQueryState } from "@/_global/contexts/datatable/datatable.state";
import { TableContent } from "./TableContent";
import { responseContextAPI } from "@/_global/contexts/datatable/datatable.hook";

const Datatable = forwardRef(({
  useQueryResponse,
  options={},
  rows,
  tableHead,
  handleSelectedAction,
  handleFileExport,
  customToolbarMenu
}:any, ref) => {

  const responseContext = useMemo(()=>responseContextAPI(useQueryResponse),[useQueryResponse]);
  const defaultOptions = {
    search:true,
    refresh:true,
    checkbox:true,
    dense: true,
    search_placeholder: "Search... ",
    FilterForm: "",
    fileExport: [],
    sx: {card:{}}
  };
  options = {...defaultOptions, ...options};

  return (
    <TableContent 
      ref={ref}
      responseContext={responseContext}
      rows={rows}
      tableHead={tableHead}
      handleSelectedAction={handleSelectedAction}
      options={options}
      handleFileExport={handleFileExport}
      customToolbarMenu={customToolbarMenu}
    />
  )
});

export default Datatable;