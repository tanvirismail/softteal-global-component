import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import Iconify from "@/_global/components/Iconify";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup';


export default function NewDevice({open, setOpen}:any) {

  const formRef = useRef<any>(null);

    interface FormValuesProps {
        email: string;
        name: string;
        role: string;
      }
    const [fields, setFields] = useState<any>({
      name: {
        label: "Name",
        type: "text",
        placeholder: "Type name",
      },
    });

      const [rules] = useState<any>({
        name: Yup.string().required('name is required'),
        // query_parameters: Yup.array().min(1, 'query parameters is required'),
      });
      const [formData, setFormData] = useState<any>({
        device: "",
        event: "",
        name: "",
        url: "",
        request_type: "",
        content_type: "",
        webform_content: [
          {
            key: "",
            value: ""
          }
        ],
        json_content: `{
          "device_id": "{{device_id}}", 
          "device_name": "{{device_name}}"
        }`,
        plaintext_content: `"{{device_id}}" "{{device_name}}"`,
        query_parameters: [
          // {
          //   key: "",
          //   value: ""
          // }
        ],
        authorization_method: "",
        basic_auth_username: "",
        basic_auth_password: "",
        oauth_client_id: "",
        oauth_client_secret: "",
        oauth_token_url: "",
        http_headers: [
          // {
          //   key: "",
          //   value: ""
          // }
        ],
      });

      const onSubmit = async (data: any) => {
        setOpen(false);
        try {
          // await changePassword(data.password, data.newPassword, data.confirmNewPassword);
          return {
            data: {
              message: 'successfully created.',
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

      const submitForm = () => {
        formRef.current && formRef.current.submit();
      };

      
      const handleDialogFormOnClose = () => {
        formRef.current && formRef.current.reset();
        setOpen(false)
      };

    return <>
        <DialogForm 
          open={open} 
          setOpen={setOpen} 
          onClose={handleDialogFormOnClose}
          title="New Device" 
          subtitle="Create new device by filling in the form below"
          actions={[
            {
              component: (
                <Button color="inherit" onClick={handleDialogFormOnClose}>
                  Cancel
                </Button>
              )
            },
            {
              component: (
                <Button onClick={submitForm} variant="contained">
                  Save
                </Button>
              )
            }
          ]}
        >
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3, my:3 }}>
              <Avatar alt="" src="/global-assets/assets/meter-icon.png" sx={{ width: 48, height: 48 }} />

              <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  Smart water meter
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    IOT Platform
                  </Typography>
                </Box>
              </Box>

              {/* <Button
                size="small"
                onClick={() => setToogle(!toggle)}
                variant={toggle ? 'text' : 'outlined'}
                color={toggle ? 'primary' : 'inherit'}
                startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
                sx={{ flexShrink: 0 }}
              >
                {toggle ? 'Followed' : 'Follow'}
              </Button> */}
            </Card>
            <Form
              options={{
                column:false,
                redirect: "/dashboard/device/2/",
                cardSx: {
                  boxShadow: 'none',
                  p: 0,
                  borderRadius: 0,
                  pt:2
                },
              }}
              fields={fields}
              setFields={setFields}
              rules={rules}
              formData={formData}
              onSubmit={onSubmit}
              ref={formRef}
            />
        
        </DialogForm>
    </>
};