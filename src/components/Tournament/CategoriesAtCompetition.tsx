import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import MaterialTable from "material-table";
import {DrawFromDatabase, RowData} from "./Model";
// @ts-ignore
import response from "../../mocks/CategoriesAtCompetition.json";

function CategoriesAtCompetition() {
  let navigate = useNavigate();

  const styles: React.CSSProperties = {
    textAlign: "center"
  }
  const Columns = [
    {"title": "Weight", "field": "weight", "cellStyle": styles},
    {"title": "Age", "field": "age", "cellStyle": styles},
    {"title": "Sex", "field": "sex", "cellStyle": styles},
  ]

  const dataset: RowData[] = response.dataset

  const drawsFromDatabase: DrawFromDatabase[] = response.draws

  return (
    <Container className="tournament-box">
      <MaterialTable
        columns={Columns}
        data={dataset}
        options={{
          tableLayout: "auto",
          search: false,
          toolbar: false,
          headerStyle: {
            fontSize: "30px",
            textAlign: "center",
          },
          rowStyle: {
            fontSize: "30px",
            textAlign: "center",
          },
        }}
        onRowClick={(event, rowData) => {
          // @ts-ignore
          navigate("/tournament-draw", {state: {rowData: rowData, drawFromDatabase: drawsFromDatabase[rowData.tableData.id]}})
        }}
      />
    </Container>
  );
}

export default CategoriesAtCompetition;