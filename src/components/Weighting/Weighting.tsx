import React, {useState} from 'react';
import {Container, Image, Row} from 'react-bootstrap';
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
            <Box className='competitors'>
                <MaterialTable
                    title="Zawodnicy"
                    columns={Columns}
                    data={declared}
                    options={{
                        doubleHorizontalScroll: true,
                        maxBodyHeight: 300
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
            </Box>
        )
    }

    function Categories() {
        const Columns = [
            {"title": "Grupa wiekowa", "field": "age"},
            {"title": "Płeć", "field": "sex"},
            {"title": "Kategoria wagowa", "field": "category"},
        ]

        const dataset = [{age: competitor.birthdate,
            sex: competitor.sex,
            category: competitor.category}];

        return (
            <Box className='categories'>
                <MaterialTable
                    title="Kategorie"
                    columns={Columns}
                    data={dataset}
                    options={{
                        search: false,
                        maxBodyHeight: 275
                    }}
                />
            </Box>
        )
    }

    function CompetitorDetails() {

        return (
            <Box className="details-card">
                <Image className="photo" src={competitor.photo}/>
                <Box className="details">
                    <Row className="detail"><Box
                        className="detail-text">{competitor.name}</Box></Row>
                    <Row className="detail"><Box className="detail-text">{competitor.birthdate}</Box></Row>
                    <Row className="detail"><Box
                        className="detail-text">{competitor.country}</Box></Row>
                    <Row className="detail"><Box
                        className="detail-text">{competitor.club}</Box></Row>
                    <Row className="detail"><Box className="detail-text">{competitor.sex}</Box></Row>
                    <Box className="weight-label">Weight:</Box>
                    <Row className="detail">
                        <Input className="weight-input" defaultValue={competitor.weight} onChange={updateWeightInputValue}></Input>
                    </Row>
                    <Row className="detail"><Button onClick={() => {
                        if (weightInputValue!=""){
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
                    }}>OK</Button></Row>
                </Box>
            </Box>
        );
    }

    return (
        <Container className='weighting'>
            <CompetitorDetails/>
            <Competitors/>
            <Categories/>
        </Container>
    );
}

export default Weighting;