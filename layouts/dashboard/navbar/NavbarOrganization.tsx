// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Link, Typography } from '@mui/material';
// hooks
import useAuth from '@/_global/hooks/useAuth';
// routes
import { PATH_BUSINESS, PATH_DASHBOARD } from '@/routes';
// components
import MyAvatar from '@/_global/components/MyAvatar';
import createAvatar from '@/_global/utils/createAvatar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarOrganization({ isCollapse }: Props) {
  const { user, manageBusiness } = useAuth();
  const businessName = manageBusiness?.business?.name || "My Business";

  return (
    <NextLink href={process.env.AUTHSERVER_HOST + '/business/general'} passHref>
      <Link underline="none" color="inherit">
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          <Avatar
            src=""
            alt=""
            color={user?.photoURL ? 'default' : createAvatar(businessName).color}
          >
            {createAvatar(businessName).name}
          </Avatar>

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {businessName}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
              {manageBusiness?.roles[0]?.display_name}
            </Typography>
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  );
}
