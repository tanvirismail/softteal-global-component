import { TableHeadCustom } from "../table"


const TableHeader = ({
    useQueryResponse,
    headLabel,
    data,
    onSelectAllRows,
    numSelected,
    options,
}:any) => {
    const {state, updateState} = useQueryResponse()

    const orderBy = state.order;
    const columns = state.columns;

    const onSort = (columnName: string) => {
        const column = columns.find( (value:any) => value.data === columnName)
        if(column && column.orderable !== "false"){
          const columnIndex = columns.findIndex( (value:any) => value.data === columnName)
          const filtered = orderBy.find( (value:any) => value.column === columnIndex)
          if(filtered){
            for (var i in orderBy) {
              if (orderBy[i].column == columnIndex) {
                orderBy[i].dir = (filtered.dir === 'asc') ? 'desc' : 'asc';
                break;
              }
            }
          }
          else {
            orderBy.push({
              column: columnIndex,
              dir: 'desc'
            })
          }
          updateState({ draw: (state.draw)+1, order: orderBy })
          return
        }
      };
  
    return (
        <TableHeadCustom
            orderBy={orderBy}
            onSort={onSort}
            columns={columns}
            headLabel={headLabel}
            rowCount={data.length}
            numSelected={numSelected}
            onSelectAllRows={(checked) =>
                onSelectAllRows(
                    checked,
                    data.map((row:any) => row.id)
                )
            }
            checkbox={options.checkbox}
        />
    )
}

export {TableHeader}