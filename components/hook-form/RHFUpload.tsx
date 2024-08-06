// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Box, FormControl, FormHelperText, FormLabel, Stack, Typography } from '@mui/material';
// type
import {
  UploadAvatar,
  UploadMultiFile,
  UploadSingleFile,
  UploadProps,
  UploadMultiFileProps,
} from '../upload';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Iconify from '../Iconify';
import { ms } from 'date-fns/locale';
// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  label?: string;
  hintText?: any;
  required?: boolean;
}

export function RHFUploadAvatar({ name, hintText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <UploadAvatar
              file={field.value}
              error={checkError}
              helperText={
                checkError && (
                  <FormHelperText error sx={{ mx: 0, px: 2, textAlign: 'center' }}>
                    {error.message}
                  </FormHelperText>
                )
              }
              {...other}
            />
            {/* {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )} */}
            { hintText && 
              <FormHelperText sx={{ mx: 0, px: 2, display: "flex", flexDirection:"row", gap:1 }} component="div">
                <Iconify icon={'eva:info-outline'} sx={{mt:"3px"}}/>
                <Typography variant="caption" >
                  {hintText} 
                </Typography>
              </FormHelperText>
            }
          </div>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadSingleFile({ name, hintText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <FormControl fullWidth>
            { other.label && 
              <FormLabel
                required={other.required}
                error={checkError}
                sx={{mb:1}}
              >
                {other.label}
              </FormLabel>
            }
            <UploadSingleFile
              file={field.value}
              error={checkError}
              helperText={
                checkError && (
                  <FormHelperText error sx={{ mx: 0, px: 2 }}>
                    {error.message}
                  </FormHelperText>
                )
              }
              {...other}
            />
            { hintText && 
              <FormHelperText sx={{ mx: 0, px: 2, display: "flex", flexDirection:"row", gap:1 }} component="div">
                <Iconify icon={'eva:info-outline'} sx={{mt:"3px"}}/>
                <Typography variant="caption" >
                  {hintText} 
                </Typography>
              </FormHelperText>
            }
          </FormControl>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFUploadMultiFileProps extends Omit<UploadMultiFileProps, 'files'> {
  name: string;
  label?: string;
  hintText?: any;
  required?: boolean;
  uploadButton?: boolean;
}

export function RHFUploadMultiFile({ name, hintText, ...other }: RHFUploadMultiFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <FormControl fullWidth>
            <FormLabel
              required={other.required}
              error={checkError}
              sx={{mb:1}}
            >
              {other.label}
            </FormLabel>
            <UploadMultiFile
              files={field.value}
              error={checkError}
              helperText={
                checkError && (
                  <FormHelperText error sx={{ mx: 0, px: 2 }}>
                    {error?.message}
                  </FormHelperText>
                )
              }
              {...other}
            />
            { hintText && 
              <FormHelperText sx={{ mx: 0, px: 2, display: "flex", flexDirection:"row", gap:1 }} component="div">
                <Iconify icon={'eva:info-outline'} sx={{mt:"3px"}}/>
                <Typography variant="caption" >
                  {hintText} 
                </Typography>
              </FormHelperText>
            }
          </FormControl>
        );
      }}
    />
  );
}
