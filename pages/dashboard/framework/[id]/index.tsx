import Layout from '@/_global/layouts';
import Page from '@/_global/components/Page';
import { Avatar, Box, Button, Card, CardContent, Container, IconButton, Link, MenuItem, Stack, Tab, Tabs, Typography, styled } from '@mui/material';
import useSettings from '@/_global/hooks/useSettings';
import HeaderBreadcrumbs from '@/_global/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '@/routes';
import { PATH_DEVICE } from '@/routes';
import Form from '@/_global/Ncomponents/form';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import Iconify from '@/_global/components/Iconify';
import NextLink from 'next/link';
import axios from '@/_global/utils/axios';
import qs from 'qs';
import { useRouter } from 'next/router';
import SocialsButton from '@/_global/components/SocialsButton';
import MenuPopover from '@/_global/components/MenuPopover';
import useTabs from '@/_global/hooks/useTabs';
import { capitalCase } from 'change-case';
import FrameworkHome from '@/_global/sections/@dashboard/framework/FrameworkHome';
import FrameworkDatastream from '@/_global/sections/@dashboard/framework/FrameworkDatastream';
import FrameworkWebDashboard from '@/_global/sections/@dashboard/framework/FrameworkWebDashboard';

import DeviceDashboard from '@/_global/sections/@dashboard/device/DeviceDashboard';
import DeviceInfo from '@/_global/sections/@dashboard/device/DeviceInfo';
import DeviceMetadata from '@/_global/sections/@dashboard/device/DeviceMetadata';
import DeviceActionLog from '@/_global/sections/@dashboard/device/DeviceActionLog';
import DeviceTimeline from '@/_global/sections/@dashboard/device/DeviceTimeline';
import RenameDialog from '@/_global/sections/@dashboard/device/dialog/RenameDialog';
import DownloadReportDialog from '@/_global/sections/@dashboard/device/dialog/DownloadReportDialog';
import NotificationSettingDialog from '@/_global/sections/@dashboard/device/dialog/NotificationSettingDialog';
import RebootDialog from '@/_global/sections/@dashboard/device/dialog/RebootDialog';
import PingDialog from '@/_global/sections/@dashboard/device/dialog/PingDialog';
import UpdateFirmwareDialog from '@/_global/sections/@dashboard/device/dialog/UpdateFirmwareDialog';
import SvgIconStyle from '@/_global/components/SvgIconStyle';
import Image from '@/_global/components/Image';
import TextMaxLine from '@/_global/components/TextMaxLine';
import ConfirmDialog from '@/_global/Ncomponents/ConfirmDialog';
import { useSnackbar } from 'notistack';
import NewFramework from '@/_global/sections/@dashboard/framework/NewFramework';
import cssStyles from '@/_global/utils/cssStyles';
import FrameworkMetadata from '@/_global/sections/@dashboard/framework/FrameworkMetadata';
import FrameworkEvent from '@/_global/sections/@dashboard/framework/FrameworkEvent';
// ----------------------------------------------------------------------

Edit.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};
  
// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.neutral,
  // backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.lighter }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

