// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Radio,
  RadioGroup,
  FormHelperText,
  RadioGroupProps,
  FormControlLabel,
  FormLabel,
  FormControl,
  Typography,
} from '@mui/material';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label: string;
  options: {
    label: string;
    value: any;
    disabled?: boolean;
    color?: string;
  }[];
  RadioProps?: any;
  labelPlacement?: any;
  hintText?: any;
};

type Props = IProps & RadioGroupProps;

export default function RHFRadioGroup({ name, label, options, RadioProps, labelPlacement, hintText, ...other }: Props) {
  const { control } = useFormContext();
  const onDisabled = (option: any) => (RadioProps.disabled ?? option)
  const onColor = (option: any) => (RadioProps.color ?? option)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControl
            required={RadioProps.required}
            component="fieldset"
            error={!!error}
          >
            <FormLabel sx={{mb:1}}>{label}</FormLabel>
            <RadioGroup {...field} {...other}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Radio 
                      {...RadioProps} 
                      disabled={onDisabled(option.disabled)} 
                      color={onColor(option.color)}
                    />
                  }
                  label={option.label}
                  labelPlacement={labelPlacement}
                />
              ))}
            </RadioGroup>

            {!!error && (
              <FormHelperText error sx={{ mx: 0, px: 2 }}>
                {error?.message}
              </FormHelperText>
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
      )}
    />
  );
}
