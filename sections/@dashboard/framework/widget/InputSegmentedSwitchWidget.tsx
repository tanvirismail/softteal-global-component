import { Box, Card, Switch, ToggleButton, ToggleButtonGroup, Typography, alpha, styled } from "@mui/material"
import WidgetSettingDialog from "../dialog/WidgetSettingDialog";
import { useState } from "react";

const ToggleButtonGroupStyle = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
      margin: 0,
  },
}));

export default function InputSegmentedSwitchWidget({
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
}:any) {

  const [alignment, setAlignment] = useState<string | null>('A');
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };
  
    return <>
      <WidgetSettingDialog 
        open={dialog} 
        setOpen={closeSettingDialog}
        onSubmitData={(data:any)=>onSubmitData(id,data)}
        data={inputData}
        wid={wid}
        title="Segmented Switch Settings"
        subtitle=""
      />
      <Card sx={{ p: 3 }}>
      { !inputData.hideTitle &&  <Box sx={{ width: '100%' }} >
            <Typography variant="body1" sx={{color: 'text.disabled'}}>
                {inputData.title}
            </Typography>
        </Box> }
        <ToggleButtonGroupStyle
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            size="small"
            color="primary"
            sx={{m:0}}
            fullWidth
        >
          { 
            inputData.option.map((v:any,k:any)=>
              <ToggleButton key={k} value={v.value} aria-label={v.value} >
                {v.label}
              </ToggleButton>
            ) 
          }
        </ToggleButtonGroupStyle>
      </Card>

    </>
}
