// @mui
import { Button, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { PATH_DEVICE } from '@/routes';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '@/_global/components/Page';
import HeaderBreadcrumbs from '@/_global/components/HeaderBreadcrumbs';
// sections
import Form from '@/_global/Ncomponents/form';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { fData } from '@/_global/utils/formatNumber';

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  const [fields, setFields] = useState<any>({
    text: {
      label: "text",
      type: "text",
      placeholder: "Type text",
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "filled",  // standard, filled, outlined
      // autoComplete: "on", // off, on
      // multiline: true,
      // maxRows: 2,
      // prepend: (
      //   <IconButton size="medium">
      //     <Iconify icon={'eva:cloud-download-outline'}/>
      //   </IconButton>
      // ),
      // append: (
      //   <IconButton size="medium">
      //     <Iconify icon={'eva:cloud-download-outline'}/>
      //   </IconButton>
      // ),
      // size: "small" // medium, small
      // color: "warning" // 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
      // focused: true,
      hintText: "This is type hints",
      // fullWidth: true,
    },
    number: {
      label: "Number",
      type: "number",
      placeholder: "Type number",
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "standard",  // standard, filled, outlined
      // autoComplete: "off", // off, on
      // prepend: (
      //   <IconButton size="medium">
      //     <Iconify icon={'eva:cloud-download-outline'}/>
      //   </IconButton>
      // ),
      // append: (
      //   <IconButton size="medium">
      //     <Iconify icon={'eva:cloud-download-outline'}/>
      //   </IconButton>
      // ),
      // size: "small", // medium, small
      // color: "warning", // secondary, success, warning
      // focused: true,
      hintText: "This is type hints",
      // fullWidth: true,
    },
    password: {
      label: "Password",
      type: "password",
      placeholder: "Type password",
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "outlined",  // standard, filled, outlined
      // autoComplete: "on", // off, on
      // prepend: (
      //   <IconButton size="medium">
      //     <Iconify icon={'eva:cloud-download-outline'}/>
      //   </IconButton>
      // ),
      // size: "small", // medium, small
      // color: "warning", // secondary, success, warning
      // focused: true,
      // hintText: "This is type hints",
      // fullWidth: true,
      // showPassword: true,
    },
    select: {
      label: "Select",
      type: "select",
      placeholder: "Type select",
      option: [
        {value:"asdf",label:"hello"},
        {value:"dsf",label:"dsf"},
      ],
      onChange: (event:any) => {
        setFields((prev:any) => ({
          ...prev, 
          onchangeselect: {...fields.onchangeselect, option: [
              {value:"al",label:"Al"},
              {value:"dl",label:"dl"},
          ]}
        }));
      },
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "standard",  // standard, filled, outlined
      // autoComplete: "on", // off, on
      // prepend: (
      //   <IconButton size="medium">
      //     <Iconify icon={'eva:cloud-download-outline'}/>
      //   </IconButton>
      // ),
      // size: "small", // medium, small
      // color: "warning", // secondary, success, warning
      // focused: true,
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    onchangeselect: {
      label: "Onchange Select",
      type: "select",
      placeholder: "Type select",
      option: [],
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    multipleselect: {
      label: "multiple Select",
      type: "select",
      placeholder: "Type select",
      option: [
        {value:"a",label:"Al"},
        {value:"d",label:"dl"},
      ],
      multiple: true,
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    remoteselect: {
      label: "remote Select",
      type: "remote_select",
      placeholder: "Type select",
      option: [],
      loading: false,
      remote: (value:string) => {
        // loading
        setFields((prev:any) => ({
          ...prev, 
          remoteselect: {...fields.remoteselect, loading: true}
        }));
        // loading
        (async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
          setFields((prev:any) => ({
            ...prev, 
            remoteselect: {...fields.remoteselect, loading: false, option: [
              { id: 1, value:"a", label:"Al"},
              { id: 2, value:"d", label:"dl"},
            ]}
          }));
        })();
      },
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    date: {
      label: "Date",
      type: "date",
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "standard",  // standard, filled, outlined
      // autoComplete: "on", // off, on
      // size: "small" // medium, small
      // color: "warning" // secondary, success, warning
      // focused: true,
      // views: ['month', 'year'], // 'year', 'month', 'day'
      // format: 'YYYY-MM-DD', // https://day.js.org/docs/en/display/format
      actions: ['today','clear'],
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    datetime: {
      label: "Datetime",
      type: "datetime",
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "standard",  // standard, filled, outlined
      // autoComplete: "on", // off, on
      // size: "small" // medium, small
      // color: "warning" // secondary, success, warning
      // focused: true,
      // views: ['month', 'year'], // 'year', 'month', 'day'
      // format: 'YYYY-MM-DD', // https://day.js.org/docs/en/display/format
      actions: ['accept','today','clear'],
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    time: {
      label: "Time",
      type: "time",
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "standard",  // standard, filled, outlined
      // autoComplete: "on", // off, on
      // size: "small" // medium, small
      // color: "warning" // secondary, success, warning
      // focused: true,
      // views: ['hours', 'minutes', 'seconds'], 'hours', 'minutes', 'seconds'
      // format: 'hh:mm:ss aa', // https://day.js.org/docs/en/display/format
      actions: ['today','clear'],
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    editor: {
      label: "editor",
      type: "editor",
      placeholder: "Type editor",
      // simple: true,
      // readonly: true,
      // variant: "filled",  // standard, filled, outlined
      minHeight: 192,
      maxHeight: 192,
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    textarea: {
      label: "textarea",
      type: "text",
      placeholder: "Type textarea",
      multiline: true,
      minRows: 10,
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "filled",  // standard, filled, outlined
      // autoComplete: "on", // off, on
      // maxRows: 10,
      // size: "small" // medium, small
      // color: "warning" // secondary, success, warning
      // focused: true,
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    switch: {
      label: "Switch",
      type: "switch",
      placeholder: "Type switch",
      labelPlacement: "start", // "top" | "bottom" | "end" | "start"
      title: "Email Verified",
      subtitle: "Disabling this will automatically send the user a verification email",
      // color: 'warning', // 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
      // disabled: true,
      // size: "small", // medium, small
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    checkbox: {
      label: "checkbox",
      type: "checkbox",
      // labelPlacement: "start", // "top" | "bottom" | "end" | "start"
      // disabled: true,
      // required: true,
      // size: "small", // medium, small
      // color: 'warning', // 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
      // icon: {
      //   out: <FavoriteBorder />,
      //   in: <Favorite />
      // },
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    checkboxMultiple: {
      label: "Multiple checkbox",
      type: "checkbox",
      options: [
        {
          label:"A",
          value:"a",
          // disabled: true,
          // color: 'error',
          // icon: {
          //   out: <FavoriteBorder />,
          //   in: <Favorite />
          // }
        },
        {
          label:"B",
          value:"b",
        }
      ],
      // labelPlacement: "start", // "top" | "bottom" | "end" | "start"
      // disabled: true,
      // required: true,
      // size: "small", // medium, small
      // color: 'warning', // 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
      // icon: {
      //   out: <FavoriteBorder />,
      //   in: <Favorite />
      // },
      // row: true,
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    radio: {
      label: "radio",
      type: "radio",
      options: [
        {
          label:"A",
          value:"a",
          // disabled: true,
          color: 'error',
        },
        {
          label:"B",
          value:"b",
        },
      ],
      // labelPlacement: "start", // "top" | "bottom" | "end" | "start"
      // disabled: true,
      // required: true,
      // size: "small", // medium, small
      // color: 'warning', // 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
      // row: true,
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    file: {
      label: "File upload",
      type: "file",
      fileSize: 3145728,
      title: "Drop or Select file",
      subtitle: (
        <>
        Drop files here or click&nbsp;
        <Typography
          variant="body2"
          component="span"
          sx={{ color: 'primary.main', textDecoration: 'underline' }}
        >
          browse
        </Typography>
        &nbsp;thorough your machine
        </>
      ),
      // disabled: true,
      // required: true,
      // accept: { 
      //   // 'image/*': ["*"],
      //   'image/png': ["png"],
      // }
      // hintText: (<Typography variant="caption">
      //   Allowed *.jpeg, *.jpg, *.png, *.gif <br /> Max size of {fData(3145728)}
      // fullWidth: true,
      // </Typography>),
    },
    multipleFile: {
      label: "Multiple file upload",
      type: "multipleFile",
      fileSize: 3145728,
      title: "Drop or Select file",
      subtitle: (
        <>
        Drop files here or click&nbsp;
        <Typography
          variant="body2"
          component="span"
          sx={{ color: 'primary.main', textDecoration: 'underline' }}
        >
          browse
        </Typography>
        &nbsp;thorough your machine
        </>
      ),
      showPreview: true,
      // disabled: true,
      // required: true,
      // accept: { 
      //   // 'image/*': ["*"],
      //   'image/png': ["png"],
      // }
      // hintText: (<Typography variant="caption">
      //   Allowed *.jpeg, *.jpg, *.png, *.gif <br /> Max size of {fData(3145728)}
      // </Typography>),
      // uploadButton: true,
      // onUpload: () => console.log('ON UPLOAD'),
      // fullWidth: true,
      // maxFiles: 2,
    },
    slider: {
      label: "slider",
      type: "slider",
      valueLabelDisplay: 'auto', // on, off, auto
      prepend: "input", // "input", <VolumeDown />
      append: "input", // "input", <VolumeUp />
      // disabled: true,
      // size: "medium", // medium, small
      // marks: [{value:4, label:'4°C'},{value:10, label:'10°C',}], // true, [{value:4, label:'4°C'},{value:10, label:'10°C',}]
      // min: 1,
      // max: 20,
      // step: 2,
      // valueLabelFormat: (value: number) => {
      //   return `${value}°C`;
      // },
      // disableSwap: true,
      // color: 'warning', // 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
      // variant: "airbnb", // ios, pretto, airbnb
      // height: 300,
      // orientation: "vertical", // vertical
      // track: false, // false, normal, inverted
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    color: {
      label: "color",
      type: "color",
      placeholder: "Type textarea",
      format: "hex", // hex, hex8, rgb, hsv, hsl
      // isAlphaHidden: true,
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "filled",  // standard, filled, outlined
      // autoComplete: "on", // off, on
      // size: "small" // medium, small
      // color: "warning", // secondary, success, warning
      // focused: true,
      adornmentPosition: "end", // start, end
      // fullWidth: true,
      // hintText: "This is type hints",
    },
    avater: {
      label: "Avater",
      type: "avater",
      // fileSize: 3145728,
      // disabled: true,
      // required: true,
      // accept: { 
      //   // 'image/*': ["*"],
      //   'image/png': ["png"],
      // }
      // hintText: (<Typography variant="caption" >
      //   Allowed *.jpeg, *.jpg, *.png, *.gif <br /> Max size of {fData(3145728)}
      // fullWidth: true,
      // </Typography>),
    },
    dynamicInput: {
      type: "dynamic",
      label: "Dynamic Input",
      fields: {
        key: {
          label: "Key",
          type: "text",
          placeholder: "Type key",
        },
        value: {
          label: "Value",
          type: "text",
          placeholder: "Type value",
        },
      },
      data: {
        key: "",
        value: ""
      },
      // fullWidth: true,
    },
    onchange_radio: {
      label: "onchange radio",
      type: "radio",
      options: [
        {
          label:"Show",
          value:"show",
        },
        {
          label:"Hide",
          value:"hide",
        },
      ],
      row: true,
      onchange: (e:React.ChangeEvent<HTMLInputElement>, value:any)=>{
        let trigger = (value == "show") ? true : false;
        setFields((prev:any) => ({
          ...prev,
          showhide_content: {...fields.showhide_content, show: trigger },
        }));
      },
      // fullWidth: true,
    },
    showhide_content: {
      show: false,
      label: "showhide content",
      type: "text",
      placeholder: "Type showhide_content",
      // fullWidth: true,
    },
    icon_picker: {
      label: "icon picker",
      type: "icon_picker",
      placeholder: "Pick your icon",
      // required: true,
      // disabled: true,
      // readonly: true,
      // shrink: true,
      // variant: "filled",  // standard, filled, outlined
      // autoComplete: "on", // off, on
      // multiline: true,
      // maxRows: 2,
      // prepend: (
      //   <IconButton size="medium">
      //     <Iconify icon={'eva:cloud-download-outline'}/>
      //   </IconButton>
      // ),
      // append: (
      //   <IconButton size="medium">
      //     <Iconify icon={'eva:cloud-download-outline'}/>
      //   </IconButton>
      // ),
      // size: "small" // medium, small
      // color: "warning" // 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
      // focused: true,
      // hintText: "This is type hints",
      // fullWidth: true,
    },
  });
  const [rules] = useState<any>({
    text: Yup.string().required('Text is required'),
    // number: Yup.number().required('Number is required'),
    // password: Yup.string().required('password is required'),
    // select: Yup.string().required('select is required'),
    // onchangeselect: Yup.string().required('onchangeselect is required'),
    // multipleselect: Yup.array().min(1, 'multiple select is required'),
    // remoteselect: Yup.string().required('remoteselect is required'),
    // date: Yup.string().nullable().required('Date is required'),
    // datetime: Yup.string().nullable().required('Datetime is required'),
    // time: Yup.string().nullable().required('Time is required'),
    // editor: Yup.string().required('Editor is required'),
    // textarea: Yup.string().required('textarea is required'),
    // switch: Yup.bool().oneOf([true], 'Field must be checked'),
    // checkbox: Yup.bool().oneOf([true], 'Field must be checked'),
    // checkboxMultiple: Yup.array().min(1, 'checkbox is required'),
    // radio: Yup.string().required('radio is required'),
    // slider: Yup.number().min(10,'slider at least 10 value'),
    // file: Yup.mixed().test('required', 'file is required', (value) => value !== ''),
    // avater: Yup.mixed().test('required', 'avater is required', (value) => value !== ''),
    // multipleFile: Yup.array().min(1, 'multiple file is required'),
    // color: Yup.string().required('color is required'),
    // dynamicInput: Yup.array().min(1, 'query parameters is required'),
  });
  const [formData, setFormData] = useState<any>({
    text: "",
    number: 0,
    password: "",
    select: "",
    onchangeselect: "",
    multipleselect: [],
    remoteselect: "", // { id: 2, value:"d", label:"dl"}
    date: null, // null, dayjs('2022-04-17')
    datetime: null, // null, dayjs('2022-04-17')
    time: null,
    editor: "",
    textarea: "",
    switch: Boolean(0),
    checkbox:  false,
    checkboxMultiple: [],
    radio: "",
    slider: [5,10], // 1, [5,10] for multiple
    file: "",
    avater: "",
    multipleFile: [
      // "https://minimal-assets-api-dev.vercel.app/global-assets/assets/images/avatars/avatar_2.jpg",
      // "https://minimal-assets-api-dev.vercel.app/global-assets/assets/images/avatars/avatar_3.jpg"
    ],
    color: "",
    dynamicInput: [
      {
        key: "",
        value: ""
      }
    ],
    onchange_radio: "",
    showhide_content: "",
    icon_picker: "",
  });

  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);

    // for success
    return {
      data: {
        message: 'Create success!',
      },
      status: 200
    };

    // for error
    // return {
    //   data: {
    //     errors: {
    //       text: {
    //         message: "Something wrongs!"
    //       }
    //     }
    //   },
    //   status: 422
    // };
  };
  const manualSubmitForm = () => {
    formRef.current && formRef.current.submit();
  };
  const formRef = useRef<any>(null);

  return (
    <Page title="Form builder">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Form builder"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components' },
            { name: 'Form' },
          ]}
        />
        <Button onClick={()=>manualSubmitForm()} variant="contained">
          Submit Form from outside
        </Button>
                
        <Form
          options={{
            column:true,
            submitBtn: true,
            submitBtnText: "Submit",
            resetBtn: true,
            validateMode: "onChange",  // onSubmit, onChange, onBlur, onTouched, all
            // redirect: "/dashboard/device",
            actionPosition: 'bottom', // 'bottom'
            actionContent: 'flex-end',// flex-end flex-start space-between center
            clearBtn: false,
            cancelBtn: true,
            cancelAction: "/dashboard/device",
            // cardSx: {
            //     boxShadow: 'none'
            // },
            // cardBodySx: {
            //   width:400,
            // }
          }}
          fields={fields}
          setFields={setFields}
          rules={rules}
          formData={formData}
          onSubmit={onSubmit}
          // handleReset={handleReset}
          ref={formRef}
        />
      </Container>
    </Page>
  );
}
