import { Stack, InputAdornment, TextField, Tooltip, IconButton, Box, MenuItem } from '@mui/material';
import Iconify from '@/_global/components/Iconify';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/_global/utils/debounce';

const ReloadComponent = ({useQueryResponse}:any) => {

    const { state, updateState, refetch } = useQueryResponse();

    const handleReload = () => {
        updateState({draw: (state.draw)+1, start: 0})
    }
    
    return (
        <Tooltip title="Reload">
            <IconButton onClick={handleReload} size="large">
                <Iconify icon={'eva:refresh-fill'}/>
            </IconButton>
        </Tooltip>
    )
};

export {ReloadComponent}