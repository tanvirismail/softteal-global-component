import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import { Box, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import * as Yup from 'yup';


export default function DownloadReportDialog({open, setOpen}:any) {

    interface FormValuesProps {
        name: string;
      }
    const [fields, setFields] = useState<any>({
        time_range: {
          label: "Choose time range for report data",
          type: "radio",
          options: [
            {
              label:"24 Hours",
              value:"a",
            },
            {
              label:"Last week",
              value:"b",
            },
            {
              label:"Last month",
              value:"c",
            },
            {
              label:"Last 3 month",
              value:"d",
            },
          ],
          row: true,
        },
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
        data_aggregation: {
          label: "Data Aggregation",
          type: "radio",
          options: [
            {
              label:"Raw data",
              value:"a",
            },
            {
              label:"1 Minute",
              value:"b",
            },
            {
              label:"1 Hour",
              value:"c",
            },
            {
              label:"1 Day",
              value:"d",
            },
          ],
          row: true,
        },
      });
      const [rules] = useState<any>({
        // name: Yup.string().required('name is required'),
      });
      const [formData, setFormData] = useState<any>({
        time_range: "",
        event_data: Boolean(0),
        send_email: Boolean(0),
        data_aggregation: "",
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
        <DialogFullScreen open={open} setOpen={setOpen} title="Generate Report">
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
              Get a complete report in .CSV format. Once
              generated, you can download it. You can optionally
              send a link to the generated file to the e-mail address.
            </Typography>

            <Form
              options={{
                column:false,
                submitBtn: true,
                submitBtnText: "Generate Report",
                validateMode: "onChange",
                // redirect: "/dashboard/profile",
                actionPosition: 'bottom',
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