import { Box, Card, Switch, Typography } from "@mui/material"
import WidgetSettingDialog from "../dialog/WidgetSettingDialog";
import { useState } from "react";
import NumberField from "@/_global/Ncomponents/form/NumberField";

export default function InputNumberWidget({
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
}:any) {

    return <>
      <WidgetSettingDialog 
        open={dialog} 
        setOpen={closeSettingDialog}
        onSubmitData={(data:any)=>onSubmitData(id,data)}
        data={inputData}
        wid={wid}
        title="Number input Settings"
        subtitle="The Number Input widget displays a numeric value. The initial value is the datastream default value, and the range of values are defined by the datastream min value and max value."
      />
      <Card sx={{ p: 3 }}>
        { !inputData.hideTitle && 
          <Box sx={{ width: '100%',  alignItems: 'stretch' }} >
              <Typography variant="body1" sx={{color: 'text.disabled'}}>
                { inputData.title }
              </Typography>
          </Box>
        }
        <NumberField 
            field={{
              size: "small",
              type: "number",
            }}
            inputProps={{style: { textAlign: 'center' }}}
        />
      </Card>
    </>
}
