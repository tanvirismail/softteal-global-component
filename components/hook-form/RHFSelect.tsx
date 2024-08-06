// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import Iconify from '../Iconify';
import { forwardRef } from 'react';
import React from 'react';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  children: React.ReactNode;
  hintText?: any;
};

type Props = IProps & TextFieldProps;

export default function RHFSelect({ name, children, hintText, ...other }: Props) {
  const formContext = useFormContext();

  return (
    <>
    { (formContext?.control) ? 
      <Controller
        name={name}
        control={formContext?.control}
        render={({ field, fieldState: { error } }) => (
          <MuiSelectField 
            {...field}
            error={error}
            children={children}
            hintText={hintText}
            {...other}
          />
        )}
      />
      : <MuiSelectField 
        children={children}
        hintText={hintText}
        {...other}
      />
    }
    </>
  );

}

const MuiSelectField = forwardRef(({ ...arg }: any, ref:any) => {
  const { children,error,hintText, ...other} = arg;
  return (
    <React.Fragment>
      <TextField
        select
        fullWidth
        // SelectProps={{ native: true }}
        error={!!error}
        helperText={error?.message}
        {...other}
      >
        {children}
      </TextField>
      { hintText && 
        <FormHelperText sx={{ px: 2, display: "flex", flexDirection:"row", gap:1 }} component="div">
          <Iconify icon={'eva:info-outline'} sx={{mt:"3px"}}/>
          <Typography variant="caption" >
            {hintText} 
          </Typography>
        </FormHelperText>
      }
    </React.Fragment>
  );
})
