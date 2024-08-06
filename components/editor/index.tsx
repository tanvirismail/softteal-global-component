import { ReactNode } from 'react';
import { ReactQuillProps } from 'react-quill';
// next
import dynamic from 'next/dynamic';
// @mui
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
//
import EditorToolbar, { formats } from './EditorToolbar';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        bgcolor: 'background.paper',
      }}
    >
      Loading...
    </Box>
  ),
});

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: 200,
    maxHeight: 640,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled,
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

// ----------------------------------------------------------------------

export interface Props extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  helperText?: ReactNode;
  sx?: BoxProps;
  variant?: string;
  handleRawValue?: any;
  minHeight?: any;
  maxHeight?: any;
}

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  handleRawValue,
  variant,
  minHeight,
  maxHeight,
  ...other
}: Props) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...( variant == 'standard' && {
            border: "0px",
            borderRadius: "0px", 
            borderBottom: "solid 1px rgba(145, 158, 171, 0.56)",
            ...(error && {
              borderBottom: (theme) => `solid 1px ${theme.palette.error.main}`,
            })
          }),
          ...( variant == 'filled' && {
            border: "0px",
            borderRadius: "8px 8px 0px 0px",
            bgcolor: 'rgba(145, 158, 171, 0.16)',
            borderBottom: "solid 1px rgba(145, 158, 171, 0.56)",
            ...(error && {
              borderBottom: (theme) => `solid 1px ${theme.palette.error.main}`,
            })
          }),
          '& .ql-editor': {
            ...( minHeight && { minHeight: minHeight } ),
            ...( maxHeight && { maxHeight: maxHeight } )
          },
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} value={value} handleRawValue={handleRawValue}/>
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </RootStyle>

      {helperText && helperText}
    </div>
  );
}
