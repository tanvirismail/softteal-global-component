import { RHFSlider } from "@/_global/components/hook-form";
import { TextField } from "@mui/material";

export default function Slider({prop, field, value, setValue, ...other}:any) {
  
  const startValue = (Array.isArray(value)) ? value[0] : value;
  const endValue = (Array.isArray(value)) ? value[1] : value;
  const updateValue = (inputValue:any,direction:string) => {
    if(Array.isArray(value)) {
      if(direction == 'start'){
        if(value[1] > inputValue){
          value[0] = inputValue
        }
      }
      else if(direction == 'end'){
        if(value[0] < inputValue){
          value[1] = inputValue
        }
      }
    } else {
      value = inputValue
    }
    setValue(value);
  }

  return (
    <RHFSlider 
      name={prop}
      label={field.label}
      valueLabelDisplay={field.valueLabelDisplay}
      disabled={field.disabled}
      size={field.size}
      color={field.color}
      marks={field.marks}
      min={field.min}
      max={field.max}
      step={field.step}
      valueLabelFormat={field.valueLabelFormat}
      disableSwap={field.disableSwap}
      variant={field.variant}
      height={field.height}
      orientation={field.orientation}
      track={field.track}
      prepend= { field.prepend != "input" ? field.prepend : (
        <TextField
          value={startValue}
          size={field.size}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
            updateValue(Number(event.target.value),'start')
          }}
          onBlur={()=>{
            if (startValue < (field.min || 0)) { 
              updateValue( field.min || 0, 'start' )
            } 
            else if (startValue > (field.max || 100)) {
              updateValue( field.max || 100, 'start' )
            }
          }}
          inputProps={{
            step: field.step,
            min: (field.min || 0),
            max: (field.max || 100),
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
          variant="standard"
        />
      )}
      append= { field.append != "input" ? field.append : (
        <TextField
          value={endValue}
          size={field.size}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
            updateValue(Number(event.target.value),'end')
          }}
          onBlur={()=>{
            if (endValue < (field.min || 0)) { 
              updateValue( field.min || 0,'end' )
            } 
            else if (endValue > (field.max || 100)) {
              updateValue( field.max || 100,'end' )
            }
          }}
          inputProps={{
            step: field.step,
            min: (field.min || 0),
            max: (field.max || 100),
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
          variant="standard"
        />
      )}
      hintText={field.hintText}
      value={value}
      {...other}
    />
  )
}