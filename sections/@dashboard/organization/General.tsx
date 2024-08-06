//
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// redux
import Form from '@/_global/Ncomponents/form';
import * as Yup from 'yup';
// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

// ----------------------------------------------------------------------
interface FormValuesProps {
  name: string;
  description: string;
  phone: string;
  logo: any;
}

export default function General() {

  const [fields, setFields] = useState<any>({
    name: {
      label: "Organization name",
      type: "text",
      placeholder: "Type organization name",
      required: true,
    },
    phone: {
      label: "Phone number",
      type: "number",
      placeholder: "Type phone number",
      required: true,
    },
    description: {
      label: "Description",
      type: "text",
      placeholder: "Type description",
      multiline: true,
      minRows: 9,
    },
    logo: {
      label: "Logo",
      type: "file",
      title: "Drop or Select file",
    },
  });
  const [rules] = useState<any>({
    name: Yup.string().required('Organization name is required'),
    description: Yup.string().nullable(),
    phone: Yup.string().required('Phone number is required'),
    // logo: Yup.mixed().test('required', 'avater is required', (value) => value !== ''),
  });
  const [formData, setFormData] = useState<FormValuesProps>({
    name: "",
    description: "",
    phone: "",
    logo: "",
  });
  const onSubmit = async (data: any) => {
    try {
      // await changePassword(data.password, data.newPassword, data.confirmNewPassword);
      return {
        data: {
          message: 'Password successfully changed.',
        },
        status: 200
      };
    } catch (error) {
      console.error(error);
      // if (isMountedRef.current) {
        return {
          data : error,
          status: 422
        };
      // }
    }
  };

  return (
    <RootStyle>
      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <Form
          options={{
            column:true,
            submitBtn: true,
            submitBtnText: "Save",
            validateMode: "onChange",
            redirect: "/dashboard/profile",
            actionPosition: 'bottom',
            // actionContent: 'center',
            cardSx: {
              boxShadow: 'none'
            },
            // cardBodySx: {
            //   width:400,
            // }
          }}
          fields={fields}
          setFields={setFields}
          rules={rules}
          formData={formData}
          onSubmit={onSubmit}
        />
      </Box>
    </RootStyle>
  );
}
