import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, Avatar, styled, Divider, Link, MenuItem, IconButton, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '@/_global/hooks/useAuth';
// utils
import { fData, fShortenNumber } from '@/_global/utils/formatNumber';
// _mock
import { countries } from '@/_global/_mock';
// components
import { CustomFile } from '@/_global/components/upload';
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '@/_global/components/hook-form';
import SvgIconStyle from '@/_global/components/SvgIconStyle';
import cssStyles from '@/_global/utils/cssStyles';
import Image from '@/_global/components/Image';
import SocialsButton from '@/_global/components/SocialsButton';
import Iconify from '@/_global/components/Iconify';
import MenuPopover from '@/_global/components/MenuPopover';
// ----------------------------------------------------------------------

type FormValuesProps = {
  displayName: string;
  email: string;
  photoURL: CustomFile | string | null;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  about: string | null;
  isPublic: boolean;
};

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.lighter }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

export default function Device({setupDeviceModel}:any) {

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
      }}
    >

      <Card sx={{ textAlign: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <SvgIconStyle
            src="/global-assets/assets/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 10,
              left: 0,
              right: 0,
              bottom: -15, 
              mx: 'auto',
              position: 'absolute',
              color: 'background.paper',
            }}
          />

          <Avatar
            alt=""
            src="/global-assets/assets/meter-icon.png"
            sx={{
              width: 32,
              height: 32,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -16,
              mx: 'auto',
              position: 'absolute',
            }}
          />
          {/* <OverlayStyle /> */}
          <Image src="/global-assets/assets/product/water-meter.png" alt="" ratio="16/9" />
        </Box>
        <Stack sx={{ display: 'flex', textAlign: 'left', mt: 4, p: 2.5, alignItems: 'center', flexDirection: 'row' }}>
          <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
            <Typography variant="subtitle1" >
              Smart water meter
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              IOT Platform
            </Typography>
          </Box>
          <Button variant="contained" onClick={()=>setupDeviceModel(true)}>
            Get
          </Button>
        </Stack>
      </Card>
      <Card sx={{ textAlign: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <SvgIconStyle
            src="/global-assets/assets/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 10,
              left: 0,
              right: 0,
              bottom: -15, 
              mx: 'auto',
              position: 'absolute',
              color: 'background.paper',
            }}
          />

          <Avatar
            alt=""
            src="/global-assets/assets/fingerprint-device.png"
            sx={{
              width: 32,
              height: 32,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -16,
              mx: 'auto',
              position: 'absolute',
            }}
          />
          {/* <OverlayStyle /> */}
          <Image src="/global-assets/assets/product/Biometric-Attendance-Machines.png" alt="" ratio="16/9" />
        </Box>
        <Stack sx={{ display: 'flex', textAlign: 'left', mt: 4, p: 2.5, alignItems: 'center', flexDirection: 'row' }}>
          <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
            <Typography variant="subtitle1" >
              Fingerprint Device Gateway
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              IOT Platform
            </Typography>
          </Box>
          <Button variant="contained" onClick={()=>setupDeviceModel(true)}>
            Get
          </Button>
        </Stack>
      </Card>

    </Box>
  );
}
