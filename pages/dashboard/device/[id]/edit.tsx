import Layout from '@/_global/layouts';
import Page from '@/_global/components/Page';
import { Button, Container } from '@mui/material';
import useSettings from '@/_global/hooks/useSettings';
import HeaderBreadcrumbs from '@/_global/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '@/routes/paths';
import { PATH_DEVICE } from '@/routes';
import Form from '@/_global/Ncomponents/form';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import Iconify from '@/_global/components/Iconify';
import NextLink from 'next/link';
import axios from '@/_global/utils/axios';
import qs from 'qs';
// ----------------------------------------------------------------------

Edit.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};
  
// ----------------------------------------------------------------------

export default function Edit() {
    const { themeStretch } = useSettings();

    const [fields, setFields] = useState<any>({
        first_name: {
          label: "First name",
          type: "text",
          placeholder: "Type first name",
        },
        last_name: {
          label: "Last name",
          type: "text",
          placeholder: "Type last name",
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "Type email",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Type username",
        },
        status: {
            label: "Status",
            type: "radio",
            options: [
              {
                label:"Active",
                value:"active",
              },
              {
                label:"Inactive",
                value:"inactive",
              },
            ],
            row: true,
        },
    });
    const [rules] = useState<any>({
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        email: Yup.string().email().required('Email is required'),
        username: Yup.string().required('Username is required'),
        status: Yup.string().required('status is required'),
    });
    const [formData, setFormData] = useState<any>({
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      status: "",
    });
    
    const onSubmit = async (data: any) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
    
        // for success
        return {
          data: {
            message: 'successfully updated!',
          },
          status: 200
        };
    
        // for error
        // return {
        //   data: {
        //     errors: {
        //       text: {
        //         message: "Something wrongs!"
        //       }
        //     }
        //   },
        //   status: 422
        // };
    };

    // const getData = useCallback(async () => {
    //   try {
    //     // await new Promise((resolve) => setTimeout(resolve, 1000));
    //     setFormData((prev:any)=>({
    //       ...prev,
    //       first_name: "tanvir",
    //       last_name: "ismail",
    //       email: "tanvir@mail.com",
    //       username: "tanvir",
    //       status: "active",
    //     }));  
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }, []);

    useEffect(() => {
      // getData();
      setFormData((prev:any)=>({
        ...prev,
        first_name: "tanvir",
        last_name: "ismail",
        email: "tanvir@mail.com",
        username: "tanvir",
        status: "active",
      }));
      
    }, []);

    return (
        <Page title="Device: Update">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                  heading="Update device"
                  links={[
                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    { name: 'Device', href: PATH_DEVICE.device.device },
                    { name: 'Edit device' },
                  ]}
                  action={
                    <>
                      <NextLink href={PATH_DEVICE.device.device} passHref>
                        <Button variant="outlined" color='secondary' startIcon={<Iconify icon={'eva:corner-up-left-outline'} />}>
                          Back
                        </Button>
                      </NextLink>
                    </>
                  }
                />
                <Form
                    options={{
                      submitBtn: true,
                      submitBtnText: "Update",
                      resetBtn: true,
                      redirect: "/dashboard/device",
                      actionPosition: 'bottom',
                      clearBtn: true,
                    }}
                    fields={fields}
                    setFields={setFields}
                    rules={rules}
                    formData={formData}
                    onSubmit={onSubmit}
                />
            </Container>
        </Page>
    )
}