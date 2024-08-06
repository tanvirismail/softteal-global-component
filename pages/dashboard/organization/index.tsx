import { useEffect, useState } from 'react';
// @mui
import { Container, Card } from '@mui/material';
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
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

Mail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Mail() {

  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.organization.index) {
      push(PATH_DASHBOARD.organization.general);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;

}
