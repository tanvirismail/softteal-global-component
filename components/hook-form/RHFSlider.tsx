// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormControl, FormHelperText, FormLabel, Slider, SliderProps, SliderThumb, Stack, Typography, styled } from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import Iconify from '../Iconify';
import React, { forwardRef } from 'react';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label?: string;
  prepend?: any;
  append?: any;
  variant?: string;
  height?: any;
  hintText?: any;
  onChange?: any;
};

type Props = IProps & SliderProps;

const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
const IOSSlider = styled(Slider)(({ theme }) => ({
  // color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
  // height: 2,
  // padding: '15px 0',
  '& .MuiSlider-thumb': {
    // height: 28,
    // width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  // '& .MuiSlider-valueLabel': {
  //   fontSize: 12,
  //   fontWeight: 'normal',
  //   top: -6,
  //   backgroundColor: 'unset',
  //   color: theme.palette.text.primary,
  //   '&:before': {
  //     display: 'none',
  //   },
  //   '& *': {
  //     background: 'transparent',
  //     color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  //   },
  // },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
}));
const PrettoSlider = styled(Slider)(({ theme, color="primary" }) => ({
  // color: '#52af77',
  // height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    // height: 24,
    // width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    // fontSize: 12,
    // background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: theme.palette[color].main,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
}));
const AirbnbSlider = styled(Slider)(({ theme }) => ({
  // color: '#3a8589',
  // height: 3,
  // padding: '13px 0',
  '& .MuiSlider-thumb': {
    // height: 27,
    // width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));
interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}
function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other} >
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

export default function RHFSlider({ name, prepend, append, variant, hintText, ...other }: Props) {
  const formContext = useFormContext();
  return (
    <>
    { (formContext?.control) ? 
    <Controller
      name={name}
      control={formContext?.control}
      render={({ field, fieldState: { error } }) => 
        <MuiSlider 
          {...field} 
          error={error} 
          prepend={prepend} 
          append={append} 
          variant={variant} 
          hintText={hintText} 
          {...other} 
        />
      }
    />
    : <MuiSlider
        prepend={prepend} 
        append={append} 
        variant={variant} 
        hintText={hintText} 
        {...other} 
      />
    }
    </>
  );
}

const MuiSlider = forwardRef(({ ...arg }: any, ref:any) => {
  const {error,prepend,append,variant,hintText, ...other} = arg;
  return (
    <React.Fragment>
      <FormControl
        fullWidth
        component="fieldset"
        error={!!error}
      >
        <FormLabel sx={{mb:0}}>{other.label}</FormLabel>
        <Stack spacing={2} direction="row" sx={{ mb: '5px', height: other.height }} alignItems="center">
          {prepend}
          { 
            (variant=='ios') ?
            <IOSSlider {...other} />
            : (variant=='pretto') ?
            <PrettoSlider {...other} />
            : (variant=='airbnb') ?
            <AirbnbSlider {...other} slots={{ thumb: AirbnbThumbComponent }}/>
            : <Slider  {...other} />
          }
          {append}
        </Stack>
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
    </React.Fragment>
  );
})
