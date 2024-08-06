
import Select from './Select';
import SingleFile from './SingleFile';
import MultiFile from './MultiFile';
import Text from './Text';
import NumberField from './NumberField';
import Password from './Password';
import RemoteSelect from './RemoteSelect';
import Datetime from './Datetime';
import Editor from './Editor';
import Switch from './Switch';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Slider from './Slider';
import Avatar from './Avatar';
import Color from './Color';
import IconPicker from './IconPicker';

export default function InputField({prop, field, setFields, fields, values, setValue}:any) {

    return (
        <>
        {
            (field.type=="text") ? <Text prop={prop} field={field} /> :
            (field.type=="number") ? <NumberField prop={prop} field={field} /> :
            (field.type=="password") ? <Password prop={prop} field={field} setFields={setFields} fields={fields} /> :
            (field.type=="select") ? <Select prop={prop} field={field} setValue={(v:any)=>setValue(prop,v)} /> :
            (field.type=="remote_select") ? <RemoteSelect prop={prop} field={field} setValue={setValue} /> :
            (field.type=="date" || field.type=="datetime" || field.type=="time") ? <Datetime prop={prop} field={field} values={values} /> :
            (field.type=="editor") ? <Editor prop={prop} field={field} setValue={setValue} /> :
            (field.type=="switch") ? <Switch prop={prop} field={field} /> :
            (field.type=="checkbox") ? <Checkbox prop={prop} field={field} /> :
            (field.type=="radio") ? <Radio prop={prop} field={field} setValue={setValue} /> :
            (field.type=="slider") ? <Slider prop={prop} field={field} value={values[prop]} setValue={(v:any)=>setValue(prop,v)} /> :
            (field.type=="avater") ? <Avatar prop={prop} field={field} setValue={setValue} /> :
            (field.type=="file") ? <SingleFile prop={prop} field={field} setValue={setValue} /> :
            (field.type=="multipleFile") ? <MultiFile prop={prop} field={field} setValue={setValue} values={values} /> :
            (field.type=="color") ? <Color prop={prop} field={field} /> :
            (field.type=="icon_picker") ? <IconPicker prop={prop} field={field} value={values[prop]} setValue={(v:any)=>setValue(prop,v)}/> :
            ""
        }
        </>
    )
    
};