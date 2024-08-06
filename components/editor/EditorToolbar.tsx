import { Tooltip } from '@mui/material';
import EditorToolbarStyle from './EditorToolbarStyle';
import RawEditor from './RawEditor';
import {RawOn} from '@mui/icons-material';
import { useState } from 'react';
// ----------------------------------------------------------------------

const HEADINGS = ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'];

export const formats = [
  'align',
  'background',
  'blockquote',
  'bold',
  'bullet',
  'code',
  'code-block',
  'color',
  'direction',
  'font',
  'formula',
  'header',
  'image',
  'indent',
  'italic',
  'link',
  'list',
  'script',
  'size',
  'strike',
  'table',
  'underline',
  'video',
];

type EditorToolbarProps = {
  id: string;
  isSimple?: boolean;
  value?: any;
  handleRawValue: any;
};

export default function EditorToolbar({ id, isSimple, value, handleRawValue, ...other }: EditorToolbarProps) {

  const [openDialog, setOpenDialog] = useState(false);
  const [raw_html, setRawHTML] = useState<string>('');
  const onClickRaw = ()=>{
    setRawHTML(value);
    setOpenDialog(true);
  }

  return (
    <EditorToolbarStyle {...other}>
      <div id={id}>
        <div className="ql-formats">
          <select className="ql-header" defaultValue="">
            {HEADINGS.map((heading, index) => (
              <option key={heading} value={index + 1}>
                {heading}
              </option>
            ))}
            <option value="">Normal</option>
          </select>
        </div>

        <div className="ql-formats">
          <Tooltip arrow title='Bold'><button type="button" className="ql-bold" /></Tooltip>
          <Tooltip arrow title='Italic'><button type="button" className="ql-italic" /></Tooltip>
          <Tooltip arrow title='Underline'><button type="button" className="ql-underline" /></Tooltip>
          <Tooltip arrow title='Strike'><button type="button" className="ql-strike" /></Tooltip>
        </div>

        {!isSimple && (
          <div className="ql-formats">
            <Tooltip arrow title='Color'><select className="ql-color" /></Tooltip>
            <Tooltip arrow title='Background'><select className="ql-background" /></Tooltip>
          </div>
        )}

        <div className="ql-formats">
          <Tooltip arrow title='List'><button type="button" className="ql-list" value="ordered" /></Tooltip>
          <Tooltip arrow title='List'><button type="button" className="ql-list" value="bullet" /></Tooltip>
          {!isSimple && <Tooltip arrow title='Indent'><button type="button" className="ql-indent" value="-1" /></Tooltip>}
          {!isSimple && <Tooltip arrow title='Indent'><button type="button" className="ql-indent" value="+1" /></Tooltip>}
        </div>

        {!isSimple && (
          <div className="ql-formats">
            <Tooltip arrow title='Super'><button type="button" className="ql-script" value="super" /></Tooltip>
            <Tooltip arrow title='Sub'><button type="button" className="ql-script" value="sub" /></Tooltip>
          </div>
        )}

        {!isSimple && (
          <div className="ql-formats">
            <Tooltip arrow title='Code block'><button type="button" className="ql-code-block" /></Tooltip>
            <Tooltip arrow title='Blockquote'><button type="button" className="ql-blockquote" /></Tooltip>
          </div>
        )}

        <div className="ql-formats">
          {!isSimple && (
            <Tooltip arrow title='Direction'><button type="button" className="ql-direction" value="rtl" /></Tooltip>
          )}
          <Tooltip arrow title='Align'><select className="ql-align" /></Tooltip>
        </div>

        <div className="ql-formats">
          <Tooltip arrow title='Link'><button type="button" className="ql-link" /></Tooltip>
          <Tooltip arrow title='Image'><button type="button" className="ql-image" /></Tooltip>
          {!isSimple && ( <Tooltip arrow title='Video'><button type="button" className="ql-video" /></Tooltip> )}
        </div>
        <div className="ql-formats">
          {!isSimple && <Tooltip arrow title='Formula'><button type="button" className="ql-formula" /></Tooltip>}
          <Tooltip arrow title='Format clean'><button type="button" className="ql-clean" /></Tooltip>
          <Tooltip arrow title='Code view'>
            <button type="button" className='' onClick={onClickRaw}><RawOn/></button>
          </Tooltip>
        </div>
      </div>
      <RawEditor open={openDialog} setOpen={setOpenDialog} value={raw_html} setRawHTML={setRawHTML} handleRawValue={handleRawValue} />
    </EditorToolbarStyle>
  );
}
