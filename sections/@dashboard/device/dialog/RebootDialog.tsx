import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

export default function RebootDialog({open, setOpen}:any) {

    interface FormValuesProps {
        name: string;
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
      });
      const [formData, setFormData] = useState<FormValuesProps>({
        name: "",
      });
      const onSubmit = async (data: any) => {
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
      const submitForm = () => {
        formRef.current && formRef.current.submit();
      };

      const { enqueueSnackbar } = useSnackbar();
      useEffect(()=>{
        if(open){
          setTimeout(()=>{
            enqueueSnackbar('Successfully reboot.');
            setOpen(false)
          },2000)
        }
      },[open]);

    return <>
    <DialogForm
      open={open} 
      setOpen={setOpen} 
      onClose={handleDialogFormOnClose}
      title="Device rebooting.." 
      subtitle="Please wait several minutes."
      backBropClose={false}
    >
        <Box sx={{
          pt:3,
          alignItems: "center",
          alignContent: "center",
          textAlign: "center"
        }}>
          <CircularProgress color="success" />

        </Box>
    </DialogForm>
    </>
};