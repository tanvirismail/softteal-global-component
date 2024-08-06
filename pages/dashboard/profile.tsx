import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Tooltip, IconButton, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes';
// hooks
import useTabs from '@/_global/hooks/useTabs';
import useAuth from '@/_global/hooks/useAuth';
import useSettings from '@/_global/hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '@/_global/_mock';
// layouts
import Layout from '@/_global/layouts';
// components
import Page from '@/_global/components/Page';
import Iconify from '@/_global/components/Iconify';
import HeaderBreadcrumbs from '@/_global/components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ChangePassword,
} from '@/_global/sections/@dashboard/user/profile';
import MenuPopover from '@/_global/components/MenuPopover';
import { TableMoreMenu } from "@/_global/Ncomponents/table";

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

UserProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();

  const { user } : any = useAuth();

  const { currentTab, onChangeTab } = useTabs('overview');

  const TABS_CONTENT = [
    {
      value: 'overview',
      icon: <Iconify icon={'eva:color-palette-outline'} width={20} height={20} />,
      component: <Profile data={user} />,
    },
    {
      value: 'change_password',
      icon: <Iconify icon={'eva:lock-outline'} width={20} height={20} />,
      component: <ChangePassword />,
    }, 
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: user?.username || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {TABS_CONTENT.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
            {/* <>
              <IconButton onClick={(event: React.MouseEvent<HTMLElement>) => {
                setOpenMenu(event.currentTarget);
              }} sx={{ml: 2, width: 50}}>
                <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
              </IconButton>
              <MenuPopover
                open={Boolean(openMenu)}
                anchorEl={openMenu}
                onClose={()=>setOpenMenu(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                arrow="top-right"
                sx={{
                  '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                    '& svg': { mr: 2, width: 20, height: 20 },
                  },
                }}
              >
                <MenuItem >
                  Deactivate
                </MenuItem>
              </MenuPopover>
            </> */}
          </TabsWrapperStyle>
        </Card>

        {TABS_CONTENT.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}

      </Container>
    </Page>
  );
}
