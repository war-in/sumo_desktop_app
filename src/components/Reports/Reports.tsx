import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import ReportTable from "./ReportTable";
import axios from "axios";
import {RowData} from "../Tournament/Model";
import "./Reports.css";


function Reports() {
    const styles: React.CSSProperties = {
    }
    const individualColumns = [
        {"title": "Kategoria wagowa", "field": "weight", "cellStyle": styles},
        {"title": "Kategoria wiekowa", "field": "age", "cellStyle": styles},
        {"title": "Płeć", "field": "sex", "cellStyle": styles},
    ]
    const groupColumns = [
        {"title": "Typ", "field": "weight", "cellStyle": styles},
        {"title": "Kategoria wiekowa", "field": "age", "cellStyle": styles},
        {"title": "Płeć", "field": "sex", "cellStyle": styles},
    ]

    const [categories, setCategories] = useState<RowData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:8080/reports/individual?competitionId=10")
                .then(response => {
                    setCategories(response.data.dataset);
                })
        }
        fetchData()
    }, []);

    return (
        <Container className='reports p-0'>
            <Row className="report-title">
                <h1 className="text-center">Raporty</h1>
            </Row>
            <Row className="individualReports w-75">
                <ReportTable title={"Raporty indywidualne"} columns={individualColumns} data={categories}/>
            </Row>
            {/*<Row className="groupReports">*/}
            {/*    <ReportTable title={"Raporty grupowe"} columns={groupColumns} data={categories}/>*/}
            {/*</Row>*/}
        </Container>
    );
}

export default Reports;