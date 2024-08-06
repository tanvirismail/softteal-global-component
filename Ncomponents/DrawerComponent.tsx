import { CloseIcon } from "@/_global/theme/overrides/CustomIcons";
import { AppBar, Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, IconButton, InputBase, Slide, Stack, TextField, Toolbar, Typography, alpha, styled, useTheme } from "@mui/material";
import React, { forwardRef, useState, FC, useRef } from "react";
import Iconify from "../components/Iconify";
import cssStyles from "../utils/cssStyles";
import { NAVBAR } from "../config";
import Scrollbar from "../components/Scrollbar";
import { LoadingButton } from '@mui/lab';
  
const DrawerComponent: FC<any> = ({component:Component, drawerOpions, ...restProps}:any) => {
   
    const {open, setOpen, title, width} = restProps;
    const handleToggle = () => {
        setOpen((prev:any) => !prev);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const submitForm = () => {
        componentRef.current && componentRef.current.submitForm();
    };
    const componentRef = useRef<any>(null);

  
    return (
        <>

            <Backdrop
                open={open}
                onClick={handleClose}
                sx={{ 
                    background: 'transparent', 
                    zIndex: (theme) => theme.zIndex.drawer
                }}
            />
            <Drawer
                anchor='right'
                // variant="persistent"
                open={open}
                onClose={handleToggle}
                PaperProps={{
                    sx: {
                        width: width || '20%',
                        margin: (theme) => theme.spacing(1),
                        borderRadius: (theme) => theme.shape.borderRadius * 2 + 'px',
                        height: (theme) => `calc(100% - ${theme.spacing(2)})`
                    }
                }}
            >
                
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ py: 2, pr: 1, pl: 2.5 }}
                >
                    <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                     {title}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <Iconify icon={'eva:close-fill'} width={20} height={20} />
                    </IconButton>
                </Stack>
                <Divider sx={{ borderStyle: 'dashed' }} />

                <Scrollbar sx={{ flexGrow: 1 }}>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        <Component ref={componentRef} {...restProps} />
                    </Stack>
                </Scrollbar>

                {
                    (drawerOpions?.submitBtn || drawerOpions?.cancelBtn) && 
                    <Box  sx={{ top: 'auto', bottom: 0, marginTop: "auto", borderTop: (theme) => '1px solid ' + theme.palette.divider, width: '100%' }} >
                        <Box sx={{ p: 2, textAlign:"right" }} >
                            { drawerOpions?.cancelBtn && <Button variant="outlined" color='inherit' onClick={()=>handleClose()} >Close</Button> }
                            { drawerOpions?.submitBtn && 
                                <LoadingButton onClick={()=>submitForm()} variant="contained" sx={{marginLeft: 2}} loading={false}>
                                    Submit
                                </LoadingButton>
                            }
                        </Box>
                    </Box>
                }
            </Drawer>
        </>
    )
}

export default DrawerComponent;