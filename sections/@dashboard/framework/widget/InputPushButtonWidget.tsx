import { Box, Button, Card, Switch, Typography } from "@mui/material"
import WidgetSettingDialog from "../dialog/WidgetSettingDialog";
import { useState } from "react";
import NumberField from "@/_global/Ncomponents/form/NumberField";

export default function InputPushButtonWidget({
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
        title="Push button Settings"
        subtitle="Push button Settings"
      />
      <Card sx={{ p: 3 }}>
        { !inputData.hideTitle && 
          <Box sx={{ width: '100%' }} >
              <Typography variant="body1" sx={{color: 'text.disabled'}}>
              { inputData.title }
              </Typography>
          </Box>
        }
        <Button fullWidth variant="contained" >
            Fire
        </Button>
        {/* <Button fullWidth variant="contained" color="error" >
            Fire
        </Button> */}
      </Card>
    </>
}
