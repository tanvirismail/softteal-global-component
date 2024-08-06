import { Stack, InputAdornment, TextField, Tooltip, IconButton, Box, MenuItem } from '@mui/material';
import Iconify from '@/_global/components/Iconify';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/_global/utils/debounce';

const SearchComponent = ({placeholder, useQueryResponse}:any) => {

    const {state, updateState} = useQueryResponse();
    const [filterKeyword, setFilterKeyword] = useState<string>('');
    const debouncedKeyword = useDebounce(filterKeyword, 700)

    useEffect(
        () => {
          if (debouncedKeyword !== undefined && filterKeyword !== undefined) { 
            updateState({draw: (state.draw)+1, start: 0, search: {...state.search, value: debouncedKeyword}})
          }
        },
        [debouncedKeyword] // Only call effect if debounced search term changes
        // More details about useDebounce: https://usehooks.com/useDebounce/
    )
    
    return (
      <TextField
        value={filterKeyword}
        onChange={(e) => setFilterKeyword(e.target.value)}
        placeholder={placeholder}
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    )
};

export {SearchComponent}