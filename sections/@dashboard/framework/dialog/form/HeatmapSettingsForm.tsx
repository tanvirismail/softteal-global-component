import { useState } from "react";

export default function HeatmapSettingsForm(data:any) {
    const [fields, setFields] = useState<any>({
        title: {
          label: "Title",
          type: "text",
          placeholder: "Type title",
        },
        subheader: {
          label: "Subheader",
          type: "text",
          placeholder: "Type subheader",
        },
        datastream: {
          label: "Datastream",
          type: "dynamic",
          fields: {
            name: {
              label: "Name",
              type: "text",
            },
            datastreamID: {
              label: "Datastream",
              type: "select",
              option: [
                {value:"1",label:"Datastream 1"},
                {value:"2",label:"Datastream 2"},
                {value:"3",label:"Datastream 3"},
                {value:"4",label:"Datastream 4"},
              ],
            },
            color: {
              label: "color",
              type: "color",
              placeholder: "pick color",
              format: "hex", // hex, hex8, rgb, hsv, hsl
              adornmentPosition: "end", // start, end
            },
          },
          data: {
            name: "",
            datastreamID: "",
            color: "",
          },
        },
        inverse: {
          label: "Inverse",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Inverse",
          subtitle: "Hide/Show inverse",
        },
        dataLabels: {
          label: "Data Labels",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Data Labels",
          subtitle: "Hide/Show data labels",
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