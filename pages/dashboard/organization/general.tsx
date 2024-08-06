import { useState } from 'react';
// @mui
import { Container, Card, Box, Typography, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes';
// hooks
import useSettings from '@/_global/hooks/useSettings';
// layouts
import Layout from '@/_global/layouts';
// components
import Page from '@/_global/components/Page';
import HeaderBreadcrumbs from '@/_global/components/HeaderBreadcrumbs';
// sections
import Sidebar from '@/_global/sections/@dashboard/organization/SideBar';
import General from '@/_global/sections/@dashboard/organization/General';
import Iconify from '@/_global/components/Iconify';
import NextLink from 'next/link';
// ----------------------------------------------------------------------

OrganizationGeneral.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function OrganizationGeneral() {
  const { themeStretch } = useSettings();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Page title="Organization">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Organization"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Organization' },
            { name: 'General' },
          ]}
          action={
            <>
                 <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                  {/* <Avatar alt="avatar" src="" sx={{ width: 48, height: 48 }} /> */}
  
                  <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                    <Typography variant="subtitle2" noWrap>
                      Free Plan
                    </Typography>
  
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        Users 1 of 5, Devices 1 of 2
                      </Typography>
                    </Box>
                  </Box>
  
                  <NextLink href="/dashboard/organization/plan/" passHref>
                    <Button
                      size="small"
                      // onClick={() => setToogle(!toggle)}
                      variant={'outlined'}
                      color={ 'primary' }
                      startIcon={ <Iconify icon={'uim:rocket'} /> }
                      sx={{ flexShrink: 0 }}
                    >
                      Upgrade
                    </Button>
                  </NextLink>
                </Card>
            </>
            }
        />
        <Card
          sx={{
            minHeight: 480,
            // height: { md: '72vh' },
            display: { md: 'flex' },
          }}
        >
          <Sidebar
            isOpenSidebar={openSidebar}
            onCloseSidebar={() => setOpenSidebar(false)}
          />
          <General />
        </Card>
      </Container>
    </Page>
  );
}
