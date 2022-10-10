import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import {Box, Button, Input} from '@material-ui/core';
import MaterialTable from 'material-table';
import './Weighting.css';
import Competitor from "../../objects/Competitor";
import PersonalDetails from "../../objects/PersonalDetails";
import axios from "axios";

//TODO: competitionId and desktopServerUrl are set as constants for development - this needs to be fixed before deploy
const competitionId = 10;
const desktopServerUrl = "http://localhost:8080/";

//TODO: the 'club' field is missing in data received from the endpoint - add the field or remove club info from front

type PersonalDetailsType = {
    id: number,
    name: string,
    surname: string,
    phoneNumber: string,
    linkToProfilePicture: string,
    birthDate: [
        number,
        number,
        number
    ],
    sex: {
        sex: string
    }
}

type CompetitorType = {
    id: number,
    personalDetails: PersonalDetailsType,
    status: string,
    country: string
}

type CategoryType = {
    id: number,
    ageCategory: {
        id: number,
        name: string,
        oldestCompetitorBirthYear: [
            number,
            number,
            number
        ],
        youngestCompetitorBirthYear: [
            number,
            number,
            number
        ]
    },
    weightCategory: string,
    sex: {
        sex: string
    }
}

type WeightingDetailsType = {
    id: number,
    registration: {
        id: number,
        categoryAtCompetition: {
            id: number,
            competition: {
                id: number,
                idFromServer: number,
                name: string,
                city: string,
                startDate: string,
                endDate: string,
                type: {
                    type: string
                }
            },
            category: CategoryType,
            date: string
        },
        competitor: CompetitorType
    }
    weight: number,
    date: string
}

function Weighting() {

    const [personalDetails, setPersonalDetails] = useState(() => new PersonalDetails(
        0,
        "",
        "",
        "blank.png",
        "",
        ""));
    const [competitor, setCompetitor] = useState(() => new Competitor(
        0,
        personalDetails,
        "",
        "",
        0));
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [weight, setWeight] = useState<number>(0);
    const [weightingDetails, setWeightingDetails] = useState<WeightingDetailsType[]>([]);
    const [competitorsData, setCompetitorsData] = useState<CompetitorType[]>([]);

    let dict: { [key: number]: { categories: CategoryType[], weightDetails: WeightingDetailsType[] } } = {};

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(desktopServerUrl + `weighting/competitors?competitionId=` + competitionId)
                .then(response => {
                    setCompetitorsData(response.data);
                })
        }
        fetchData()
    }, []);

    function Competitors() {

        useEffect(() => {
            const fetchData = async () => {
                for (const comp of competitorsData) {
                    let cat: CategoryType[] = [];
                    await axios.get(desktopServerUrl + `weighting/categories?competitionId=` + competitionId + `&competitorId=` + comp.personalDetails.id)
                        .then(response => {
                            cat = response.data;
                        })
                    let wd: WeightingDetailsType[] = [];
                    for (const category of cat) {
                        await axios.get(desktopServerUrl + `weighting/weighting-details?categoryAtCompetitionId=` + category.id + `&competitorId=` + comp.personalDetails.id)
                            .then(response => {
                                wd.push(response.data)
                            }).catch(e => {
                                console.log(e)
                            })
                    }
                    dict[comp.personalDetails.id] = {categories: cat, weightDetails: wd}
                }
            }
            fetchData()
        }, []);

        const Columns = [
            {"title": "Name", "field": "personalDetails.name"},
            {"title": "Surname", "field": "personalDetails.surname"},
            {"title": "Birth year", "field": "personalDetails.birthDate[0]"},
            {"title": "Country", "field": "country"},
            {"title": "Sex", "field": "personalDetails.sex.sex"}
        ]

        return (
            <MaterialTable
                title="Competitors"
                columns={Columns}
                data={competitorsData}
                options={{
                    doubleHorizontalScroll: true,
                    maxBodyHeight: 250,
                    grouping: true,
                }}
                onRowClick={(_event, rowData: CompetitorType) => {
                    if (rowData == null) return
                    setCategories(dict[rowData.personalDetails.id].categories);
                    setWeightingDetails(dict[rowData.personalDetails.id].weightDetails);
                    setWeight(dict[rowData.personalDetails.id].weightDetails[0].weight);
                    setPersonalDetails(new PersonalDetails(rowData.personalDetails.id,
                        rowData.personalDetails.name, rowData.personalDetails.surname,
                        rowData.personalDetails.linkToProfilePicture, rowData.personalDetails.birthDate[0].toString(),
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

        function showImage() {
            let fileExists = true;
            try {
                require(`/public/images/${personalDetails.profilePhoto}`);
            } catch {
                fileExists = false;
            }
            return fileExists;
        }

        return (
            <Box className="details-card">
                <Box className="photo-box">
                    {
                        showImage() ?
                            (<Image className="photo"
                                    src={require(`/public/images/${personalDetails.profilePhoto}`).default}/>) :
                            (<Image className="photo" src={require(`/public/images/blank.png`).default}/>)
                    }
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
                            let w = Number(await document.getElementById("weightInput").value);
                            for (const wd of weightingDetails) {
                                let body = wd
                                body.weight = w
                                await axios.post(desktopServerUrl + `weighting/update-weighing-details`, body)
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