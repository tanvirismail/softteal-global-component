import { RHFTextField } from "@/_global/components/hook-form"
import { InputAdornment } from "@mui/material";

export default function NumberField({prop, field, ...other}:any) {

    return (
        <RHFTextField
            name={prop}
            type="number"
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            InputProps={{
                readOnly: field.readonly,
                startAdornment: (field.prepend) ? (
                    <InputAdornment position="start">
                        {field.prepend}
                    </InputAdornment>
                ) : "",
                endAdornment: (field.append) ? (
                    <InputAdornment position="end">
                        {field.append}
                    </InputAdornment>
                ) : "",
            }}
            InputLabelProps={{
                shrink: field.shrink,
            }}
            variant={field.variant}
            autoComplete={field.autoComplete}
            size={field.size}
            color={field.color}
            focused={field.focused}
            hintText={field.hintText}
            {...other}
        />
    )
}