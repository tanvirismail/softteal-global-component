import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import Iconify from "@/_global/components/Iconify";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup';


export default function NewFramework({open, setOpen}:any) {

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
      connection_type: {
        label: "Connection type",
        type: "checkbox",
        options: [
          {
            label:"Ethernet",
            value:"a",
          },
          {
            label:"Wifi",
            value:"b",
          },
          {
            label:"GSM",
            value:"c",
          }
        ],
        row: true,
      },
      description: {
        label: "textarea",
        type: "text",
        placeholder: "Type textarea",
        multiline: true,
        minRows: 3,
      },
    });

      const [rules] = useState<any>({
        name: Yup.string().required('name is required'),
        // query_parameters: Yup.array().min(1, 'query parameters is required'),
      });
      const [formData, setFormData] = useState<any>({
        name: "",
        description: "",
        connection_type: [],
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
          title="New Framework" 
          subtitle="Create new device framework by filling in the form below"
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
                redirect: "/dashboard/framework/2/",
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