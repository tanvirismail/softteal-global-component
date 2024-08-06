import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '@/routes';
// components
import { FormProvider, RHFTextField } from '@/_global/components/hook-form';
import useAuth from '@/_global/hooks/useAuth';
import useIsMountedRef from '@/_global/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  afterSubmit?: string;
};

export default function ResetPasswordForm() {
  const { push } = useRouter();
  const { forgetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await forgetPassword(data.email);

      sessionStorage.setItem('email-recovery', data.email);
      enqueueSnackbar('We have emailed your password reset link!');

      push(PATH_AUTH.newPassword);
    } catch (error) {
      console.error(error);
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Send Request
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
