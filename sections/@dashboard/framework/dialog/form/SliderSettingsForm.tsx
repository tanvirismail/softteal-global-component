import { useState } from "react";

export default function SliderSettingsForm(data:any) {
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
        minValue: {
          label: "Min Value",
          type: "number",
          placeholder: "Type Min Value",
        },
        maxValue: {
          label: "Max Value",
          type: "number",
          placeholder: "Type Max Value",
        },
        step: {
          label: "Handle step",
          type: "number",
          placeholder: "Type handle step",
        },
        showValue: {
          label: "Show Value",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Show Value",
          subtitle: "Show Value",
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