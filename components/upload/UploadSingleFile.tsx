import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack } from '@mui/material';
// type
import { UploadProps } from './type';
//
import Image from '../Image';
import RejectionFiles from './RejectionFiles';
import BlockContent from './BlockContent';
import { useCallback } from 'react';
import Iconify from '../Iconify';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  onRemove,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <Box sx={{ width: '100%', position: 'relative', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
          ...(file && {
            padding: '24% 0',
            border: '1px dashed rgba(145, 158, 171, 0.2)',
          }),
        }}
      >
        <input {...getInputProps()} />

        { file ? (
          <Box
            sx={{
              p: '8px',
              top: '0px',
              left: '0px',
              width: '100%',
              height: '100%',
              position: 'absolute'
            }}
          >
            <Image
              alt="file preview"
              src={typeof file === 'string' ? file : file.preview}
              crossOrigin="anonymous"
              sx={{
                overflow: "hidden",
                position: "relative",
                verticalAlign: "bottom",
                display: "inline-block",
                width: "100%",
                height: "100%",
                borderRadius: "8px"
              }}
            />
          </Box>
        ) : (
          <BlockContent title={other.title} subtitle={other.subtitle} />
        )
      }
      </DropZoneStyle>
      { (file && onRemove) &&
        <IconButton
          size="small"
          onClick={() => onRemove(file)}
          sx={{
            top: 6,
            p: '2px',
            right: 6,
            position: 'absolute',
            color: 'common.white',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon={'eva:close-fill'} />
        </IconButton>
      }

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {helperText && helperText}
    </Box>
  );
}
