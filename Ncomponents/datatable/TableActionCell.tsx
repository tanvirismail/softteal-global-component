import { TableMoreMenu } from "@/_global/Ncomponents/table";
import { MenuItem, TableCell } from "@mui/material";
import { Fragment, useState } from "react";
import ConfirmDialog from '@/_global/Ncomponents/ConfirmDialog';

export default function TableActionCell({lists}:any){


    const [openDialog, setOpenDialog] = useState(false);
    const [menuItem, setMenuItem] = useState<any>({});
    const [confirmDialogTitle, setConfirmDialogTitle] = useState<any>("");
    const [confirmDialogBody, setConfirmDialogBody] = useState<any>("");

    // dropdown action menu
    const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setOpenMenuActions(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };
    // dropdown action menu


    const handleMenuItemAction = (menu:any) => {
        setMenuItem(menu);
        handleCloseMenu();
        if(menu.confirm) {
            setOpenDialog(true)
            setConfirmDialogTitle(menu.confirm.title)
            setConfirmDialogBody(menu.confirm.body)
        } 
        else {
            menu.action()
        }
    }
    const handleConfirmDialog = () => {
        menuItem.action();
        return true;
    }
  
    return (
        <>
            <TableCell align="right">
                <TableMoreMenu
                    open={openMenu}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                        lists.map((v:any, key:any)=> (
                            <Fragment key={key}>{ Object.keys(v).length > 0 &&
                                <MenuItem
                                    onClick={()=>{ 
                                        handleMenuItemAction(v)
                                    }}
                                    sx={v.sx}
                                >
                                    {v.icon} {v.label} 
                                </MenuItem>
                            }</Fragment>
                        ))
                    }
                />
            </TableCell>
            <ConfirmDialog
                open={openDialog}
                close={() => setOpenDialog(false)}
                title={confirmDialogTitle}
                body={confirmDialogBody}
                confirm={ () => handleConfirmDialog() }
            />
        </>
    );
};