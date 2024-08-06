import { useState, useEffect } from 'react';
// @mui
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// ----------------------------------------------------------------------

export default function ConfirmDialog({open, close, title, body, confirm}:any) {
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    close();
    setLoading(false);
  };
  const handleConfirm = () => {
    setLoading(true);
    const fn = confirm();
    if(fn){
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ mt: '10px' }} >
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            onClick={handleConfirm}
            loading={loading}
          >
            <span>Ok</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
