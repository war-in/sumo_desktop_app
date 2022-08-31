import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {DrawFromDatabase, RowData} from "./Model";
// @ts-ignore
import response from "../../mocks/CategoriesAtCompetition.json";
import axios from "axios";
import MaterialTable from "@material-table/core";

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
    const [categories, setCategories] = useState<RowData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:8080/tournament/menu?competitionId=10")
                .then(response => {
                    setCategories(response.data.dataset);
                })
        }
        fetchData()
    }, []);

    const drawsFromDatabase: DrawFromDatabase[] = response.draws

    return (
        <Container className="tournament-box">
            <MaterialTable
                columns={Columns}
                data={categories}
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
                    navigate("/tournament-draw", {
                        state: {
                            rowData: rowData,
                            drawFromDatabase: drawsFromDatabase[rowData.tableData.id]
                        }
                    })
                }}
            />
        </Container>
    );
}

export default CategoriesAtCompetition;