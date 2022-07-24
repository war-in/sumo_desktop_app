import React, {useState} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import {Box, Button, Input} from '@material-ui/core';
import MaterialTable from 'material-table';
import './Weighting.css';
import Competitor from "../../objects/Competitor";
import PersonalDetails from "../../objects/PersonalDetails";
import Category from "../../objects/Category";
// @ts-ignore
import declared from '../../mocks/Competitors.json';

function Weighting() {
    const [personalDetails, setPersonalDetails] = useState(() => new PersonalDetails(
        null,
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
        null,
        personalDetails,
        "",
        "",
        category,
        null));

    let weightInputValue: 0;

    function updateWeightInputValue(evt) {
        weightInputValue = evt.target.value
    }

    function Competitors() {
        const Columns = [
            {"title": "Name", "field": "personalDetails.name"},
            {"title": "Surname", "field": "personalDetails.surname"},
            {"title": "Birthdate", "field": "personalDetails.birthdate"},
            {"title": "Country", "field": "country.name"},
            {"title": "Club", "field": "club"},
            {"title": "Sex", "field": "personalDetails.sex"}
        ]

        return (
            <MaterialTable
                title="Competitors"
                columns={Columns}
                data={declared}
                options={{
                    doubleHorizontalScroll: true,
                    maxBodyHeight: 250
                }}
                onRowClick={(event, rowData) => {
                    if (rowData == null) return
                    setPersonalDetails(new PersonalDetails(rowData.personalDetails.id,
                        rowData.personalDetails.name, rowData.personalDetails.surname,
                        rowData.personalDetails.profilePhoto, rowData.personalDetails.birthdate,
                        rowData.personalDetails.sex
                    ))
                    setCategory(new Category(rowData.personalDetails.birthdate,
                        rowData.personalDetails.sex, rowData.category))
                    setCompetitor(new Competitor(rowData.personalDetails.id, personalDetails,
                        rowData.country.name, rowData.club, category, null))
                }}
            />
        )
    }

    function Categories() {
        const Columns = [
            {"title": "Age category", "field": "age"},
            {"title": "Sex", "field": "sex"},
            {"title": "Weight category", "field": "category"},
        ]

        const dataset = [{
            age: category.age,
            sex: category.sex,
            category: category.weight
        }];

        return (
            <Box className="categories">
                <MaterialTable
                    title="Categories"
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
                    <Row className="detail">{competitor.country}</Row>
                    <Row className="detail">{competitor.club}</Row>
                    <Row className="detail">{personalDetails.sex}</Row>
                    <Row>Weight:</Row>
                    <Row><Input className="detail" defaultValue={competitor.weight}
                                onChange={updateWeightInputValue}></Input></Row>
                    <Row className="button">
                        <Button onClick={() => {
                            if (weightInputValue != 0) {
                                setCompetitor(new Competitor(competitor.id, personalDetails,
                                    competitor.country, competitor.club, category, weightInputValue))
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