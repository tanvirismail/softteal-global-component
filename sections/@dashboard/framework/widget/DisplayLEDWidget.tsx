import { Box, Card, Typography } from "@mui/material"
import WidgetSettingDialog from "../dialog/WidgetSettingDialog";
import { useState } from "react";


export default function DisplayLEDWidget({
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
        title="LED Settings"
        subtitle="This is the simplest widget that allows to visually determine brightness or color density of your device's LED."
      />
      <Card sx={{ display: 'flex',alignItems: 'center', p: 3 }}>
          <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
            <Typography variant="body1" sx={{color: 'text.disabled'}} noWrap>
              {inputData.title || "LED"}
            </Typography>
          </Box>
          <IconColor
            sx={{
                bgcolor: inputData.color || 'success.main',
            }}
          />
      </Card>
    </>
}

function IconColor({ sx, ...other }: any) {
    return (
      <Box
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          borderRadius: '50%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          transition: (theme) =>
            theme.transitions.create('all', {
              duration: theme.transitions.duration.shortest,
            }),
          ...sx,
        }}
        {...other}
      >
        {/* <Iconify icon={'eva:checkmark-fill'} /> */}
      </Box>
    );
}