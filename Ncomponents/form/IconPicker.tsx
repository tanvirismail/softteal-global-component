import Iconify, { IconNameList } from '@/_global/components/Iconify'
import MenuPopover from '@/_global/components/MenuPopover'
import { Edit, Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment, Divider, Skeleton } from '@mui/material'
import { useState } from 'react'
import { RHFTextField } from "@/_global/components/hook-form"

export default function IconPicker ({prop, field, value, setValue}:any) {
  const [searchText, setSearchText] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const iconPack:any = IconNameList;

  if (!iconPack) {
    return <Skeleton variant="rectangular" width={210} height={40} />
  }

  const iconsFiltered = iconPack.filter((icon:any) => {
    return icon.includes(searchText.toLowerCase())
  })


  return (
    <>
      <RHFTextField
        name={prop}
        label={field.label}
        placeholder={field.placeholder}
        required={field.required}
        disabled={field.disabled}
        InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  {value ? (
                      <Iconify icon={ value } />
                  ) : (
                      <Edit />
                  )}
                </IconButton>
              </InputAdornment>
            )
        }}
        InputLabelProps={{
            shrink: field.shrink,
        }}
        variant={field.variant}
        autoComplete={field.autoComplete}
        multiline={field.multiline}
        maxRows={field.maxRows}
        minRows={field.minRows}
        size={field.size}
        color={field.color}
        focused={field.focused}
        hintText={field.hintText}
      />
        <MenuPopover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            id={anchorEl ? 'iconPickerPopover' : undefined}
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
          <TextField
            fullWidth
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            size="small"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Divider />
          {iconsFiltered.map((icon:any) => (
              <IconButton 
                  key={icon} 
                  aria-label={ icon } 
                  onClick={() => {
                    setValue?.(icon); 
                    setAnchorEl(null);
                  }}
              >
                  <Iconify icon={ icon } />
              </IconButton>
          ))}
        </MenuPopover>
    </>
  )
}
