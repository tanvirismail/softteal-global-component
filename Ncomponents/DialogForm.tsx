import { CloseIcon } from "@/_global/theme/overrides/CustomIcons";
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase, Slide, TextField, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { forwardRef, useState } from "react";

export default function DialogForm({children, open, setOpen, onClose, actions, title, subtitle, backBropClose=true}:any){
   
    const handleClose = () => {
        if(backBropClose){
            onClose && onClose();
            setOpen(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {subtitle}
                </DialogContentText>
                {children}
            </DialogContent>
            { actions && 
                <DialogActions>
                    { actions.map((v:any,k:any) => <Box key={k} >{v.component}</Box> ) }
                </DialogActions>
            }
        </Dialog>
    )
}

