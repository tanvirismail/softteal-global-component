import { 
    TablePagination as MUITablePagination, 
} from "@mui/material";
import { useEffect, useState } from "react";

const TablePagination = ({useQueryResponse, useQueryResponsePagination}:any) => {

    const {state, updateState} = useQueryResponse()
    const pagination = useQueryResponsePagination()
    const [page, setPage] = useState(0);
    useEffect(()=>{
      if(state.start == 0) setPage(0);
    }, [state.start]);
    const onChangePage = (event: unknown, newPage: number) => { 
      setPage(newPage);
      const start = state.length * newPage 
      updateState({ draw: (state.draw)+1, start: start })
    };
    const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(0);
      updateState({ draw: (state.draw)+1, start: 0, length: event.target.value })
    };

    return (
        <MUITablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={pagination.recordsFiltered}
            rowsPerPage={state.length}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            labelDisplayedRows={({from, to, count})=>{ return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`} (filtered from ${pagination.recordsTotal} entries)`; }}
            labelRowsPerPage={"Rows per page:"}
            showFirstButton
            showLastButton
        />
    )
}

export {TablePagination}