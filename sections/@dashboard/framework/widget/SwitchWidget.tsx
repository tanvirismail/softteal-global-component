import { Box, Card, Switch, Typography, alpha, styled } from "@mui/material"
import WidgetSettingDialog from "../dialog/WidgetSettingDialog";
import { useState } from "react";


export default function SwitchWidget({
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
}:any) {

  const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: inputData.color,
      '&:hover': {
        backgroundColor: alpha( inputData.color, theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: inputData.color,
    },
  }));

    return <>
      <WidgetSettingDialog 
        open={dialog} 
        setOpen={closeSettingDialog}
        onSubmitData={(data:any)=>onSubmitData(id,data)}
        data={inputData}
        wid={wid}
        title="Switch Settings"
        subtitle="The Switch widget sends a command and displays the binary status of the device, typically 1 for ON, and 0 for OFF."
      />
      <Card sx={{ p: 3 }}>
        { !inputData.hideTitle && 
          <Box sx={{ width: '100%' }} >
              <Typography variant="body1" sx={{color: 'text.disabled'}}>
                  {inputData.title}
              </Typography>
          </Box>
        }
          <Box sx={{display: 'flex',alignItems: 'center',}}>
              { inputData.showLable && 
                <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                    <Typography variant="subtitle2" noWrap>
                      { inputData?.offLable }
                    </Typography>
                </Box>
              }
              <CustomSwitch />
          </Box>
      </Card>
    </>
}
