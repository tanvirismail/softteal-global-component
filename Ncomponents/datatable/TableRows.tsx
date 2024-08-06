import { Checkbox, TableCell, TableRow } from "@mui/material";
import { TableSkeleton } from "../table";


const TableRows = ({
    denseHeight,
    data,
    isLoading,
    rowsPerPage,
    selected,
    onSelectRow,
    options,
    tableHead,
    rows
}:any) => {
    const RenderRows = ({
        key,
        row,
        selected,
        onSelectRow,
        checkbox,
    }: any) => {
        return (
        <TableRow hover selected={selected} key={key}>
            {checkbox && 
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onClick={onSelectRow} />
            </TableCell>
            }
            { rows(row) }
        </TableRow>
        );
    }
    
    return (
        <>
        { 
            (isLoading ? [...Array(rowsPerPage)] : data)
            .map((row:any, index:any) => 
                row ? (
                    RenderRows({
                        key: row.id,
                        row: row,
                        selected: selected.includes(row.id),
                        onSelectRow: () => onSelectRow(row.id),
                        checkbox: options.checkbox
                    })
                ) : (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} columns={tableHead} checkbox={options.checkbox}/>
                )
            )
        }
        </>
    )
}

export {TableRows}