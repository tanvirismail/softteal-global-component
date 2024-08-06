// @mui
import { CircularProgress, Dialog, DialogTitle, IconButton, MenuItem, Stack, Tooltip } from '@mui/material';
//
import Iconify from '@/_global/components/Iconify';
import MenuPopover from '@/_global/components/MenuPopover';
import { useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  actions: React.ReactNode;
  open?: HTMLElement | null;
  onClose?: VoidFunction;
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;
};

function ExportLoading(props: any) {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };
  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pb: 2.5, pe: 3 }}
        >
          <CircularProgress  sx={{ marginRight: 2 }}/> Automatic download will be starting shortly.
        </Stack>
      </DialogTitle>
    </Dialog>
  );
}

export default function TableExport({ fileExport, handleFileExport }: any) {

  const [open, setOpen] = useState<HTMLElement | null>(null);
  const onOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };
  const onClose = () => {
    setOpen(null)
  }

  // export action
  const [exportLoadingOpen, setExportLoadingOpen] = useState(false);
  const handleExportLoadingOpen = () => {
    setExportLoadingOpen(true);
  };
  const handleExportLoadingClose = () => {
    setExportLoadingOpen(false);
  };
  const actionFileExport = async(name:string) => {
    handleExportLoadingOpen();
    const res = await handleFileExport(name);
    if(res) handleExportLoadingClose()
  }
  let lists:any = [];
  fileExport && fileExport.map((v:any)=>{
    if(v=='pdf'){
      lists.push({
        name: v,
        label: "PDF",
        icon: <Iconify icon={'fa:file-pdf-o'} />,
        action: actionFileExport
      })
    }
    else if(v=='csv'){
      lists.push({
        name: v,
        label: "CSV",
        icon: <Iconify icon={'gala:file-csv'} />,
        action: actionFileExport
      })
    }
    else if(v=='html'){
      lists.push({
        name: v,
        label: "HTML",
        icon: <Iconify icon={'eva:browser-outline'} />,
        action: actionFileExport
      })
    }
    else if(v=='xlsx'){
      lists.push({
        name: v,
        label: "XLSX",
        icon: <Iconify icon={'lucide:file-spreadsheet'} />,
        action: actionFileExport
      })
    }
    else if(v=='send-email'){
      lists.push({
        name: v,
        label: "Send Email",
        icon: <Iconify icon={'eva:email-outline'} />,
        action: actionFileExport
      })
    }
  })
  // export action

  return (
    <>
      <ExportLoading
          open={exportLoadingOpen}
          onClose={handleExportLoadingClose}
      />
      <Tooltip title="Export">
          <IconButton onClick={onOpen} size="large">
              <Iconify icon={'eva:cloud-download-outline'}/>
          </IconButton>
      </Tooltip>
      <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          arrow="top-right"
          sx={{
          //   mt: -1,
          //   width: 160,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
              '& svg': { mr: 2, width: 20, height: 20 },
            },
          }}
      >
        {     
          lists && lists.map((v:any, key:any)=>
            <MenuItem
                key={key}
                onClick={()=>{ 
                  v.action(v.name)
                }}
                sx={v.sx}
            >
              {v.icon} {v.label} 
            </MenuItem>
          )
        }
      </MenuPopover>
    </>
  );
}
