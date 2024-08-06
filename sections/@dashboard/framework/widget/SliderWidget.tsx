import { Box, Card, Switch, Typography } from "@mui/material"
import WidgetSettingDialog from "../dialog/WidgetSettingDialog";
import { useState } from "react";
import Slider from "@/_global/Ncomponents/form/Slider";

export default function SliderWidget({
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
}:any) {
  const [sliderVvalue, setSliderValue] = useState<any>(5);
    return <>
      <WidgetSettingDialog 
        open={dialog} 
        setOpen={closeSettingDialog}
        onSubmitData={(data:any)=>onSubmitData(id,data)}
        data={inputData}
        wid={wid}
        title="Slider Settings"
        subtitle="A Slider assigns a value to a datastream within a pre-defined range. Usage examples: volume, brightness, RPM, flap position control, etc."
      />
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Slider
            field={{
                label: (!inputData.hideTitle) ? inputData.title : "",
                type: "slider",
                valueLabelDisplay: 'auto',
                min: parseInt(inputData?.minValue) || 0,
                max: parseInt(inputData?.maxValue) || 10,
                step: parseInt(inputData?.step) || 1,
                append: (inputData?.showValue) && 'input',
            }} 
            value={sliderVvalue}
            setValue={setSliderValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSliderValue(event.target.value === '' ? 0 : event.target.value );
            }}
            sx={{mb:1}}
        />
      </Card>
    </>
}
