import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup';
import { useSettingsFormHook } from "./SettingsFormHook";


export default function WidgetSettingDialog({open, setOpen, wid, title, subtitle, data, onSubmitData}:any) {

    const { fields, setFields, rules, formData, setFormData } = useSettingsFormHook(wid,data);
    useEffect(() => {
      setFormData(data);
    }, [data]);

    const onSubmit = async (data: any) => {
      onSubmitData(data);
      
      try {
        // await changePassword(data.password, data.newPassword, data.confirmNewPassword);
        handleDialogFormOnClose();
        return {
          data: {
            message: 'Successfully saved.',
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
     
    return <>
        <DialogFullScreen open={open} setOpen={setOpen} title={title||"Settings"}>
          <Box sx={{ 
            px: { xs: 3, md: 50 },
          }}>

            { subtitle &&
              <Typography
                // gutterBottom
                // variant="caption"
                component="div"
                sx={{
                  color: 'text.disabled',
                  m: 3
                }}
              >
                {subtitle}
              </Typography>
            }

            <Form
              options={{
                column:false,
                submitBtn: true,
                submitBtnText: "Save",
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