// @mui
import { IconButton, Tooltip } from '@mui/material';
//
import Iconify from '@/_global/components/Iconify';
import MenuPopover from '@/_global/components/MenuPopover';
import Form from '@/_global/Ncomponents/form';
import { useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  actions: any;
  handleFilter?: any;
  open?: HTMLElement | null;
  onClose?: VoidFunction;
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function TableFilter({ FilterForm, useQueryResponse, initialQueryState }: any) {

  const {isLoading, state, updateState} = useQueryResponse();
  const filterData = (data:any = {}) => {
    updateState({
      draw: (state.draw)+1, 
      start: 0, 
      search: {
        ...initialQueryState.search,
        ...data
      }
    })
  }
  const resetData = () => {
    updateState({draw: (state.draw)+1, start: 0, search: {...initialQueryState.search}})
  }

  const [open, setOpen] = useState<HTMLElement | null>(null);
  const onOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };
  const onClose = () => {
    setOpen(null)
  }

  return (
    <>
        <Tooltip title="Filter list">
            <IconButton onClick={onOpen} size="large">
                <Iconify icon={'ic:round-filter-list'}/>
            </IconButton>
        </Tooltip>
        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          arrow="top-right"
          sx={{
          //   mt: -1,
            width: 450,
            px: 2,
            py: 2,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
              '& svg': { mr: 2, width: 20, height: 20 },
            },
          }}
        >
          <FilterForm applyFilter={filterData} resetData={resetData} defaultData={state.search} />
        </MenuPopover>
    </>
  );
}
