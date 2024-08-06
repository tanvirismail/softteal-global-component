import { FormControlLabel, Switch } from "@mui/material"

const TableDensity = ({rowDense, setRowDense}:any) => {
    const onChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowDense(event.target.checked);
    };
    return (
        <FormControlLabel
            control={<Switch checked={rowDense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
    )
}

export {TableDensity}