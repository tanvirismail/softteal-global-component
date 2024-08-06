import { RHFEditor } from "@/_global/components/hook-form";

export default function Editor({prop, field, setValue}:any) {

    return (
        <RHFEditor
            name={prop}
            simple={field.simple}
            placeholder={field.placeholder}
            readOnly={field.readonly}
            variant={field.variant}
            minHeight={field.minHeight}
            maxHeight={field.maxHeight}
            handleRawValue= {(value:string): void => {
                setValue( prop, value );
            }}
            hintText={field.hintText}
        />
    )
}