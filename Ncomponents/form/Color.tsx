import RHFColorField from "@/_global/components/hook-form/RHFColorField";

export default function Color({prop, field}:any) {

    return (
        <RHFColorField 
            name={prop} 
            label={field.label}
            placeholder={field.placeholder}
            format={field.format}
            isAlphaHidden={field.isAlphaHidden}
            size={field.size}
            required={field.required}
            disabled={field.disabled}
            InputProps={{
                readOnly: field.readonly,
            }}
            InputLabelProps={{
                shrink: field.shrink,
            }}
            variant={field.variant}
            autoComplete={field.autoComplete}
            color={field.color}
            focused={field.focused}
            adornmentPosition={field.adornmentPosition}
            hintText={field.hintText}
        />
    )
}