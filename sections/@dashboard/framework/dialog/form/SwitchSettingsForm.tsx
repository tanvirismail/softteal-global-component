import { useState } from "react";

export default function SwitchSettingsForm(data:any) {
    const [fields, setFields] = useState<any>({
        title: {
          label: "Title",
          type: "text",
          placeholder: "Type title",
        },
        datastream: {
          label: "Datastream",
          type: "select",
          option: [
            {value:"in",label:"Datastream 1"},
            {value:"ft",label:"Datastream 2"},
          ],
        },
        offLable: {
          label: "Off Lable",
          type: "text",
          placeholder: "Type Off Lable",
        },
        onLable: {
          label: "On Lable",
          type: "text",
          placeholder: "Type On Lable",
        },
        offValue: {
          label: "Off Value",
          type: "text",
          placeholder: "Type Off Value",
        },
        onValue: {
          label: "On Value",
          type: "text",
          placeholder: "Type On Value",
        },
        color: {
          label: "color",
          type: "color",
          placeholder: "pick color",
          format: "hex", // hex, hex8, rgb, hsv, hsl
          adornmentPosition: "end", // start, end
        },
        showLable: {
          label: "Show Lable",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Show Lable",
          subtitle: "Show on/off lables",
          // color: 'warning', // 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
          // disabled: true,
          // size: "small", // medium, small
          // fullWidth: true,
          // hintText: "This is type hints",
        },
        hideTitle: {
          label: "Hide Title",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Hide Title",
          subtitle: "Hide widget title",
        },
    });
    const [rules] = useState<any>({
    // name: Yup.string().required('name is required'),
    });
    const [formData, setFormData] = useState<any>(data); 
    return {
        fields, setFields,
        rules,
        formData, setFormData
    }
}