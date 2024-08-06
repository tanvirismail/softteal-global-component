// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// @types
import { UserType } from '@/_global/@types/user';
// components
import Iconify from '@/_global/components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

type Props = {
  profile: UserType;
};

export default function ProfileOverview({ profile }: Props) {
  const { first_name, last_name, country, email, username, avatar, status } = profile;

  return (
    <Card>
      <CardHeader title="Overview" />

      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{email}</Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
