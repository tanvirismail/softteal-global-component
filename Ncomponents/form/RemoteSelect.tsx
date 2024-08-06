import { RHFTextField } from "@/_global/components/hook-form"
import { Autocomplete, CircularProgress } from "@mui/material"
import { Fragment } from "react"
 
export default function RemoteSelect({prop, field, setValue}:any) {

    return (
        <Autocomplete
            onChange={(event: any, newValue: any) => {
                setValue(prop, newValue ? newValue.value : {})
                if(field.onChange) field.onChange(event,newValue);
            }}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            getOptionLabel={(option) => option.label}
            options={field.option}
            loading={field.loading}
            renderInput={(params) => (
                <RHFTextField
                    {...params}
                    name={prop}
                    label={field.label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {field.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                    hintText={field.hintText}
                    required={field.required}
                    disabled={field.disabled}
                    variant={field.variant}
                    size={field.size}
                    color={field.color}
                />
            )}
            onKeyUp={(event:any)=>{
                if(field.remote) field.remote(event.target.value)
            }}
        />
    )
}