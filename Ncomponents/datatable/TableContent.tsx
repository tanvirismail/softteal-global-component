import Iconify from "@/_global/components/Iconify";
import Scrollbar from "@/_global/components/Scrollbar";
import { 
    TableEmptyRows, 
    TableHeadCustom, 
    TableNoData, 
    TableSkeleton
} from "@/_global/Ncomponents/table";
import TableToolbar from "@/_global/Ncomponents/datatable/TableToolbar";
import {TablePagination} from "@/_global/Ncomponents/datatable/TablePagination";
import { 
    Box, 
    Card, 
    FormControlLabel, 
    IconButton, 
    Switch, 
    Table, 
    TableBody, 
    TableContainer, 
    Tooltip,
    TableRow,
    TableCell,
    Checkbox,
    Dialog,
    DialogTitle,
    CircularProgress,
    Stack
} from "@mui/material";
import { forwardRef, useState, useMemo, useEffect, useImperativeHandle } from "react";
import ConfirmDialog from '@/_global/Ncomponents/ConfirmDialog';
import { initialQueryState } from "@/_global/contexts/datatable/datatable.state";
import { TableDensity } from "./TableDensity";
import { TableSelectedActions } from "./TableSelectedActions";
import { TableRows } from "./TableRows";
import { TableHeader } from "./TableHeader";

const TableContent = forwardRef(({
    responseContext, 
    options, 
    rows, 
    tableHead, 
    handleSelectedAction, 
    handleFileExport, 
    customToolbarMenu,
}:any, ref) =>{

    const {
        useQueryResponse, 
        useQueryResponseData, 
        useQueryResponseLoading, 
        useQueryResponsePagination,
    } = responseContext;
    const responseData = useQueryResponseData();
    const isLoading = useQueryResponseLoading();
    const {query, state, updateState} = useQueryResponse()

    useImperativeHandle(ref, () => ({
      reloadTable() {
        reloadTable();
      }
    }));

    const reloadTable = () => {
      updateState({...initialQueryState, draw: (state.draw)+1})
    }
    
    const data = useMemo(() => responseData, [responseData]);
    const isNotFound = !(data.length);
    const rowsPerPage = state.length;

    const emptyRows = (rowsPerPage: number, arrayLength: number) => {
        return !isNotFound ? Math.max(0, (rowsPerPage - arrayLength)) : 0;
    }

    // selected
    const [selected, setSelected] = useState<string[]>([]);
    const onSelectAllRows = (checked: boolean, newSelecteds: string[]) => {
      if (checked) {
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
    const onSelectRow = (id: string) => {
      const selectedIndex = selected.indexOf(id);

      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    };
    // selected

    // dense
    const [rowDense, setRowDense] = useState(options.dense||false);
    const denseHeight = rowDense ? 52 : 72;
    // dense

    return (
        <Card sx={ {...options.sx.card} }>
            <TableToolbar
                options={options}
                useQueryResponse={useQueryResponse}
                initialQueryState={initialQueryState}
                handleFileExport={handleFileExport}
                customToolbarMenu={customToolbarMenu}
            />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                  {selected.length > 0 && (
                    <TableSelectedActions
                      rowDense={rowDense}
                      selected={selected}
                      setSelected={setSelected} 
                      data={data} 
                      onSelectAllRows={onSelectAllRows} 
                      handleSelectedAction={handleSelectedAction}
                    />
                  )}
                  <Table size={rowDense ? 'small' : 'medium'}>
                    <TableHeader
                      useQueryResponse={useQueryResponse}
                      headLabel={tableHead}
                      data={data}
                      onSelectAllRows={onSelectAllRows}
                      numSelected={selected.length}
                      options={options}
                    />
                    <TableBody>
                        <TableRows
                          denseHeight={denseHeight}
                          data={data}
                          isLoading={isLoading}
                          rowsPerPage={rowsPerPage}
                          selected={selected}
                          onSelectRow={onSelectRow}
                          options={options}
                          tableHead={tableHead}
                          rows={rows}
                        />
                        <TableEmptyRows
                            height={denseHeight}
                            emptyRows={emptyRows(rowsPerPage, data.length)}
                        />
                        <TableNoData isNotFound={isNotFound} height={((rowsPerPage * (denseHeight - 40)) / 2) }/>
                    </TableBody>
                  </Table>
              </TableContainer>
            </Scrollbar>
            <Box sx={{ position: 'relative' }}>
              <TablePagination
                useQueryResponse={useQueryResponse}
                useQueryResponsePagination={useQueryResponsePagination}
              />
              <TableDensity
                rowDense={rowDense} 
                setRowDense={setRowDense}
              />
            </Box>
        </Card>
    )
})

export {TableContent}