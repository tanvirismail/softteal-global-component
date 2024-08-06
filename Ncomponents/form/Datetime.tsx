import RHFDatetime from "@/_global/components/hook-form/RHFDatetime"
import { renderTimeViewClock } from '@mui/x-date-pickers';

export default function Datetime({prop, field, values}:any) {

    return (
        <RHFDatetime
            type={field.type}
            name={prop}
            label={field.label}
            format={field.format}
            views={field.views}
            value={ values[prop] } 
            disabled={field.disabled}
            readOnly={field.readonly}
            slotProps={{ 
                textField: { 
                    required: field.required,
                    disabled: field.disabled,
                    InputLabelProps: {
                        shrink: field.shrink,
                    },
                    variant: field.variant,
                    autoComplete: field.autoComplete,
                    size: field.size,
                    color: field.color,
                    focused: field.focused,
                },
                actionBar: { actions: field.actions },
                // toolbar: { hidden: false },
                tabs: { hidden: false },
            }}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
            }}
            hintText={field.hintText}
        />
    )
}