import { Stack, InputAdornment, TextField, Tooltip, IconButton, Box, MenuItem, Button } from '@mui/material';
// components
import TableExport from '@/_global/Ncomponents/datatable/toolbar/TableExport';
import TableFilter from '@/_global/Ncomponents/datatable/toolbar/TableFilter';
import { SearchComponent } from './toolbar/SearchComponent';
import { ReloadComponent } from './toolbar/ReloadComponent';
// ----------------------------------------------------------------------

export default function TableToolbar({
  options,
  useQueryResponse,
  initialQueryState,
  handleFileExport,
  customToolbarMenu  
}:any ) {


  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5, px: 3 }}
    >
      <Box>
        { options.search && 
          <SearchComponent
            placeholder={options.search_placeholder}
            useQueryResponse={useQueryResponse}
          />
        }
      </Box>

      <Box>
        { options.refresh && 
          <ReloadComponent
            useQueryResponse={useQueryResponse}
          />
        }
        { options.FilterForm &&
          <TableFilter
            FilterForm={options.FilterForm}
            useQueryResponse={useQueryResponse}
            initialQueryState={initialQueryState}
          />
        }
        { (options.fileExport.length !== 0) && 
          <TableExport
            fileExport={options.fileExport}
            handleFileExport={handleFileExport}
          />
        }
        { options.toolbarButton &&
          <Button 
            variant={options?.toolbarButton?.variant} 
            color={options?.toolbarButton?.color}
            startIcon={options?.toolbarButton?.startIcon} 
            onClick={options?.toolbarButton?.onClick}
          >
            {options?.toolbarButton?.label}
          </Button>
        }
        {
          customToolbarMenu && customToolbarMenu
        }
      </Box>
    </Stack>
  );
}
