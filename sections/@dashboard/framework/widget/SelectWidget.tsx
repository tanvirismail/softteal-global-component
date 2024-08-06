import { Box, Card, Switch, Typography } from "@mui/material"
import WidgetSettingDialog from "../dialog/WidgetSettingDialog";
import { useState } from "react";
import Slider from "@/_global/Ncomponents/form/Slider";
import SelectField from "@/_global/Ncomponents/form/Select";

export default function SelectWidget({
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
}:any) {
  const [selectValue, setSelectValue] = useState<any>("");
    return <>
      <WidgetSettingDialog 
        open={dialog} 
        setOpen={closeSettingDialog}
        onSubmitData={(data:any)=>onSubmitData(id,data)}
        data={inputData}
        wid={wid}
        title="Select Settings"
        subtitle="Select settings."
      />
      <Card sx={{ p: 3 }}>
        { !inputData.hideTitle && 
          <Box sx={{ width: '100%',  alignItems: 'stretch' }} >
              <Typography variant="body1" sx={{color: 'text.disabled'}}>
                  { inputData.title }
              </Typography>
          </Box>
        }
        <SelectField
            field={{
                size: "small",
                type: "select",
                placeholder: "Type select",
                option: inputData.option,
            }} 
            value={selectValue}
            setValue={setSelectValue}
        /> 
      </Card>
    </>
}
