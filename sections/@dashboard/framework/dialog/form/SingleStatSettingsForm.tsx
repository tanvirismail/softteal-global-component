import { useState } from "react";

export default function SingleStatSettingsForm(data:any) {
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
        icon: {
          label: "Icon",
          type: "icon_picker",
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