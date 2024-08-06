import { Box, Card, Switch, Typography } from "@mui/material"
import WidgetSettingDialog from "../dialog/WidgetSettingDialog";
import { useState } from "react";
import TextField from "@/_global/Ncomponents/form/Text";

export default function InputTextWidget({
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
        title="Text input Settings"
        subtitle="The Text Input widget displays a string value."
      />
      <Card sx={{ p: 3 }}>
        { !inputData.hideTitle && 
          <Box sx={{ width: '100%',  alignItems: 'stretch' }} >
              <Typography variant="body1" sx={{color: 'text.disabled'}}>
              { inputData.title }
              </Typography>
          </Box>
        }
        <TextField
            field={{
                size: "small",
                type: "text",
            }} 
        /> 
      </Card>
    </>
}
