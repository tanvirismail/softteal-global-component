// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { UserType } from '@/_global/@types/user';
//
import ProfileOverview from './ProfileOverview';

// ----------------------------------------------------------------------

type Props = {
  data: UserType;
};

export default function Profile({ data }: Props) {
  return (
    <Grid >
      <Grid>
        <Stack >
          <ProfileOverview profile={data} />
        </Stack>
      </Grid>
    </Grid>
  );
}
