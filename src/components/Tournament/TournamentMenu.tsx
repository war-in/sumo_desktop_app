import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import MaterialTable from "material-table";
import "./Tournament.css";
import { useNavigate } from "react-router-dom";


function TournamentMenu() {

  const [state, setState] = useState({rowSelected: false, combatsGenerated: false});
  let navigate = useNavigate();

  function CategoriesAtCompetition() {
    const Columns = [
      {
        "title": "Weight",
        "field": "weight",
        "cellStyle": {
          textAlign: "center"
        }
      },
      {
        "title": "Age",
        "field": "age",
        "cellStyle": {
          textAlign: "center"
        }
      },
      {
        "title": "Sex",
        "field": "sex",
        "cellStyle": {
          textAlign: "center"
        }
      },
      {
        "title": "Nr of competitors",
        "field": "nr",
        "cellStyle": {
          textAlign: "center"
        }
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
            setState({rowSelected: true, combatsGenerated: false});
            console.log(rowData)
            navigate("/tournament-draw", {state: rowData})
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
