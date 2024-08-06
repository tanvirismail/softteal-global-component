// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel, FormControlLabelProps, FormHelperText, Typography, FormControl } from '@mui/material';
import Iconify from '../Iconify';
import { useState } from 'react';

// ----------------------------------------------------------------------

type IProps = Omit<FormControlLabelProps, 'control'>;

interface Props extends IProps {
  name: string;
  SwitchProps: any;
  hintText?: any;
}

export default function RHFSwitch({ name, SwitchProps, hintText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => 
        <>
          <FormControlLabel
            control={
              <Switch {...field} checked={field.value} {...SwitchProps} />
            }
            {...other}
          />
          {!!error && (
            <FormHelperText error sx={{ px: 2 }} >{error?.message}</FormHelperText>
          )}
          { hintText && 
            <FormHelperText sx={{ px: 2, display: "flex", flexDirection:"row", gap:1 }} component="div">
              <Iconify icon={'eva:info-outline'} sx={{mt:"3px"}}/>
              <Typography variant="caption" >
                {hintText} 
              </Typography>
            </FormHelperText>
          }
        </>
      }
    />
  );
}
