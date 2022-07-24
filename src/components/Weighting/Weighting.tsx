import React, {useState} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import {Box, Button, Input} from '@material-ui/core';
import MaterialTable from 'material-table';
import './Weighting.css';
// @ts-ignore
import declared from '../../mocks/Competitors.json';
import Competitor from "../../objects/Competitor";
import PersonalDetails from "../../objects/PersonalDetails";
import Category from "../../objects/Category";

function Weighting() {
    const [personalDetails, setPersonalDetails] = useState(() => new PersonalDetails(
            0,
            "",
            "",
            "",
            "",
            ""));
    const [category, setCategory] = useState(() => new Category(
        "",
        "",
        ""));
    const [competitor, setCompetitor] = useState(() => new Competitor(
        0,
        personalDetails,
        category,
        null));

    let weightInputValue: 0;

    function updateWeightInputValue(evt) {
        weightInputValue = evt.target.value
    }

    function Competitors() {
        const Columns = [
            {"title": "Imię", "field": "personalDetails.name"},
            {"title": "Nazwisko", "field": "personalDetails.surname"},
            {"title": "Data urodzenia", "field": "personalDetails.birthdate"},
            {"title": "Kraj", "field": "country.name"},
            {"title": "Klub", "field": "club"},
            {"title": "Płeć", "field": "personalDetails.sex"}
        ]

        return (
            <MaterialTable
                title="Zawodnicy"
                columns={Columns}
                data={declared}
                options={{
                    doubleHorizontalScroll: true,
                    maxBodyHeight: 250
                }}
                onRowClick={(event, rowData) => {
                    if (rowData != null) {
                        setPersonalDetails(new PersonalDetails(0,
                            rowData.personalDetails.name, rowData.personalDetails.surname,
                            rowData.personalDetails.profilePhoto, rowData.personalDetails.birthdate,
                            rowData.personalDetails.sex
                        ))
                        setCategory(new Category(rowData.personalDetails.birthdate,
                            rowData.personalDetails.sex, rowData.category))
                        setCompetitor(new Competitor(0, personalDetails, category, null))
                    }
                }}
            />
        )
    }

    function Categories() {
        const Columns = [
            {"title": "Grupa wiekowa", "field": "age"},
            {"title": "Płeć", "field": "sex"},
            {"title": "Kategoria wagowa", "field": "category"},
        ]

        const dataset = [{
            age: category.age,
            sex: category.sex,
            category: category.weight
        }];

        return (
            <Box className="categories">
                <MaterialTable
                    title="Kategorie"
                    columns={Columns}
                    data={dataset}
                    options={{
                        search: false,
                        maxBodyHeight: 150
                    }}
                />
            </Box>
        )
    }

    function CompetitorDetails() {
        return (
            <Box className="details-card">
                <Box className="photo-box">
                    <Image className="photo" src={personalDetails.profilePhoto}/>
                </Box>
                <Box>
                    <Row className="detail">{personalDetails.name} {personalDetails.surname}</Row>
                    <Row className="detail">{personalDetails.birthdate}</Row>
                    <Row className="detail">Club</Row>
                    <Row className="detail">Country</Row>
                    <Row className="detail">{personalDetails.sex}</Row>
                    <Row>Weight:</Row>
                    <Row><Input className="detail" defaultValue={competitor.weight}
                                onChange={updateWeightInputValue}></Input></Row>
                    <Row className="button">
                        <Button onClick={() => {
                            if (weightInputValue != 0) {
                                setCompetitor(new Competitor(0, personalDetails, category, weightInputValue))
                                // tu powinno być zapisanie wagi konkretnego zawodnika w jakiejś strukturze,
                                // żeby dało się ją potem pobrać
                            }
                        }}>OK</Button>
                    </Row>
                </Box>
            </Box>
        );
    }

    return (
        <Container className="weighting">
            <h1 className="title">Competitors weighting</h1>
            <Row>
                <Col className="col-3">
                    {<CompetitorDetails/>}
                </Col>
                <Col className="col-8">
                    {<Competitors/>}
                    {<Categories/>}
                </Col>
            </Row>
        </Container>
    );
}

export default Weighting;