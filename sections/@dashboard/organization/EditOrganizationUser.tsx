import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import Form from "@/_global/Ncomponents/form";
import { Box } from "@mui/material";
import { useState } from "react";
import * as Yup from 'yup';


export default function EditOrganizationUser({open, setOpen}:any) {

    interface FormValuesProps {
        email: string;
        name: string;
        role: string;
      }
    const [fields, setFields] = useState<any>({
        email: {
          label: "Email",
          type: "select",
          placeholder: "Select email",
          option: [
            {value:"admin@mail.com",label:"admin@mail.com"},
            {value:"staff@mail.com",label:"staff@mail.com"},
          ],
          disabled: true
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "Type name",
        },
        role: {
          label: "Role",
          type: "select",
          placeholder: "Select role",
          option: [
            {value:"admin",label:"Admin"},
            {value:"staff",label:"Staff"},
          ],
        },

      });
      const [rules] = useState<any>({
        email: Yup.string().required('email is required'),
        name: Yup.string().required('name is required'),
        role: Yup.string().required('role is required'),
      });
      const [formData, setFormData] = useState<FormValuesProps>({
        email: "staff@mail.com",
        name: "staff",
        role: "staff",
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

    return <>
        <DialogFullScreen open={open} setOpen={setOpen} title="Invite new user">
          <Box sx={{ px: { xs: 3, md: 50 } }}>
            <Form
              options={{
                column:false,
                submitBtn: true,
                submitBtnText: "Send",
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
        </DialogFullScreen>
    </>
};