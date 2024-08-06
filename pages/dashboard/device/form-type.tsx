import { CustomFile } from '@/_global/components/upload';
import dayjs, { Dayjs } from 'dayjs';

export interface FormValuesProps {
    text: string;
    number: number;
    password: string;
    select: string;
    onchangeselect: string;
    multipleselect: Array<[]>;
    remoteselect: string;
    date: Dayjs | null;
    datetime: Dayjs | null;
    time: Dayjs | null;
    editor: string;
    textarea: string;
    switch: Boolean;
    checkbox:  Boolean;
    checkboxMultiple: Array<[]>;
    radio: string;
    slider: number;
    file: CustomFile | string | null;
    avater: CustomFile | string | null;
    multipleFile: Array<[File[]]> | null;
    color: string;
    dynamicInput: Array<any>;
    showhide_content: string;
    onchange_radio: string;
}