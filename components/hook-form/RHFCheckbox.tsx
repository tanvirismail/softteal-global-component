// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormGroup, FormControlLabelProps, FormHelperText, FormControl, Box, FormLabel, Typography } from '@mui/material';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  CheckboxProps?: any;
  hintText?: any;
}

export function RHFCheckbox({ name, CheckboxProps, hintText, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControl
            component="fieldset"
            error={!!error}
          >
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    {...CheckboxProps}
                  />
                }
                {...other}
              />
              {!!error && (
                <FormHelperText>{error?.message}</FormHelperText>
              )}
            </Box>
          </FormControl>
          { hintText && 
            <FormHelperText sx={{ mx: 0, px: 2, display: "flex", flexDirection:"row", gap:1 }} component="div">
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

// ----------------------------------------------------------------------

interface RHFMultiCheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name: string;
  label: string;
  options: {
    label: string;
    value: any;
    disabled?: boolean;
    color?: string;
    icon?: any;
  }[];
  CheckboxProps?: any;
  row?: boolean;
  hintText?: any;
}

export function RHFMultiCheckbox({ name, label, options, CheckboxProps, row, hintText, ...other }: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onSelected = (option: string) =>
          field.value.includes(option)
            ? field.value.filter((value: string) => value !== option)
            : [...field.value, option];

        const onDisabled = (option: any) => (CheckboxProps.disabled ?? option)
        const onColor = (option: any) => (CheckboxProps.color ?? option)
        const onIcon = (option: any) => (CheckboxProps.icon ?? option)
        const onCheckedIcon = (option: any) => (CheckboxProps.checkedIcon ?? option)

        return (
          <>
            <FormControl
              required={CheckboxProps.required}
              component="fieldset"
              error={!!error}
            >
              <FormLabel sx={{mb:1}}>{label}</FormLabel>
              <FormGroup row={row}>
                {options.map((option) => (
                  <Box key={option.value}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value.includes(option.value)}
                          onChange={() => field.onChange(onSelected(option.value))}
                          {...CheckboxProps}
                          disabled={onDisabled(option.disabled)}
                          color={onColor(option.color)}
                          icon={onIcon(option.icon?.out)}
                          checkedIcon={onCheckedIcon(option.icon?.in)}
                        />
                      }
                      label={option.label}
                      {...other}
                    />
                  </Box>
                ))}
              </FormGroup>
              {!!error && (
                <FormHelperText>{error?.message}</FormHelperText>
              )}
            </FormControl>
            { hintText && 
              <FormHelperText sx={{ mx: 0, px: 2, display: "flex", flexDirection:"row", gap:1 }} component="div">
                <Iconify icon={'eva:info-outline'} sx={{mt:"3px"}}/>
                <Typography variant="caption" >
                  {hintText} 
                </Typography>
              </FormHelperText>
            }
          </>
        );
      }}
    />
  );
}
