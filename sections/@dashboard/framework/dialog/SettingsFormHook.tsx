import LEDSettingsForm from "./form/LEDSettingsForm";
import SwitchSettingsForm from "./form/SwitchSettingsForm";
import SliderSettingsForm from "./form/SliderSettingsForm";
import SelectSettingsForm from "./form/SelectSettingsForm";
import InputTextSettingsForm from "./form/InputTextSettingsForm";
import InputNumberSettingsForm from "./form/InputNumberSettingsForm";
import InputPushButtonSettingsForm from "./form/InputPushButtonSettingsForm";
import InputSegmentedSwitchSettingsForm from "./form/InputSegmentedSwitchSettingsForm";
import SingleStatSettingsForm from "./form/SingleStatSettingsForm";
import RadialSettingsForm from "./form/RadialSettingsForm";
import GaugeSettingsForm from "./form/GaugeSettingsForm";
import ChartSettingsForm from "./form/ChartSettingsForm";
import HeatmapSettingsForm from "./form/HeatmapSettingsForm";
import MapSettingsForm from "./form/MapSettingsForm";

const form:any = {
  ow1: LEDSettingsForm,
  ow2: SingleStatSettingsForm, 
  ow3: RadialSettingsForm, 
  ow4: GaugeSettingsForm, 
  ow5: ChartSettingsForm, 
  ow6: HeatmapSettingsForm, 
  ow7: MapSettingsForm, 
  iw2: SwitchSettingsForm,
  iw3: InputSegmentedSwitchSettingsForm,
  iw4: InputPushButtonSettingsForm,
  iw5: SliderSettingsForm,
  iw6: SelectSettingsForm,
  iw7: InputTextSettingsForm,
  iw8: InputNumberSettingsForm,
}

export function useSettingsFormHook(wid:any,data:any) {

  const { fields, setFields, rules, formData, setFormData } = form[wid] ? form[wid](data) : form.ow1(data);

  return {
      fields, setFields,
      rules,
      formData, setFormData
  }
  
};