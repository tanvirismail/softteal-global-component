import { CloseIcon } from "@/_global/theme/overrides/CustomIcons";
import { AppBar, Box, Button, Dialog, IconButton, InputBase, Slide, TextField, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { forwardRef, useState } from "react";

export default function DialogFullScreen({children, open, setOpen, title}:any){
   
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box>
                {children}
            </Box>
        </Dialog>
    )
}

