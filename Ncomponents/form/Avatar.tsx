import { RHFUploadAvatar } from "@/_global/components/hook-form"
import { useCallback } from "react";

export default function Avatar({prop, field, setValue}:any) {

    return (
        <RHFUploadAvatar
            name={prop}
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
            maxSize={field.fileSize}
            disabled={field.disabled}
            required={field.required}
            accept={field.accept}
            hintText={field.hintText}
        />
    )
}