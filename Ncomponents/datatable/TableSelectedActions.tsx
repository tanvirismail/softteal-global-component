import {  
    TableSelectedActions as MUITableSelectedActions, 
} from "@/_global/Ncomponents/table";
import Iconify from "@/_global/components/Iconify";
import { IconButton, Tooltip } from "@mui/material";
import ConfirmDialog from "../ConfirmDialog";
import { useState } from "react";

const TableSelectedActions = ({rowDense, selected, setSelected, data, onSelectAllRows, handleSelectedAction}:any) => {
    const [openDialog, setOpenDialog] = useState(false);
    const selectedActions = () => {
        const getResult = handleSelectedAction(selected)
        if(getResult){
          setSelected([]);
          return true;
        }
      };
    return (
        <>
            <MUITableSelectedActions
                dense={rowDense}
                numSelected={selected.length}
                rowCount={data.length}
                onSelectAllRows={(checked) =>
                    onSelectAllRows(
                        checked,
                        data.map((row:any) => row.id)
                    )
                }
                actions={
                    <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => setOpenDialog(true)}>
                            <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                    </Tooltip>
                }
            />
            <ConfirmDialog
                open={openDialog}
                close={() => setOpenDialog(false)}
                title="Confirmation to Remove!"
                body="Are you sure?"
                confirm={ () => selectedActions() }
            />
        </>
    )
}

export {TableSelectedActions}