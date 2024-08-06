import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import { Box, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import * as Yup from 'yup';


export default function DatastreamDialog({open, setOpen}:any) {

    interface FormValuesProps {
        name: string;
      }
    const [fields, setFields] = useState<any>({
        name: {
          label: "Name",
          type: "text",
          placeholder: "Type name",
        },
        name_alias: {
          label: "Name Alias",
          type: "text",
          placeholder: "Type alias",
        },
        color: {
          label: "color",
          type: "color",
          placeholder: "Type textarea",
          format: "hex", // hex, hex8, rgb, hsv, hsl
          adornmentPosition: "end", // start, end
        },
        units: {
          label: "Select Units",
          type: "select",
          option: [
            {value:"in",label:"inch"},
            {value:"ft",label:"foot"},
            {value:"c",label:"celcius"},
            {value:"f",label:"farenheit"},
          ],
        },
        min: {
          label: "Min",
          type: "number",
          placeholder: "Type min",
        },
        max: {
          label: "Max",
          type: "number",
          placeholder: "Type max",
        },
        default_value: {
          label: "Default value",
          type: "text",
          placeholder: "Type default value",
        },
        data_type: {
          label: "Select data type",
          type: "select",
          option: [
            {value:"int",label:"integer"},
            {value:"str",label:"string"},
          ],
        },
        dynamicInput: {
          type: "dynamic",
          label: "Enumable value set",
          fields: {
            incoming: {
              label: "Incoming (int)",
              type: "number",
              placeholder: "Type incoming",
            },
            outcome: {
              label: "Outcome (string)",
              type: "text",
              placeholder: "Type outcome",
            },
          },
          data: {
            incoming: "",
            outcome: ""
          },
          fullWidth: true,
        },
        save_raw_data: {
          type: "switch",
          labelPlacement: "start",
          title: "Raw data",
          subtitle: "save raw data",
        },
        sync_data: {
          type: "switch",
          labelPlacement: "start",
          title: "Sync data",
          subtitle: "sync with latest server value every time device connects to the cloud",
        },
        service_charts: {
          type: "switch",
          labelPlacement: "start",
          title: "Service charts",
          subtitle: "show in service charts",
        },
        reports: {
          type: "switch",
          labelPlacement: "start",
          title: "Reports",
          subtitle: "show in reports",
        },
      });
      const [rules] = useState<any>({
        // name: Yup.string().required('name is required'),
      });
      const [formData, setFormData] = useState<any>({
        name: "",
        name_alias: "",
        color: "",
        units: "",
        min: 0,
        max: 0,
        default_value: "",
        data_type: "",
        dynamicInput: [
          {
            incoming: "",
            outcome: ""
          }
        ],
        save_raw_data: Boolean(0),
        sync_data: Boolean(0),
        service_charts: Boolean(0),
        reports: Boolean(0),
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
        <DialogFullScreen open={open} setOpen={setOpen} title="New Datastream">
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
              Datastreams is a way to structure data that regularly flows in and out from device. Use it for sensor data, any telemetry, or actuators.
            </Typography>

            <Form
              options={{
                // column:false,
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