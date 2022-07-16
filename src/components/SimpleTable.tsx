import MaterialTable from 'material-table';
import React from 'react';
import {Column} from "../objects/Column";
type Props ={
    title:string,
    columns:Column[],
    data:{}[]
}
const SimpleTable:React.FC<Props> = function BasicSearch(props) {
    return (
        <MaterialTable
            title={props.title}
            columns = {props.columns}
            data={props.data}
            options={{
                search: true,
                maxBodyHeight: 350
            }}
            onRowClick={(event, rowData, togglePanel) => console.log(rowData)}
        />
    )
}

export default SimpleTable