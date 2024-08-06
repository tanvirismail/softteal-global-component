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
import React from 'react';
import { QrReader } from 'react-qr-reader';
import QRCode from "react-qr-code";
// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.lighter }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

const QrViewFinderStyle = styled('svg')({
    top: '0px', 
    left: '0px', 
    zIndex: 1, 
    boxSizing: 'border-box', 
    border: '50px solid transparent',
    position: 'absolute', 
    width: '100%',
    height: '100%'
});

export default function DeviceScan() {


  const [data, setData] = useState("SWM45456456");

  const handleResult = (result:any, error:any) => {
    if (!!result) {
      setData(result?.text);
    }

    // if (!!error) {
    //   console.info(error);
    // }
  }
  const ViewFinder = () => {
    return (
      <QrViewFinderStyle viewBox='0 0 100 100' >
        <path fill='none' d='M13,0 L0,0 L0,13' stroke='rgba(255, 0, 0, 0.9)' strokeWidth="5" ></path>
        <path fill='none' d='M0,87 L0,100 L13,100' stroke='rgba(255, 0, 0, 0.9)' strokeWidth="5" ></path>
        <path fill='none' d='M87,100 L100,100 L100,87' stroke='rgba(255, 0, 0, 0.9)' strokeWidth="5" ></path>
        <path fill='none' d='M100,13 L100,0 L87,0' stroke='rgba(255, 0, 0, 0.9)' strokeWidth="5" ></path>
      </QrViewFinderStyle>
    )
  }


  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <QrReader
              constraints={{ facingMode: 'environment' }}
              onResult={handleResult}
              ViewFinder={ViewFinder}
            />
          </Card>
        </Grid>
  
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              py: 5,
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            { data && 
              <Box sx={{ mb: 3 }}>
                <QRCode value={data} style={{ width: 100, height: 100 }}/>
              </Box>
            }

            <Link variant="subtitle1" color="text.primary">
              Smart water meter
            </Link>

            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              {data}
            </Typography>

            {/* <Button
              size="small"
              variant={'outlined'}
              color={ 'warning' }
              sx={{ flexShrink: 0, mt:3 }}
            >
              Installed
            </Button> */}
            <Button
                size="small"
                variant={'outlined'}
                color={ 'primary' }
                sx={{ flexShrink: 0, mt:3 }}
                >
                Available
            </Button>
          </Card>
          
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <SvgIconStyle
                src="/global-assets/assets/shape-avatar.svg"
                sx={{
                  width: 144,
                  height: 62,
                  zIndex: 10,
                  left: 0,
                  right: 0,
                  bottom: -26,
                  mx: 'auto',
                  position: 'absolute',
                  color: 'background.paper',
                }}
              />

              <Avatar
                alt=""
                src="/global-assets/assets/meter-icon.png"
                sx={{
                  width: 64,
                  height: 64,
                  zIndex: 11,
                  left: 0,
                  right: 0,
                  bottom: -32,
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
              <Button variant="contained" >
                Get
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
  );
}
