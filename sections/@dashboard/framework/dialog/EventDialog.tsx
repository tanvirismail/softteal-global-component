import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import DialogForm from "@/_global/Ncomponents/DialogForm";
import Form from "@/_global/Ncomponents/form";
import { Box, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import * as Yup from 'yup';


export default function EventDialog({open, setOpen}:any) {

    interface FormValuesProps {
        name: string;
      }

    const [fields, setFields] = useState<any>({
        name: {
          label: "Name",
          type: "text",
          placeholder: "Type name",
        },
        code: {
          label: "Code",
          type: "text",
          placeholder: "Type code",
        },


        // type: {
        //   label: "Select Type",
        //   type: "select",
        //   option: [
        //     {value:"text",label:"text"},
        //     {value:"number",label:"number"},
        //     {value:"unit",label:"unit"},
        //     {value:"time_range",label:"time range"},
        //     {value:"contact",label:"contact"},
        //     {value:"time",label:"time"},
        //     {value:"cost",label:"cost"},
        //     // {value:"coordinates",label:"coordinates"},
        //     // {value:"switch",label:"switch"},
        //     // {value:"reference",label:"reference"},
        //     // {value:"list",label:"list"},
        //     // {value:"table",label:"table"},
        //     {value:"IMEI",label:"IMEI"},
        //     {value:"ICCID",label:"ICCID"},
        //     {value:"timezone",label:"timezone"},
        //     {value:"location",label:"location"},
        //   ],
        //   onChange: (event:any) => {
        //     const value = event.target.value;

        //     let list:any = {
    
        //       text: false,
        //       number: false,
        //       unit: false,
        //       time_range: false,
        //       contact: false,
        //       time: false,
        //       cost: false,
        //       IMEI: false,
        //       ICCID: false,
        //       timezone: false,
        //       location: false,
             
        //     }
            
        //     if( value == 'text' ) list.text = true;
        //     else if( value == 'number' ) list.number = true;
        //     else if( value == 'unit' ) list.unit = true;
        //     else if( value == 'time_range' ) list.time_range = true;
        //     else if( value == 'contact' ) list.contact = true;
        //     else if( value == 'time' ) list.time = true;
        //     else if( value == 'cost' ) list.cost = true;
        //     else if( value == 'IMEI' ) list.IMEI = true;
        //     else if( value == 'ICCID' ) list.ICCID = true;
        //     else if( value == 'timezone' ) list.timezone = true;
        //     else if( value == 'location' ) list.location = true;
        //     else {
             
        //       list.text = false;
        //       list.number = false;
        //       list.unit = false;
        //       list.time_range = false;
        //       list.contact = false;
        //       list.time = false;
        //       list.cost = false;
        //       list.IMEI = false;
        //       list.ICCID = false;
        //       list.timezone = false;
        //       list.location = false;
        //     }

        //     setFields((prev:any) => ({
        //       ...prev,
        //       default_value: {...fields.default_value, show: (list.text || list.number || list.unit || list.contact || list.IMEI || list.ICCID ) },
        //       time_value: {...fields.time_value, show: list.time },
        //       min: {...fields.min, show: (list.number || list.unit || list.cost) },
        //       max: {...fields.max, show: (list.number || list.unit || list.cost) },
        //       step: {...fields.step, show: (list.number || list.unit) },
        //       unit: {...fields.unit, show: (list.unit || list.cost) },
        //       from: {...fields.from, show: list.time_range },
        //       to: {...fields.to, show: list.time_range },
        //       currency: {...fields.currency, show: list.cost },
        //       price: {...fields.price, show: list.cost },
        //       per_quantity: {...fields.per_quantity, show: list.cost },
        //       timezone: {...fields.timezone, show: list.timezone },
        //       location: {...fields.location, show: list.location },
        //     }));

        //   },
        // },
        // default_value: {
        //   show: false,
        //   label: "Default Value",
        //   type: "text",
        //   placeholder: "Type default value",
        // },
        // time_value: {
        //   show: false,
        //   label: "Value",
        //   type: "time",
        //   actions: ['today','clear'],
        // },
        // currency: {
        //   show: false,
        //   label: "Currency",
        //   type: "select",
        //   option: [
        //     {value:"tk",label:"Taka"},
        //     {value:"dollar",label:"Dollar"},
        //   ],
        // },
        // price: {
        //   show: false,
        //   label: "Price",
        //   type: "number",
        //   placeholder: "Type price",
        // },
        // per_quantity: {
        //   show: false,
        //   label: "Per quantity",
        //   type: "number",
        //   placeholder: "Type per quantity",
        // },
        // unit: {
        //   show: false,
        //   label: "Units",
        //   type: "select",
        //   option: [
        //     {value:"in",label:"inch"},
        //     {value:"ft",label:"feet"},
        //   ],
        // },
        // min: {
        //   show: false,
        //   label: "Min value",
        //   type: "number",
        //   placeholder: "Type min value",
        // },
        // max: {
        //   show: false,
        //   label: "Max value",
        //   type: "number",
        //   placeholder: "Type max value",
        // },
        // step: {
        //   show: false,
        //   label: "Step",
        //   type: "number",
        //   placeholder: "Type step",
        // },
        // from: {
        //   show: false,
        //   label: "From",
        //   type: "time",
        //   actions: ['today','clear'],
        // },
        // to: {
        //   show: false,
        //   label: "To",
        //   type: "time",
        //   actions: ['today','clear'],
        // },
        // timezone: {
        //   show: false,
        //   label: "Timezone",
        //   type: "select",
        //   option: [
        //     {value:"in",label:"Dhaka"},
        //     {value:"ft",label:"New york"},
        //   ],
        // },
        // location: {
        //   show: false,
        //   label: "Location",
        //   type: "text",
        //   placeholder: "Type location",
        // },

        // description: {
        //   label: "Short description",
        //   type: "text",
        //   placeholder: "Type short description",
        // },
        // editable: {
        //   label: "Editable",
        //   type: "switch",
        //   labelPlacement: "start", // "top" | "bottom" | "end" | "start"
        //   title: "Editable",
        //   subtitle: "Editable by end-users",
        // },
      });
      const [rules] = useState<any>({
        // name: Yup.string().required('name is required'),
      });
      const [formData, setFormData] = useState<any>({
        name: "",
        type: "",
        default_value: "",
        time_value: "",
        currency: "",
        price: "",
        per_quantity: "",
        unit: "",
        min: "",
        max: "",
        step: "",
        from: "",
        to: "",
        timezone: "",
        location: "",
        description: "",
        editable: Boolean(0),
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
        <DialogFullScreen open={open} setOpen={setOpen} title="New Event">
          <Box sx={{ 
            px: { xs: 3, md: 50 },
          }}>

            {/* <Typography
              // gutterBottom
              // variant="caption"
              component="div"
              sx={{
                color: 'text.disabled',
                m: 3
              }}
            >
             
            </Typography> */}

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