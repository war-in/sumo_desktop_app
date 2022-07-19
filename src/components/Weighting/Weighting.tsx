import React, {useState} from 'react';
import {Container, Image, Row} from 'react-bootstrap';
import {Box, Button, Input} from '@material-ui/core';
import MaterialTable from 'material-table';
import './Weighting.css';
// @ts-ignore
import declared from '../../mocks/Competitors.json';

function Weighting() {
    const [competitor, setCompetitor] = useState({
        name: " ",
        birthdate: " ",
        country: " ",
        club: " ",
        sex: " ",
        photo: "https://exnessin.com/img/avatar-blank.png"
    });

    function Competitors() {
        const Columns = [
            {"title": "Imię", "field": "personalDetails.names"},
            {"title": "Nazwisko", "field": "personalDetails.surname"},
            {"title": "Kraj", "field": "country.name"},
            {"title": "Kategoria", "field": "category"}
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
                                name: rowData.personalDetails.names,
                                birthdate: rowData.personalDetails.birthDate,
                                country: rowData.country.name,
                                club: rowData.personalDetails.phoneNumber,
                                sex: rowData.personalDetails.gender,
                                photo: rowData.personalDetails.profilePhoto
                            })
                        }
                    }}
                />
            </Box>
        )
    }

    function Categories() {
        const Columns = [
            {"title": "Grupa wiekowa", "field": "personalDetails.names"},
            {"title": "Płeć", "field": "personalDetails.surname"},
            {"title": "Kategoria", "field": "category"},
        ]

        const dataset = [{}];

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
                    <Row className="detail"><Input className="weight-input"></Input></Row>
                    <Row className="detail"><Button>OK</Button></Row>
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