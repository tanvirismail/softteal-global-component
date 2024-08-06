import { RHFSwitch } from "@/_global/components/hook-form";
import { Typography } from "@mui/material";

export default function Switch({prop, field}:any) {

    return (
        <RHFSwitch
            name={prop}
            labelPlacement={field.labelPlacement}
            label={
                <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        {field.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {field.subtitle}
                    </Typography>
                </>
            }
            sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            SwitchProps={{
                color: field.color,
                disabled: field.disabled,
                size: field.size,
            }}
            hintText={field.hintText}
        />
    )
}