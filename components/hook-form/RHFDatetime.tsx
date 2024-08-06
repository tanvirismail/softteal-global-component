// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';

import { DatePicker, DateTimePicker, TimePicker, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import Iconify from '../Iconify';
// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;

export default function RHFDate({ name, type, slotProps, hintText, ...other }: any) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          { (type == "date") && <DatePicker
              {...field}
              slotProps={{ ...slotProps, 
                textField: {
                  ...slotProps.textField,
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                } 
              }}
              {...other}
            />
          }
          { (type == "datetime") && <DateTimePicker
              {...field}
              slotProps={{ ...slotProps, 
                textField: {
                  ...slotProps.textField,
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                } 
              }}
              {...other}
            />
          }
          { (type == "time") && <TimePicker
              {...field}
              slotProps={{ ...slotProps, 
                textField: {
                  ...slotProps.textField,
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                } 
              }}
              {...other}
            />
          }
          { hintText && 
            <FormHelperText sx={{ px: 2, display: "flex", flexDirection:"row", gap:1 }} component="div">
              <Iconify icon={'eva:info-outline'} sx={{mt:"3px"}}/>
              <Typography variant="caption" >
                {hintText} 
              </Typography>
            </FormHelperText>
          }
        </LocalizationProvider>
      )}
    />
  );
}
