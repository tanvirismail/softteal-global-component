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
import Webhook from '@/_global/sections/@dashboard/organization/Webhook';
import Iconify from '@/_global/components/Iconify';
import NextLink from 'next/link';
import AddWebHook from '@/_global/sections/@dashboard/organization/AddWebHook';
// ----------------------------------------------------------------------

OrganizationGeneral.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function OrganizationGeneral() {
  const { themeStretch } = useSettings();
  const [openSidebar, setOpenSidebar] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Page title="Organization webhooks">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Organization webhooks"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Organization' },
            { name: 'Webhooks' },
          ]}
          action={
            <>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={()=>setOpenDialog(true)}>
                Add new
              </Button>
              <AddWebHook open={openDialog} setOpen={setOpenDialog}/>
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
          <Webhook />
        </Card>
      </Container>
    </Page>
  );
}
