import { useState } from "react";

export default function SelectSettingsForm(data:any) {
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
        option: {
          type: "dynamic",
          label: "Select options",
          fields: {
            value: {
              label: "value",
              type: "text",
              placeholder: "Type value",
            },
            label: {
              label: "label",
              type: "text",
              placeholder: "Type label",
            },
          },
          data: {
            value: "",
            label: "",
          },
          // fullWidth: true,
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