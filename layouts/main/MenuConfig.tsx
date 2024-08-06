// routes
import { PATH_AUTH } from '@/routes';
// components
import { PATH_AFTER_LOGIN } from '@/_global/config';
// components
import Iconify from '@/_global/components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Login',
    icon: <Iconify icon={'eva:log-in-fill'} {...ICON_SIZE} />,
    path: PATH_AUTH.login,
  },
];

export default menuConfig;
