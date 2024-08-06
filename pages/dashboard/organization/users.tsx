import NextLink from 'next/link';
import { useState } from 'react';
// @mui
import { Container, Card, Button } from '@mui/material';
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
import Users from '@/_global/sections/@dashboard/organization/Users';
import Iconify from '@/_global/components/Iconify';
import DialogFullScreen from '@/_global/Ncomponents/DialogFullScreen';
import InviteOrganizationUser from '@/_global/sections/@dashboard/organization/InviteUser';

// ----------------------------------------------------------------------

OrganizationUsers.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function OrganizationUsers() {
  const { themeStretch } = useSettings();
  const [openSidebar, setOpenSidebar] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Page title="Organization">

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Organization Users"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Organization' },
            { name: 'Users' },
          ]}
          action={
          <>
            <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={()=>setOpenDialog(true)}>
              Invite new user
            </Button>
            <InviteOrganizationUser open={openDialog} setOpen={setOpenDialog}/>
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
          <Users />
        </Card>
      </Container>
    </Page>
  );
}
