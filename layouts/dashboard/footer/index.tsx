// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Container, Typography, Link } from '@mui/material';
// hooks
import useOffSetTop from '@/_global/hooks/useOffSetTop';
import useResponsive from '@/_global/hooks/useResponsive';
// utils
import cssStyles from '@/_global/utils/cssStyles';
// config
import { HEADER, NAVBAR } from '@/_global/config';
// components
import Logo from '@/_global/components/Logo';
import Iconify from '@/_global/components/Iconify';
import { IconButtonAnimate } from '@/_global/components/animate';
//
import Searchbar from '../header/Searchbar';
import AccountPopover from '../header/AccountPopover';
import LanguagePopover from '../header/LanguagePopover';
import ContactsPopover from '../header/ContactsPopover';
import NotificationsPopover from '../header/NotificationsPopover';
import useSettings from '@/_global/hooks/useSettings';

// ----------------------------------------------------------------------

type RootStyleProps = {
  isCollapse: boolean;
  verticalLayout: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'verticalLayout',
})<RootStyleProps>(({ isCollapse, verticalLayout, theme }) => ({
  // height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  [theme.breakpoints.up('lg')]: {
    // height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse?: boolean;
  verticalLayout?: boolean;
};

export default function DashboardFooter({
  isCollapse = false,
  verticalLayout = false,
}: Props) {

  return (
    <RootStyle isCollapse={isCollapse} verticalLayout={verticalLayout} position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0 }}>
      <Box sx={{ p: 2 }} >
        <Typography variant="caption" component="p">
          © All rights reserved, Developed by <Link href="http://softteal.com/">Softteal.com</Link>
        </Typography>
      </Box>
    </RootStyle>
  );
}
