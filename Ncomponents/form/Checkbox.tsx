import { RHFCheckbox, RHFMultiCheckbox } from "@/_global/components/hook-form";

export default function Checkbox({prop, field}:any) {

    return (
        (field.options) ? (
            <RHFMultiCheckbox 
              name={prop}
              label={field.label}
              options={field.options}
              labelPlacement={field.labelPlacement}
              CheckboxProps={{
                color: field.color,
                disabled: field.disabled,
                size: field.size,
                required: field.required,
                icon: (field.icon) && field.icon.out,
                checkedIcon: (field.icon) && field.icon.in,
              }}
              row={field.row}
              hintText={field.hintText}
            />
        ) : (
            <RHFCheckbox
              name={prop}
              label={field.label}
              labelPlacement={field.labelPlacement}
              CheckboxProps={{
                color: field.color,
                disabled: field.disabled,
                size: field.size,
                required: field.required,
                icon: (field.icon) && field.icon.out,
                checkedIcon: (field.icon) && field.icon.in,
              }}
              hintText={field.hintText}
            />
        )
    )
}