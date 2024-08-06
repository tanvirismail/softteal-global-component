// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, Typography } from '@mui/material';
//
import Editor, { Props as EditorProps } from '../editor';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

interface Props extends EditorProps {
  name: string;
  hintText?: any;
  minHeight: any;
  maxHeight: any;
}

export default function RHFEditor({ name, hintText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Editor
            id={name}
            value={field.value}
            onChange={field.onChange}
            error={!!error}
            helperText={
              <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                {error?.message}
              </FormHelperText>
            }
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