export default function Edit() {
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();

    const router = useRouter()
    const {
      query: { id },
    } = router


  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const PROFILE_TABS = [
    {
      value: 'Home',
      icon: <Iconify icon={'eva:home-outline'} width={20} height={20} />,
      component: <FrameworkHome />,
    },
    {
      value: 'Datastreams',
      icon: <Iconify icon={'solar:play-stream-bold'} width={20} height={20} />,
      component: <FrameworkDatastream />,
    }, 
    {
      value: 'web dashboard',
      icon: <Iconify icon={'eva:pie-chart-outline'} width={20} height={20} />,
      component: <FrameworkWebDashboard />,
    }, 
    // {
    //   value: 'automation',
    //   icon: <Iconify icon={'eva:settings-2-outline'} width={20} height={20} />,
    //   component: <DeviceMetadata />,
    // }, 
    {
      value: 'metadata',
      icon: <Iconify icon={'eva:pricetags-outline'} width={20} height={20} />,
      component: <FrameworkMetadata />,
    }, 
    // {
    //   value: 'events',
    //   icon: <Iconify icon={'eva:calendar-outline'} width={20} height={20} />,
    //   component: <FrameworkEvent />,
    // }, 
    // {
    //   value: 'firmware',
    //   icon: <Iconify icon={'carbon:ibm-cloud-event-streams'} width={20} height={20} />,
    //   component: <FrameworkMetadata />,
    // }, 
    // {
    //   value: 'Mobile dashboard',
    //   icon: <Iconify icon={'eva:smartphone-outline'} width={20} height={20} />,
    //   component: <FrameworkMetadata />,
    // }, 
  ];
  const { currentTab, onChangeTab } = useTabs('Home');

  const [openRenameDialog, setRenameDialog] = useState(false);
  const [downloadReportDialog, setDownloadReportDialog] = useState(false);
  const [notificationSettingDialog, setNotificationSettingDialog] = useState(false);
  const [rebootDialog, setRebootDialog] = useState(false);
  const [pingDialog, setPingDialog] = useState(false);
  const [updateFirmwareDialog, setUpdateFirmwareDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const eraseAllData = () => {
    enqueueSnackbar('Successfully Erased all device data.');
    return true;
  };
  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteDevice = () => {
    enqueueSnackbar('Successfully deleted.');
    return true;
  };

  const [newDialog, setNewDialog] = useState(false);

    return (
        <Page title="Device: Details">
            <Container maxWidth={themeStretch ? false : 'lg'}>
              <HeaderBreadcrumbs
                heading="Framework details"
                links={[
                  { name: 'Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Framework', href: PATH_DASHBOARD.framework.index },
                  { name: 'details' },
                ]}
                action={
                  <>
                    {/* <NextLink href={PATH_DEVICE.device.device} passHref>
                      <Button variant="outlined" color='secondary' startIcon={<Iconify icon={'eva:corner-up-left-outline'} />}>
                        Back
                      </Button>
                    </NextLink>
                    <NextLink href={PATH_DEVICE.device.edit(id as string)} passHref>
                      <Button variant="outlined" sx={{ml:2}} startIcon={<Iconify icon={'eva:edit-outline'} />}>
                        Edit
                      </Button>
                    </NextLink> */}
                  </>
                }
              />
              <Card sx={{mb:3}}>
                <Box sx={{ position: 'relative' }}>
                  <SvgIconStyle
                    src="/global-assets/assets/shape-avatar.svg"
                    sx={{
                      width: 80,
                      height: 36,
                      zIndex: 9,
                      bottom: -15,
                      position: 'absolute',
                      color: 'background.paper',
                    }}
                  />
                  <Avatar
                    alt=""
                    src=""
                    sx={{
                      left: 24,
                      zIndex: 9,
                      width: 32,
                      height: 32,
                      bottom: -16,
                      position: 'absolute',
                    }}
                  />
                   <OverlayStyle />
                  <Image alt="cover" src="/global-assets/assets/header-background1.png" 
                    sx={{
                      pt: 'calc(100% / 21 * 1)',
                      '& .wrapper': {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        lineHeight: 0,
                        position: 'absolute',
                        backgroundSize: 'cover !important',
                      },
                    }}
                    />
                </Box>
                <CardContent
                  sx={{
                    py: 4.5,
                    width: 1,
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'column',
                  }}
                >
               
                  <>
                    <Typography
                      // gutterBottom
                      variant="caption"
                      component="div"
                      sx={{
                        color: 'text.disabled',
                      }}
                    >
                      Active
                    </Typography>
                    <TextMaxLine
                      variant='subtitle2'
                      line={2}
                      persistent
                    >
                      Test device
                    </TextMaxLine>
                  </>
       
                  <NewFramework open={newDialog} setOpen={setNewDialog}/>
                  <RenameDialog open={openRenameDialog} setOpen={setRenameDialog}/>
                  <DownloadReportDialog open={downloadReportDialog} setOpen={setDownloadReportDialog}/>
                  <NotificationSettingDialog open={notificationSettingDialog} setOpen={setNotificationSettingDialog}/>
                  <RebootDialog open={rebootDialog} setOpen={setRebootDialog}/>
                  <PingDialog open={pingDialog} setOpen={setPingDialog}/>
                  <UpdateFirmwareDialog open={updateFirmwareDialog} setOpen={setUpdateFirmwareDialog}/>
                  <ConfirmDialog
                    open={confirmDialog}
                    close={() => setConfirmDialog(false)}
                    title="Confirmation to Erase all data!"
                    body="Are you sure?"
                    confirm={ () => eraseAllData() }
                  />
                  <ConfirmDialog
                    open={deleteDialog}
                    close={() => setDeleteDialog(false)}
                    title="Confirmation to delete!"
                    body="Are you sure?"
                    confirm={ () => deleteDevice() }
                  />

                  <MoreMenuButton
                    open={open}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                      <>
                        <MenuItem onClick={()=>{
                          handleCloseMenu()
                          setNewDialog(true)
                        }}>
                          <Iconify icon={'eva:edit-fill'} />
                          Edit
                        </MenuItem>
                        <MenuItem onClick={()=>{
                          handleCloseMenu()
                          setDeleteDialog(true)
                        }} sx={{ color: 'error.main' }}>
                          <Iconify icon={'eva:trash-2-outline'} />
                          Delete
                        </MenuItem>
                      </>
                    }
                  />
              
                </CardContent>
                <TabsWrapperStyle>
                  <Tabs
                    allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"
                    value={currentTab}
                    onChange={onChangeTab}
                  >
                    {PROFILE_TABS.map((tab) => (
                      <Tab
                        disableRipple
                        key={tab.value}
                        value={tab.value}
                        icon={tab.icon}
                        label={capitalCase(tab.value)}
                      />
                    ))}
                  </Tabs>
                </TabsWrapperStyle>
              </Card>
              {PROFILE_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return isMatched && <Box key={tab.value}>{tab.component}</Box>;
              })}
            </Container>
        </Page>
    )
}

type MoreMenuButtonProps = {
  actions: React.ReactNode;
  open: HTMLElement | null;
  onClose: VoidFunction;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
};

function MoreMenuButton({ actions, open, onOpen, onClose }: MoreMenuButtonProps) {
  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={onOpen}
        sx={{ top: 8, right: 8, position: 'absolute' }}
      >
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        sx={{
          ml: 0.5,
          width: 'auto',
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopover>
    </>
  );
}