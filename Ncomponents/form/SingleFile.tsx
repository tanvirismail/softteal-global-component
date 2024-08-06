import { RHFUploadSingleFile } from "@/_global/components/hook-form"
import { useCallback } from "react";


export default function SingleFile({prop, field, setValue}:any) {

    return (
        <RHFUploadSingleFile
            name={prop}
            label={field.label}
            onDrop={useCallback(
                (acceptedFiles: File[]) => {
                    const file = acceptedFiles[0];
                    if (file) {
                    setValue(
                        prop,
                        Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        })
                    );
                    }
                },
                [setValue]
            )}
            onRemove={(file: File | string) => {
                setValue(prop, "");
            }}
            maxSize={field.fileSize}
            title={field.title}
            subtitle={field.subtitle}
            disabled={field.disabled}
            required={field.required}
            accept={field.accept}
            hintText={field.hintText}
        />
    )
}