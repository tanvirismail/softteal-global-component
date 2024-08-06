import { RHFTextField } from "@/_global/components/hook-form"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

export default function Password({prop, field, setFields, fields}:any) {

    return (
        <RHFTextField
            type={ field.showPassword ? 'text' : 'password' }
            name={prop}
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
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={(event:any) => {
                                setFields((prev:any)=>({
                                    ...prev,
                                    [prop]: { ...fields[prop], showPassword: !field.showPassword}
                                }))
                            }}
                            onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                            event.preventDefault();
                            }}
                            edge="end"
                        >
                            {field.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
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
        />
    )
}