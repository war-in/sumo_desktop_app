import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import {Box, Button, Input} from '@material-ui/core';
import MaterialTable from 'material-table';
import './Weighting.css';
import Competitor from "../../objects/Competitor";
import PersonalDetails from "../../objects/PersonalDetails";
import axios from "axios";

//TODO: competitionId and desktopServerUrl are set as constants for development - this needs to be fixed before deploy
const competitionId = 1;
const desktopServerUrl = "http://localhost:8080/";

//TODO: the 'club' field is missing in data received from the endpoint - add the field or remove club info from front
//TODO: fix: GET for competitor details takes two clicks on row instead of one
//TODO: fix: POST for weighting details takes two button clicks instead of one

function Weighting() {
    const [personalDetails, setPersonalDetails] = useState(() => new PersonalDetails(
        null,
        "",
        "",
        "blank.png",
        "",
        ""));
    const [competitor, setCompetitor] = useState(() => new Competitor(
        null,
        personalDetails,
        "",
        "",
        null));
    const [categories, setCategories] = useState([
        {
            "id": null,
            "ageCategory": {
                "id": null,
                "name": null,
                "oldestCompetitorBirthYear": [
                    null,
                    null,
                    null
                ],
                "youngestCompetitorBirthYear": [
                    null,
                    null,
                    null
                ]
            },
            "weightCategory": null,
            "sex": {
                "sex": null
            }
        }
    ]);
    const [weight, setWeight] = useState(null);
    const [weightingDetails, setWeightingDetails] = useState([]);

    function Competitors() {

        const [competitorsData, setCompetitorsData] = useState([{
            "id": null,
            "personalDetails": {
                "id": null,
                "name": null,
                "surname": null,
                "phoneNumber": null,
                "linkToProfilePicture": undefined,
                "birthDate": [
                    null,
                    null,
                    null
                ],
                "sex": {
                    "sex": null
                }
            },
            "status": null,
            "country": null
        }]);

        const Columns = [
            {"title": "Name", "field": "personalDetails.name"},
            {"title": "Surname", "field": "personalDetails.surname"},
            {"title": "Birth year", "field": "personalDetails.birthDate[0]"},
            {"title": "Country", "field": "country"},
            {"title": "Sex", "field": "personalDetails.sex.sex"}
        ]

        useEffect(() => {
            axios.get(desktopServerUrl + `weighting/competitors?competitionId=` + competitionId)
                .then(response => {
                    setCompetitorsData(response.data);
                })
        }, []);

        return (
            <MaterialTable
                title="Competitors"
                columns={Columns}
                data={competitorsData}
                options={{
                    doubleHorizontalScroll: true,
                    maxBodyHeight: 250
                }}
                onRowClick={async (_event, rowData) => {
                    if (rowData == null) return
                    weightingDetails.length = 0
                    await axios.get(desktopServerUrl + `weighting/categories?competitionId=` + competitionId + `&competitorId=` + rowData.personalDetails.id)
                        .then(response => {
                            setCategories(response.data)
                        })
                    for (const category of categories) {
                        await axios.get(desktopServerUrl + `weighting/weighting-details?categoryAtCompetitionId=` + category.id + `&competitorId=` + rowData.personalDetails.id)
                            .then(response => {
                                weightingDetails.push(response.data)
                                console.log(weightingDetails)
                            })
                    }
                    setWeight(weightingDetails[0].weight)
                    setPersonalDetails(new PersonalDetails(rowData.personalDetails.id,
                        rowData.personalDetails.name, rowData.personalDetails.surname,
                        rowData.personalDetails.linkToProfilePicture, rowData.personalDetails.birthDate[0],
                        rowData.personalDetails.sex.sex
                    ))
                    setCompetitor(new Competitor(rowData.personalDetails.id, personalDetails,
                        rowData.country, "", weight))
                }}
            />
        )
    }

    function Categories() {
        const Columns = [
            {"title": "Age category", "field": "ageCategory.name"},
            {"title": "Sex", "field": "sex.sex"},
            {"title": "Weight category", "field": "weightCategory"},
        ]

        return (
            <Box className="categories">
                <MaterialTable
                    title="Categories"
                    columns={Columns}
                    data={categories}
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
                    <Image className="photo" src={require(`/public/images/${personalDetails.profilePhoto}`).default} />
                </Box>
                <Box>
                    <Row className="detail">{personalDetails.name} {personalDetails.surname}</Row>
                    <Row className="detail">{personalDetails.birthdate}</Row>
                    <Row className="detail">{competitor.country}</Row>
                    <Row className="detail">{competitor.club}</Row>
                    <Row className="detail">{personalDetails.sex}</Row>
                    <Row>Weight:</Row>
                    <Row><Input id="weightInput" className="detail" defaultValue={weight}></Input></Row>
                    <Row className="button">
                        <Button onClick={async () => {
                            setWeight(await document.getElementById("weightInput").value)
                            setCompetitor(new Competitor(competitor.id, personalDetails,
                                competitor.country, competitor.club, weight))
                            for (const wd of weightingDetails) {
                                console.log(weightingDetails)
                                let body = wd
                                body.weight = Number(weight)
                                console.log(body)
                                await axios.post(desktopServerUrl + `weighting/update-weighing-details`, body)
                                    .then(response => console.log(response.data))
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