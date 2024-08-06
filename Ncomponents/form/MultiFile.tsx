import { RHFUploadMultiFile } from "@/_global/components/hook-form"
import { useCallback } from "react";


export default function MultiFile({prop, field, setValue, values}:any) {

    return (
        <RHFUploadMultiFile
            name={prop}
            label={field.label}
            showPreview={field.showPreview}
            onDrop={useCallback(
                (acceptedFiles: File[], fileRejections: any, event: any) => {
                    const images = values[prop] || [];
                    setValue(prop, [
                    ...images,
                    ...acceptedFiles.map((file) =>
                        Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        })
                    ),
                    ]);
                },
                [setValue, values[prop]]
            )}
            onRemove={(file: File | string) => {
                const filteredItems = values[prop] && values[prop]?.filter((_file:any) => _file !== file);
                setValue(prop, filteredItems);
            }}
            onRemoveAll={() => {
                setValue(prop, []);
            }}
            onUpload={field.onUpload}
            maxSize={field.fileSize}
            title={field.title}
            subtitle={field.subtitle}
            disabled={field.disabled}
            required={field.required}
            accept={field.accept}
            hintText={field.hintText}
            uploadButton={field.uploadButton}
            maxFiles={field.maxFiles}
            validator={(file: any) => {
                if(values[prop].length >= field.maxFiles){
                    return {
                    code: "too-many-files",
                    message: `Too many files`
                    };
                }
                return null;
            }}
        />
    )
}