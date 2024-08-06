import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import { Box, Button } from "@mui/material";
import { useRef, useState } from "react";
import * as Yup from 'yup';


export default function RenameDialog({open, setOpen}:any) {

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

    return <>
    <DialogForm
      open={open} 
      setOpen={setOpen} 
      onClose={handleDialogFormOnClose}
      title="Rename Device" 
      subtitle="Input new name up 60 characters here."
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
      <Form
        options={{
          column:false,
          // redirect: "/dashboard/device/2/",
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