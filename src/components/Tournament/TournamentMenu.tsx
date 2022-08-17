import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import MaterialTable from "material-table";
import "./Tournament.css";
import { useNavigate } from "react-router-dom";


function TournamentMenu() {

  const [state, setState] = useState({rowSelected: false});
  let navigate = useNavigate();

  function CategoriesAtCompetition() {
    const styles: React.CSSProperties = {
      textAlign: "center"
    }
    const Columns = [
      {
        "title": "Weight",
        "field": "weight",
        "cellStyle": styles
      },
      {
        "title": "Age",
        "field": "age",
        "cellStyle": styles
      },
      {
        "title": "Sex",
        "field": "sex",
        "cellStyle": styles
      },
      {
        "title": "Nr of competitors",
        "field": "nr",
        "cellStyle": styles
      },
    ]

    const dataset = [{
      weight: 60,
      age: "Junior",
      sex: "Female",
      nr: 15
    }, {
      weight: 60,
      age: "Junior",
      sex: "Female",
      nr: 15
    }, {
      weight: 60,
      age: "Junior",
      sex: "Female",
      nr: 15
    }, {
      weight: 60,
      age: "Junior",
      sex: "Female",
      nr: 15
    }, {
      weight: 60,
      age: "Junior",
      sex: "Female",
      nr: 15
    }];

    const drawTypes = [
      {
        numberOfCompetitors: 14,
        region: "EUROPE",
        numberOfRounds: 5,
        roundNames: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"]
      },
      {
        numberOfCompetitors: 14,
        region: "EUROPE",
        numberOfRounds: 5,
        roundNames: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"]
      },
      {
        numberOfCompetitors: 14,
        region: "EUROPE",
        numberOfRounds: 5,
        roundNames: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"]
      },
      {
        numberOfCompetitors: 14,
        region: "EUROPE",
        numberOfRounds: 5,
        roundNames: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"]
      },
      {
        numberOfCompetitors: 14,
        region: "EUROPE",
        numberOfRounds: 5,
        roundNames: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"]
      }
    ]

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
          onRowClick={(event, rowData, toggleDetailPanel) => {
            setState({rowSelected: true});
            console.log("tutaj")
            console.log(rowData)
            navigate("/tournament-draw", {state: {rowData: rowData, drawType: drawTypes[rowData.tableData.id]}})
          }}
        />
      </Container>
    );
  }

  return (
    <Container className='tournament'>
      <h1 className="text-center">Tournament</h1>
      <CategoriesAtCompetition/>
    </Container>
  );
}

export default TournamentMenu;
