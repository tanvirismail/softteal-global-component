import * as React from "react";
import * as Yup from 'yup';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { 
  Box, 
  Card, 
  Grid, 
  Stack, 
  Button 
} from '@mui/material';
// components
import {
  FormProvider,
} from '@/_global/components/hook-form';
import InputField from "./InputField";
import DynamicInput from "./DynamicInput";

// ----------------------------------------------------------------------

type Props = {
  options?: any;
  fields: any;
  setFields: any;
  rules?: any;
  formData: any;
  onSubmit?: any;
  handleReset?: any;
};

const defaultOptions = {
    column:true,
    submitBtn: false,
    submitBtnText: "Submit",
    resetBtn: false,
    validateMode: "onChange",  // onSubmit, onChange, onBlur, onTouched, all
    redirect: "",
    actionPosition: false, // 'bottom' top, false
    actionContent: 'flex-end', // flex-end flex-start space-between center
    clearBtn: false,
    cancelBtn: false,
    cancelAction: null,
    cardSx: {},
    cardBodySx: {},
}

export default forwardRef(function Form({ 
  options={}, 
  fields, 
  setFields, 
  rules, 
  formData, 
  onSubmit,
  handleReset,
}: Props, ref: any) {
  const formOptions = {...defaultOptions, ...options};
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const Schema = Yup.object().shape(rules);
  const defaultValues = useMemo(
    () => (formData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData]
  );
  const methods = useForm<any>({
    mode: formOptions.validateMode, // onSubmit, onChange, onBlur, onTouched, all
    resolver: yupResolver(Schema),
    defaultValues,
  });
  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const values = watch();
  const setDefaultValue = ()=>{
    Object.entries(defaultValues).map(([key, value])=>setValue(key, value))
  }
  useEffect(() => {
    setDefaultValue()
  }, [defaultValues])
  const formSubmit = async (data: any) => {
    try {
      const response = await onSubmit(data);
      if(response){
        if(response.status == 200){
          reset();
          enqueueSnackbar( response.data.message );
          if(formOptions.redirect) push( formOptions.redirect );
        }
        else {
          const errors = response.data.errors;
          if(errors){
            Object.entries(errors).map(([key, error]:any)=>{
              setError(key, {
                type: "server",
                message: error.message,
              });
            });
          } else {
            reset();
            enqueueSnackbar( 'Something went wrong!', { variant: 'error' })
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const formCancel = ()=>{
    formOptions.cancelAction && (
      (typeof formOptions.cancelAction == 'string') ?  push( formOptions.cancelAction ) : formOptions.cancelAction()
    )
  }
  const formReset = ()=>{
    handleReset && handleReset();
    reset();
  }
  const actionContainer = () => {
    return (
      <Stack direction='row' gap={2} alignItems="flex-end" justifyContent={formOptions.actionContent} sx={{ 
        ...( (formOptions.actionPosition == 'top') && { mb: 3 } ),
        ...( (formOptions.actionPosition == 'bottom') && { mt: 3 } )
      }}>
        { formOptions.cancelBtn && 
          <Button variant="outlined" color='secondary' onClick={()=>formCancel()}>Cancel</Button>
        }
        { formOptions.clearBtn && 
          <Button variant="outlined" color='info' onClick={()=>setDefaultValue()}>Clear</Button>
        }
        { formOptions.resetBtn && 
          <Button variant="outlined" color='error' onClick={()=>formReset()}>Reset</Button>
        }
        { formOptions.submitBtn && 
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {formOptions.submitBtnText}
          </LoadingButton>
        }
      </Stack>
    )
  }

  // outside access function
  useImperativeHandle(ref, () => ({
    reset() {
      formReset();
    },
    submit() {
      handleSubmit(formSubmit)();
    }
  }));
  // outside access function


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, ...formOptions.cardSx }}>
            <Stack sx={{ ...formOptions.cardBodySx }}>
            { (formOptions.actionPosition == 'top') &&  actionContainer() }
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: `repeat( ${ (formOptions.column) ? 2 : 1 }, 1fr)` },
              }}
            >
            {Object.entries(fields).map(([prop, field]:any) => (
              (field.show !== false) && (
                (field.type=="dynamic")
                ? <Box key={prop} sx={(field.fullWidth) ? { 
                  gridColumn: 'span 2'
                } : {}}><DynamicInput 
                    name={prop} 
                    fieldsGroup={field} 
                    control={control} 
                    values={values} 
                    setValue={setValue} 
                    setFields={setFields} 
                    fields={fields} 
                  /></Box>
                : <Box key={prop} 
                    sx={(field.fullWidth) ? { 
                      gridColumn: 'span 2'
                    } : {}}
                  >
                    <InputField 
                    prop={prop} 
                    field={field} 
                    fields={fields} 
                    setFields={setFields} 
                    values={values} 
                    setValue={setValue}
                    control={control}
                  /></Box>
              )
            ))}
            </Box>
            { (formOptions.actionPosition == 'bottom') &&  actionContainer() }
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
})
