import { RHFRadioGroup } from "@/_global/components/hook-form";

export default function Radio({prop, field, setValue}:any) {

    return (
      <RHFRadioGroup 
        name={prop}
        label={field.label}
        options={field.options}
        row={field.row}
        labelPlacement={field.labelPlacement}
        RadioProps={{
          color: field.color,
          disabled: field.disabled,
          size: field.size,
          required: field.required,
          icon: (field.icon) && field.icon.out,
          checkedIcon: (field.icon) && field.icon.in,
        }}
        hintText={field.hintText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>, value)=>{
          setValue(prop, (event.target as HTMLInputElement).value)
          field.onchange && field.onchange(event, value)
        }}
      />
    )
}