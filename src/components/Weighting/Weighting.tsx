import React, {useState} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import {Box, Button, Input} from '@material-ui/core';
import MaterialTable from 'material-table';
import './Weighting.css';
// @ts-ignore
import declared from '../../mocks/Competitors.json';

function Weighting() {
    const [competitor, setCompetitor] = useState({
        name: "",
        birthdate: "",
        country: "",
        club: "",
        sex: "",
        photo: "",
        category: "",
        weight: ""
    });

    let weightInputValue = "";

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
                        setCompetitor({
                            name: rowData.personalDetails.name + " " + rowData.personalDetails.surname,
                            birthdate: rowData.personalDetails.birthdate,
                            country: rowData.country.name,
                            club: rowData.club,
                            sex: rowData.personalDetails.sex,
                            photo: rowData.personalDetails.profilePhoto,
                            category: rowData.category,
                            //tu powinno być pobranie wartości wagi, jesli została już wprowadzona wcześniej
                            //dla danego zawodnika
                            weight: ""
                        })
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
            age: competitor.birthdate,
            sex: competitor.sex,
            category: competitor.category
        }];

        return (
            <Box className="categories">
                <MaterialTable
                    title="Kategorie"
                    columns={Columns}
                    data={dataset}
                    options={{
                        search: false,
                        maxBodyHeight: 200
                    }}
                />
            </Box>
        )
    }

    function CompetitorDetails() {
        return (
            <Box className="details-card">
                <Box className="photo-box">
                    <Image className="photo" src={competitor.photo}/>
                </Box>
                <Box>
                    <Row className="detail">{competitor.name}</Row>
                    <Row className="detail">{competitor.birthdate}</Row>
                    <Row className="detail">{competitor.country}</Row>
                    <Row className="detail">{competitor.club}</Row>
                    <Row className="detail">{competitor.sex}</Row>
                    <Row>Weight:</Row>
                    <Row><Input className="detail" defaultValue={competitor.weight}
                                onChange={updateWeightInputValue}></Input></Row>
                    <Row className="button">
                        <Button onClick={() => {
                            if (weightInputValue != "") {
                                setCompetitor({
                                    name: competitor.name,
                                    birthdate: competitor.birthdate,
                                    country: competitor.country,
                                    club: competitor.club,
                                    sex: competitor.sex,
                                    photo: competitor.photo,
                                    category: competitor.category,
                                    weight: weightInputValue
                                })
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
            <Row>
                <Col className="col-3">
                    <CompetitorDetails/>
                </Col>
                <Col className="col-8">
                    <Competitors/>
                    <Categories/>
                </Col>
            </Row>
        </Container>
    );
}

export default Weighting;