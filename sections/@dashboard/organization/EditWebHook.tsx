import DialogFullScreen from "@/_global/Ncomponents/DialogFullScreen";
import Form from "@/_global/Ncomponents/form";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import * as Yup from 'yup';


export default function EditWebHook({open, setOpen}:any) {

    interface FormValuesProps {
        email: string;
        name: string;
        role: string;
      }
    const [fields, setFields] = useState<any>({
      device: {
        label: "Device",
        type: "select",
        placeholder: "Select device",
        option: [
          {value:"2",label:"device 2"},
          {value:"1",label:"device 1"},
        ],
      },
      event: {
        label: "Trigger event",
        type: "select",
        placeholder: "Select role",
        option: [
          {value:"2",label:"send data from device 2"},
          {value:"1",label:"send data from device 1"},
        ],
      },
      name: {
        label: "Name",
        type: "text",
        placeholder: "Type name",
      },
      url: {
        label: "Webhook URL",
        type: "text",
        placeholder: "Type webhook URL",
      },
      request_type: {
        label: "Request type",
        type: "radio",
        options: [
          {
            label:"GET",
            value:"get",
          },
          {
            label:"POST",
            value:"post",
          },
          {
            label:"PUT",
            value:"put",
          },
          {
            label:"DELETE",
            value:"delete",
          },
        ],
        // labelPlacement: "start", // "top" | "bottom" | "end" | "start"
        // disabled: true,
        // required: true,
        // size: "small", // medium, small
        // color: 'warning', // 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
        row: true,
        // hintText: "This is type hints",
      },
      content_type: {
        label: "Content type",
        type: "radio",
        options: [
          {
            label:"Web Form",
            value:"webform",
          },
          {
            label:"JSON",
            value:"json",
          },
          {
            label:"Plain text",
            value:"plaintext",
          },
        ],
        row: true,
        onchange: (e:React.ChangeEvent<HTMLInputElement>, value:any)=>{
          let webform = true;
          let json = true;
          let plaintext = true;
          let hintText = "";
          if(value == "webform") {
            webform = false;
            hintText = "Content-type is application/x-www-form-urlencoded";
          }
          if(value == "json") {
            json = false;
            hintText = "Content-type is application/json";
          }
          if(value == "plaintext") {
            plaintext = false;
            hintText = "Content-type is text/html";
          }
          setFields((prev:any) => ({
            ...prev, 
            content_type: {...fields.content_type, hintText: hintText },
            webform_content: {...fields.webform_content, hide: webform },
            json_content: {...fields.json_content, hide: json },
            plaintext_content: {...fields.plaintext_content, hide: plaintext },
          }));
        }
      },
      webform_content: {
        type: "dynamic",
        label: "Webform",
        hide: true,
        fields: {
          key: {
            label: "Key",
            type: "text",
            placeholder: "Type key",
          },
          value: {
            label: "Value",
            type: "select",
            placeholder: "Select value",
            option: [
              {value:"1",label:"device_name"},
              {value:"2",label:"device_id"},
              {value:"3",label:"device_pin"},
            ],
          },
        },
        data: {
          key: "",
          value: ""
        }
      },
      json_content: {
        hide: true,
        label: "JSON",
        type: "text",
        placeholder: "Type json",
        multiline: true,
        minRows: 10,
      },
      plaintext_content: {
        hide: true,
        label: "Plain text",
        type: "text",
        placeholder: "Type plain text",
        multiline: true,
        minRows: 10,
      },
      query_parameters: {
        type: "dynamic",
        label: "Query parameters",
        // size: "small",
        fields: {
          key: {
            label: "Key",
            type: "text",
            placeholder: "Type key",
          },
          value: {
            label: "Value",
            type: "select",
            placeholder: "Select value",
            option: [
              {value:"1",label:"device_name"},
              {value:"2",label:"device_id"},
              {value:"3",label:"device_pin"},
            ],
          },
        },
        data: {
          key: "",
          value: ""
        }
      },
      authorization_method: {
        label: "Authorization method",
        type: "radio",
        options: [
          {
            label:"Basic Auth",
            value:"basic_auth",
          },
          {
            label:"OAuth 2.0",
            value:"oauth",
          },
          {
            label:"None",
            value:"none",
          },
        ],
        row: true,
        onchange: (e:React.ChangeEvent<HTMLInputElement>, value:any)=>{
          let basic_auth = (value == "basic_auth") ? false : true;
          let oauth = (value == "oauth") ? false : true;
          setFields((prev:any) => ({
            ...prev,
            basic_auth_username: {...fields.basic_auth_username, hide: basic_auth },
            basic_auth_password: {...fields.basic_auth_password, hide: basic_auth },
            oauth_client_id: {...fields.oauth_client_id, hide: oauth },
            oauth_client_secret: {...fields.oauth_client_secret, hide: oauth },
            oauth_token_url: {...fields.oauth_token_url, hide: oauth },
          }));
        }
      },
      basic_auth_username: {
        hide: true,
        label: "Username",
        type: "text",
        placeholder: "Type username",
      },
      basic_auth_password: {
        hide: true,
        label: "Password",
        type: "text",
        placeholder: "Type password",
      },
      oauth_client_id: {
        hide: true,
        label: "Client ID",
        type: "text",
        placeholder: "Type Client ID",
      },
      oauth_client_secret: {
        hide: true,
        label: "Client secret",
        type: "text",
        placeholder: "Type client secret",
      },
      oauth_token_url: {
        hide: true,
        label: "Token Url",
        type: "text",
        placeholder: "Type token Url",
      },
      http_headers: {
        type: "dynamic",
        label: "Http headers",
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
        }
      },
    });

      const [rules] = useState<any>({
        name: Yup.string().required('name is required'),
        // query_parameters: Yup.array().min(1, 'query parameters is required'),
      });
      const [formData, setFormData] = useState<any>({
        device: "",
        event: "",
        name: "",
        url: "",
        request_type: "",
        content_type: "",
        webform_content: [
          {
            key: "",
            value: ""
          }
        ],
        json_content: `{
          "device_id": "{{device_id}}", 
          "device_name": "{{device_name}}"
        }`,
        plaintext_content: `"{{device_id}}" "{{device_name}}"`,
        query_parameters: [
          // {
          //   key: "",
          //   value: ""
          // }
        ],
        authorization_method: "",
        basic_auth_username: "",
        basic_auth_password: "",
        oauth_client_id: "",
        oauth_client_secret: "",
        oauth_token_url: "",
        http_headers: [
          // {
          //   key: "",
          //   value: ""
          // }
        ],
      });
      const onSubmit = async (data: any) => {
        try {
          // await changePassword(data.password, data.newPassword, data.confirmNewPassword);
          return {
            data: {
              message: 'Password successfully changed.',
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

      useEffect(()=>{
        setFormData((prev:any)=>({...prev,
          device: "1",
          event: "1",
          name: "test",
          url: "www.softteal.com",
          request_type: "post",
          content_type: "json",
          webform_content: [],
          json_content: `{
            "device_id": "{{device_id}}", 
            "device_name": "{{device_name}}"
          }`,
          plaintext_content: ``,
          query_parameters: [
            {
              key: "id",
              value: "2"
            }
          ],
          authorization_method: "oauth",
          basic_auth_username: "",
          basic_auth_password: "",
          oauth_client_id: "223",
          oauth_client_secret: "234dsf",
          oauth_token_url: "wwww",
          http_headers: [
            {
              key: "Authorization",
              value: "XXXX"
            }
          ],
        }))

        // for content
        let webform = true;
        let json = true;
        let plaintext = true;
        let hintText = "";
        if(formData.content_type == "webform") {
          webform = false;
          hintText = "Content-type is application/x-www-form-urlencoded";
        }
        if(formData.content_type == "json") {
          json = false;
          hintText = "Content-type is application/json";
        }
        if(formData.content_type == "plaintext") {
          plaintext = false;
          hintText = "Content-type is text/html";
        }
        setFields((prev:any) => ({
          ...prev, 
          content_type: {...fields.content_type, hintText: hintText },
          webform_content: {...fields.webform_content, hide: webform },
          json_content: {...fields.json_content, hide: json },
          plaintext_content: {...fields.plaintext_content, hide: plaintext },
        }));
       
        // for authorization
        let basic_auth = (formData.authorization_method == "basic_auth") ? false : true;
        let oauth = (formData.authorization_method == "oauth") ? false : true;
        setFields((prev:any) => ({
          ...prev,
          basic_auth_username: {...fields.basic_auth_username, hide: basic_auth },
          basic_auth_password: {...fields.basic_auth_password, hide: basic_auth },
          oauth_client_id: {...fields.oauth_client_id, hide: oauth },
          oauth_client_secret: {...fields.oauth_client_secret, hide: oauth },
          oauth_token_url: {...fields.oauth_token_url, hide: oauth },
        }));


      },[]);

    return <>
        <DialogFullScreen open={open} setOpen={setOpen} title="Edit webhook">
          <Box sx={{ px: { xs: 3, md: 50 } }}>
            <Form
              options={{
                column:false,
                submitBtn: true,
                submitBtnText: "Update",
                validateMode: "onChange",
                redirect: "/dashboard/profile",
                actionPosition: 'bottom',
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
            />
            </Box>
        </DialogFullScreen>
    </>
};