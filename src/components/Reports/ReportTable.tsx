import React from "react";
import MaterialTable from "@material-table/core";


type Props = {
    title: string
    columns: { title: string, field: string, cellStyle: React.CSSProperties }[]
    data: any
}

const ReportTable: React.FC<Props> = (props) => {
    return <MaterialTable
        title={props.title}
        columns={props.columns}
        data={props.data}
        options={{
            tableLayout: "auto",
            headerStyle: {
                fontSize: "20px",
                textAlign: "center",
            },
            rowStyle: {
                fontSize: "15px",
                textAlign: "center",
            },
            tableWidth: 'full'
        }
        }
    />
}

export default ReportTable;