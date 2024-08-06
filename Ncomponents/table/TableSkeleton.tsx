// @mui
import { TableRow, TableCell, Skeleton, Stack, TableRowProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function TableSkeleton({ ...other }: any) {
  const {key, sx, columns, checkbox} = other
  return (
    <TableRow key={key} sx={sx}>
      { checkbox && 
        <TableCell>
          <Stack direction="row" alignItems="center">
            <Skeleton
              variant="rectangular"
              width={35}
              height={35}
              sx={{ borderRadius: 1, flexShrink: 0 }}
            />
          </Stack>
        </TableCell>
      }
      {
        columns.map((v:any,k:any)=>
          (
            <TableCell key={k}>
              <Stack direction="row" alignItems="center">
                <Skeleton variant="text" width="100%" height={25} />
              </Stack>
            </TableCell>
          )
        )
      }
    </TableRow>
  );
}
