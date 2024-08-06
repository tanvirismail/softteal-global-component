import { useState } from "react";

export default function ChartSettingsForm(data:any) {
    const [fields, setFields] = useState<any>({
        title: {
          label: "Title",
          type: "text",
          placeholder: "Type title",
        },
        datastream: {
          label: "Datastream",
          type: "dynamic",
          fields: {
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
            name: {
              label: "Name",
              type: "text",
            },
            type: {
              label: "Type",
              type: "select",
              option: [
                {value:"column",label:"column"},
                {value:"area",label:"area"},
                {value:"line",label:"line"},
              ],
            },
            fill: {
              label: "Fill",
              type: "select",
              option: [
                {value:"solid",label:"solid"},
                {value:"gradient",label:"gradient"},
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
            datastreamID: "",
            name: "",
            type: "",
            fill: "",
            color: "",
          },
        },

        toolbar: {
          label: "Toolbar",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Toolbar",
          subtitle: "Hide/Show toolbar",
        },
        legend: {
          label: "Legend",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Legend",
          subtitle: "Hide/Show legend",
        },
        dataLabels: {
          label: "Data Labels",
          type: "switch",
          labelPlacement: "start", // "top" | "bottom" | "end" | "start"
          title: "Data Labels",
          subtitle: "Hide/Show data labels",
        },
        stroke_curve: {
          label: "stroke curve",
          type: "select",
          option: [
            {value:"stepline",label:"stepline"},
            {value:"straight",label:"straight"},
            {value:"smooth",label:"smooth"},
          ],
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