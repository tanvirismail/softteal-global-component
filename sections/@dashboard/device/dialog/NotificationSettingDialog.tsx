import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import { Box, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import * as Yup from 'yup';


export default function NotificationSettingDialog({open, setOpen}:any) {

    interface FormValuesProps {
        name: string;
      }
    const [fields, setFields] = useState<any>({
        event_data: {
          label: "Event data",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Events data",
          subtitle: "Includes all events log data",
        },
        send_email: {
          label: "Send to email",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Send to email",
          subtitle: "Send a download link to email",
        },
      });
      const [rules] = useState<any>({
        // name: Yup.string().required('name is required'),
      });
      const [formData, setFormData] = useState<any>({
        event_data: Boolean(0),
        send_email: Boolean(0),
      });
      const onSubmit = async (data: any) => {
        try {
          // await changePassword(data.password, data.newPassword, data.confirmNewPassword);
          handleDialogFormOnClose();
          return {
            data: {
              message: 'Successfully generated.',
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

      const formRef = useRef<any>(null);
      const handleDialogFormOnClose = () => {
        formRef.current && formRef.current.reset();
        setOpen(false)
      };
      const submitForm = () => {
        formRef.current && formRef.current.submit();
      };

    return <>
        <DialogFullScreen open={open} setOpen={setOpen} title="Notification Settings">
          <Box sx={{ 
            px: { xs: 3, md: 50 },
          }}>

            <Typography
              // gutterBottom
              // variant="caption"
              component="div"
              sx={{
                color: 'text.disabled',
                m: 3
              }}
            >
              Notifications/Alerts is a crucial part of any IoT solution. 
            </Typography>

            <Form
              options={{
                column:false,
                submitBtn: true,
                submitBtnText: "Generate Report",
                validateMode: "onChange",
                // redirect: "/dashboard/profile",
                // actionPosition: 'bottom',
                // actionContent: 'center',
                cardSx: {
                  boxShadow: 'none'
                },
                cancelBtn: true,
                cancelAction: ()=>{
                  setOpen(false)
                },
              }}
              fields={fields}
              setFields={setFields}
              rules={rules}
              formData={formData}
              onSubmit={onSubmit}
              ref={formRef}
            />
          </Box>
        </DialogFullScreen>
    </>
};