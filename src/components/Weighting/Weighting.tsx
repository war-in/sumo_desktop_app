import React, {useState} from 'react';
import {Container, Image, Row} from "react-bootstrap";
import Categories from "./Categories";
import './Competitors.css';
import './Categories.css';
import './CompetitorDetails.css';
import {Box, Button, Input} from "@material-ui/core";
import {Column} from "../../objects/Column";
import MaterialTable from "material-table";
// @ts-ignore
import declared from "../../mocks/Competitors.json";
import Competitor from "../../objects/Competitor";



function Weighting() {
    const [competitor, setCompetitor] = useState("");

    const onRowClicked = () => {
       setCompetitor("Imieeeee");
    };

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
                onRowClick={(event, rowData) => onRowClicked()}
            />
        )
    }

    const Competitors = () => {
        const Columns = [
            {"title": "Imię", "field": "personalDetails.names"},
            {"title": "Nazwisko", "field": "personalDetails.surname"},
            {"title": "Kraj", "field": "country.name"},
            {"title": "Kategoria", "field": "category"}
        ]

        return (
            <>
                <SimpleTable title={"Zawodnicy"} columns={Columns} data={declared}/>
            </>
        )
    }

    function CompetitorDetails() {
        return (
            <Box className="details-card">
                <Image className="photo" src="https://exnessin.com/img/avatar-blank.png"/>
                <Box className="details">
                    <Row className="detail"><Box className="detail-text">{competitor}</Box></Row>
                    <Row className="detail"><Box className="detail-text">Birthdate</Box></Row>
                    <Row className="detail"><Box className="detail-text">Country</Box></Row>
                    <Row className="detail"><Box className="detail-text">Club</Box></Row>
                    <Row className="detail"><Box className="detail-text">Sex</Box></Row>
                    <Box className="weight-label">Weight:</Box>
                    <Row className="detail"><Input className="weight-input"></Input></Row>
                    <Row className="detail"><Button>OK</Button></Row>
                </Box>
            </Box>
        );
    }

    return (
    <Container className='weighting'>
        <CompetitorDetails/>
        <Box className='competitors'>
            <Competitors/>
        </Box>
        <Box className='categories'>
            <Categories/>
        </Box>
    </Container>
  );
}

export default Weighting;