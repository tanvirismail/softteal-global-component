import { useState } from "react";

export default function LEDSettingsForm(data:any) {
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
        color: {
          label: "color",
          type: "color",
          placeholder: "pick color",
          format: "hex", // hex, hex8, rgb, hsv, hsl
          adornmentPosition: "end", // start, end
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