import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, List, Drawer, Button, Divider } from '@mui/material';
// redux
import { useSelector } from '@/_global/redux/store';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAVBAR } from '../../../config';
// components
import Iconify from '@/_global/components/Iconify';
import Scrollbar from '@/_global/components/Scrollbar';
import { SkeletonMailSidebarItem } from '@/_global/components/skeleton';
//
import MailSidebarItem from './MailSidebarItem';

// ----------------------------------------------------------------------

type Props = {
  isOpenSidebar: boolean;
  onOpenCompose: VoidFunction;
  onCloseSidebar: VoidFunction;
};

export default function MailSidebar({ isOpenSidebar, onOpenCompose, onCloseSidebar }: Props) {
  const { pathname } = useRouter();

  const { labels } = useSelector((state) => state.mail);

  const isDesktop = useResponsive('up', 'md');

  const loading = !labels.length;

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenCompose = () => {
    onCloseSidebar();
    onOpenCompose();
  };

  const renderContent = (
    <Scrollbar>
      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Iconify icon={'eva:plus-fill'} />}
          onClick={handleOpenCompose}
        >
          Compose
        </Button>
      </Box>

      <Divider />

      <List disablePadding>
        {(loading ? [...Array(8)] : labels).map((label, index) =>
          label ? (
            <MailSidebarItem key={label.id} label={label} />
          ) : (
            <SkeletonMailSidebarItem key={index} />
          )
        )}
      </List>
    </Scrollbar>
  );

  return (
    <>
      {isDesktop ? (
        <Drawer
          variant="permanent"
          PaperProps={{ sx: { width: NAVBAR.BASE_WIDTH, position: 'relative' } }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: NAVBAR.BASE_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
