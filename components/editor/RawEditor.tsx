import { CloseIcon } from "@/_global/theme/overrides/CustomIcons";
import { AppBar, Box, Button, Dialog, IconButton, InputBase, Slide, TextField, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { forwardRef, useState } from "react";

export default function RawEditor({open, setOpen, value, setRawHTML, handleRawValue}:any){
   
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
                        Raw Editor
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <Box>
                <InputBase
                    sx={{ p: 3 }}
                    inputProps={{
                        'aria-label': 'raw editor', 
                        style: {
                            height: "85vh",
                        },
                    }}
                    fullWidth
                    color="success"
                    multiline
                    autoFocus
                    type="text"
                    value={value}
                    onChange={(event)=>{
                        setRawHTML(event.target.value);
                        handleRawValue(event.target.value)
                    }}
                />

            </Box>
        </Dialog>
    )
}

