import { RHFSelect } from "@/_global/components/hook-form"
import { InputAdornment, MenuItem } from "@mui/material"

export default function Select({prop, field, setValue, ...other}:any) {

    return (
        <RHFSelect
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
            }}
            InputLabelProps={{
            shrink: field.shrink,
            }}
            variant={field.variant}
            autoComplete={field.autoComplete}
            size={field.size}
            color={field.color}
            focused={field.focused}
            onChange={( event: any) => {
                setValue(event.target.value)
                if(field.onChange) field.onChange(event)
            }}
            SelectProps={{
            multiple: field.multiple,
            // MenuProps: {
            //   sx: { '& .MuiPaper-root': { maxHeight: 260 } },
            // },
            }}
            hintText={field.hintText}
            {...other}
        >
            { field.option.map((value:any) => (
            <MenuItem 
                key={value.value} 
                value={value.value} 
                sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                textTransform: 'capitalize',
                }}
            >
                {value.label}
            </MenuItem>
            ))}
        </RHFSelect>
    )
}