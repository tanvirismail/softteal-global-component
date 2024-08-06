import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import { Box, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import * as Yup from 'yup';
import { Block } from '@/_global/sections/overview/Block';

export default function PingDialog({open, setOpen}:any) {

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
        <DialogFullScreen open={open} setOpen={setOpen} title="Device ping">
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
              Check device response.
            </Typography>

            <Block sx={{
              color: 'text.disabled',
            }}>
              <Typography>[2023-08-14 00:00:00] 74.125.24.101 bytes=64 time:100ms</Typography> 
              <Typography>[2023-08-14 00:00:00] 74.125.24.101 bytes=64 time:100ms</Typography> 
            </Block>
          </Box>
        </DialogFullScreen>
    </>
};