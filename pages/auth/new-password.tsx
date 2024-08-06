// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// layouts
import Layout from '../../layouts';
// components
import Page from '@/_global/components/Page';
// sections
import { NewPasswordForm } from '../../sections/auth/new-password';
// assets
import { SentIcon } from '../../assets';
import useAuth from '@/_global/hooks/useAuth';
import useIsMountedRef from '@/_global/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

NewPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function NewPassword() {

  const { forgetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const resendSubmit = async () => {
    try {
      await forgetPassword(sessionStorage.getItem('email-recovery')??"");
      enqueueSnackbar('Token successfully resend!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="New Password">
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <SentIcon sx={{ mb: 5, mx: 'auto', height: 120 }} />

          <Typography variant="h3" gutterBottom>
            Request sent successfully!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            We've sent a 5-digit confirmation email to your email.
            <br />
            Please enter the code in below box to verify your email.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <NewPasswordForm />
          </Box>

          <Typography variant="body2">
            Don’t have a code? &nbsp;
            <Link variant="subtitle2" onClick={ resendSubmit }>
              Resend code
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
