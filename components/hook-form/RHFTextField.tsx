// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import Iconify from '../Iconify';
import React, { forwardRef } from 'react';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  hintText?: any;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, hintText, ...other }: Props) {
  const formContext = useFormContext();

  return (
    <>
    { (formContext?.control) ? 
      <Controller
        name={name}
        control={formContext?.control}
        render={({ field, fieldState: { error } }) => (
          <MuiTextField 
            {...field} 
            error={error}
            hintText={hintText} 
            {...other} 
          />
        )}
      />
      : <MuiTextField
        hintText={hintText} 
        {...other} 
      />
    }
    </>
  );
}


const MuiTextField = forwardRef(({ ...arg }: any, ref:any) => {
  const {value,error,prepend,append,variant,hintText, ...other} = arg;
  return (
    <React.Fragment>
      <TextField
        fullWidth
        value={typeof value === 'number' && value === 0 ? '' : value}
        error={!!error}
        helperText={error?.message}
        {...other}
      />
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