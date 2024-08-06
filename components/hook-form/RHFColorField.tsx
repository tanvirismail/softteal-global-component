// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;

export default function RHFColorField({ name, hintText, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <MuiColorInput
            {...field}
            fullWidth
            helperText={error?.message}
            error={!!error}
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
        </>
      )}
    />
  );
}
