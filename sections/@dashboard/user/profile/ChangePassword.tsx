import { useState } from 'react';
// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { UserType } from '@/_global/@types/user';
//
import Form from '@/_global/Ncomponents/form';
import * as Yup from 'yup';
import useAuth from '@/_global/hooks/useAuth';
import useIsMountedRef from '@/_global/hooks/useIsMountedRef';

// ----------------------------------------------------------------------

interface FormValuesProps {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePassword() {
  const { changePassword } = useAuth();
  const isMountedRef = useIsMountedRef();

  const [fields, setFields] = useState<any>({
    password: {
      label: "Password",
      type: "password",
      placeholder: "Type your password",
      required: true,
    },
    newPassword: {
      label: "New Password",
      type: "password",
      placeholder: "Type your new password",
      required: true,
    },
    confirmNewPassword: {
      label: "Confirm New Password",
      type: "password",
      placeholder: "Type your confirm new password",
      required: true,
    },
  });
  const [rules] = useState<any>({
    password: Yup.string().required('Password is required'),
    newPassword: Yup.string().required('New password is required'),
    confirmNewPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword'), null], 'New passwords must match'),
  });
  const [formData, setFormData] = useState<FormValuesProps>({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const onSubmit = async (data: any) => {
    try {
      await changePassword(data.password, data.newPassword, data.confirmNewPassword);
      return {
        data: {
          message: 'Password successfully changed.',
        },
        status: 200
      };
    } catch (error) {
      console.error(error);
      if (isMountedRef.current) {
        return {
          data : error,
          status: 422
        };
      }
    }
  };

  return (
    <Form
      options={{
        column:false,
        submitBtn: true,
        submitBtnText: "Change Password",
        validateMode: "onChange",
        redirect: "/dashboard/profile",
        actionPosition: 'bottom',
        actionContent: 'center',
        cardSx: {
          display: 'flex',
          justifyContent: 'center',
          p: 4
        },
        cardBodySx: {
          width:400,
        }
      }}
      fields={fields}
      setFields={setFields}
      rules={rules}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
}
