// @mui
import { Theme } from '@mui/material/styles';
import {
  Box,
  SxProps,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@mui/material';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

// ----------------------------------------------------------------------

type Props = {
  // order?: 'asc' | 'desc';
  orderBy: any;
  columns: any;
  headLabel: any[];
  rowCount?: number;
  numSelected?: number;
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
  sx?: SxProps<Theme>;
  checkbox: boolean;
};

export default function TableHeadCustom({
  orderBy,
  columns,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
  checkbox
}: Props) {
 
    const sortDirection = (orderColumn:any) => {
      const columnIndex = columns.findIndex( (value:any) => value.data === orderColumn)
      const filtered = orderBy.find( (value:any) => value.column === columnIndex) 
      if(filtered){
        const column = columns.find( (value:any) => value.data === orderColumn)
        if(column && column.orderable !== "false"){
          return filtered.dir
        }
      }
      return false
    } 
    const direction = (orderColumn:any) => {
      const filtered = sortDirection(orderColumn)
      if(filtered !== false){
        return filtered
      }
      return "asc"
    } 
    const order = (orderColumn:any) => {
      const columnIndex = columns.findIndex( (value:any) => value.data === orderColumn)
      const filtered = orderBy.find( (value:any) => value.column === columnIndex)
      return filtered
    }

  return (
    <TableHead sx={sx}>
      <TableRow>
        {(checkbox && onSelectAllRows) && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSelectAllRows(event.target.checked)
              }
            />
          </TableCell>
        )}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.name}
            align={headCell.align || 'left'}
            sortDirection={ sortDirection(headCell.name) }
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            { onSort ? (
              <TableSortLabel
                hideSortIcon
                active={ order(headCell.name) ? true : false }
                direction={ direction(headCell.name) }
                onClick={() => onSort(headCell.name)}
                sx={{ textTransform: 'capitalize' }}
              >
                {headCell.label}

                { order(headCell.name) ? (
                  <Box sx={{ ...visuallyHidden }}>
                    { order(headCell.name).dir === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
