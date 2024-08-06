import { Button, FormControl, FormHelperText, FormLabel, IconButton, Stack } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import Iconify from "@/_global/components/Iconify";
import { Controller } from 'react-hook-form';
import * as React from "react";
import InputField from "./InputField";

export default function DynamicInput({name, fieldsGroup, control, setValue, values, setFields, fields}:any) {

    const dynamicFields = useFieldArray({
        control,
        name: name,
    });
    const handleAdd = () => {
        dynamicFields.append(fieldsGroup.data);
    };
    const handleRemove = (index: number) => {
        dynamicFields.remove(index);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ fieldState: { error } }) => (
                <>
                    <FormControl
                        component="fieldset"
                        error={!!error}
                        sx={{width:'100%'}}
                    >
                        { fieldsGroup.label && <FormLabel sx={{mb:2}}>{fieldsGroup.label}</FormLabel> }
                        { dynamicFields.fields.map((item:any, index:any) => (
                            <Stack key={item.id} sx={{mb: 3}}>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                                    { Object.entries(fieldsGroup.fields).map(([prop, field]:any)=> {
                                        const inputName = `${name}[${index}].${prop}`;
                                        return (
                                            <InputField 
                                                key={name+prop} 
                                                prop={inputName} 
                                                field={field} 
                                                fields={fields} 
                                                setFields={setFields} 
                                                values={values} 
                                                setValue={setValue}
                                                control={control}
                                            />
                                        )
                                    })}
                                    <IconButton size={fieldsGroup.size||"large"} color="error" onClick={() => handleRemove(index)}>
                                        <Iconify icon={'eva:trash-2-outline'} />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        )) }
                        {!!error && (
                        <FormHelperText error sx={{ mx: 0, px: 2 }}>
                            {error?.message}
                        </FormHelperText>
                        )}
                        <Stack
                            spacing={2}
                            direction={{ xs: 'column-reverse', md: 'row' }}
                            alignItems={{ xs: 'flex-start', md: 'center' }}
                        >
                            <Button
                                size="small"
                                startIcon={<Iconify icon="eva:plus-fill" />}
                                onClick={()=>handleAdd()}
                                sx={{ flexShrink: 0 }}
                            >
                                Add
                            </Button>
                        </Stack> 
                    </FormControl>
                </>
            )}
        />
    )
}