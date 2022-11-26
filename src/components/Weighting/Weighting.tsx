import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Image, Modal, ModalBody, ModalFooter, ModalHeader, Row, Form} from 'react-bootstrap';
import {Box, Input} from '@material-ui/core';
import MaterialTable, {MTableToolbar} from 'material-table';
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

let pageIndex = 1;
let isCompetitorWeighed: { [key: number]: boolean } = {};

function Weighting() {

    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>();
    const [competitor, setCompetitor] = useState<Competitor>();
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [weight, setWeight] = useState<number>(0);
    const [weightingDetails, setWeightingDetails] = useState<WeightingDetailsType[]>([]);
    const [competitorsData, setCompetitorsData] = useState<CompetitorType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const inputRef = useRef<HTMLInputElement | null>(null);
    const selectCatRef = useRef<HTMLSelectElement | null>(null);

    const [categoriesToChoseFrom, setCategoriesToChoseFrom] = useState<CategoryType[]>([]);

    let categoriesAndWeightingDetailsByCompetitorId: { [key: number]: { categories: CategoryType[], weightDetails: WeightingDetailsType[] } } = {};

    const fetchCategoriesData = async (id: number) => {
        const {data} = await axios.get(desktopServerUrl + `weighting/categories?competitionId=` + competitionId + `&competitorId=` + id)
        return data;
    }
    const fetchWeightingData = async (categoryId: number, competitorId: number) => {
        const {data} = await axios.get(desktopServerUrl + `weighting/weighting-details?categoryAtCompetitionId=` + categoryId + `&competitorId=` + competitorId)
        return data;
    }
    const fetchDataForCompetitor = async (id: number) => {
        let fetchedCategories: CategoryType[] = [];
        await fetchCategoriesData(id).then(data => fetchedCategories = data)
        let fetchedWeightingDetails: WeightingDetailsType[] = [];
        for (const category of fetchedCategories) {
            await fetchWeightingData(category.id, id).then(data => fetchedWeightingDetails.push(data));
        }
        return {
            categories: fetchedCategories,
            weightDetails: fetchedWeightingDetails
        }
    }

    const saveCategory = () => {
        const add = async () => {
            await axios.post(desktopServerUrl + `/weighting/addRegistration?competitorId=`
                + personalDetails!.id + `&categoryAtCompetitionId=` + selectCatRef.current!.value);
        }
        add().then(() => {
            fetchDataForCompetitor(personalDetails!.id).then(data => {
                categoriesAndWeightingDetailsByCompetitorId[personalDetails!.id] = data;
                let categoriesAndWeightingDetails = categoriesAndWeightingDetailsByCompetitorId[personalDetails!.id];
                setCategories(categoriesAndWeightingDetails.categories);
                setWeightingDetails(categoriesAndWeightingDetails.weightDetails);
                selectCatRef.current = null;
                setIsModalOpen(false)
            })
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(desktopServerUrl + `weighting/competitors?competitionId=` + competitionId)
            return data;
        }
        const sessionStorageData = sessionStorage.getItem("competitorsData");
        if (sessionStorageData) {
            setCompetitorsData(JSON.parse(sessionStorageData));
        } else {
            fetchData().then(data => {
                setCompetitorsData(data);
                sessionStorage.setItem("competitorsData", JSON.stringify(data));
            })
        }
    }, []);

    function Competitors() {
        useEffect(() => {
            const fetchData = () => {
                for (const comp of competitorsData) {
                    fetchDataForCompetitor(comp.personalDetails.id).then(data => {
                        categoriesAndWeightingDetailsByCompetitorId[comp.personalDetails.id] = data
                    })
                }
            }
            fetchData()
        }, []);

        const Columns = [
            {"title": "Name", "field": "personalDetails.name"},
            {"title": "Surname", "field": "personalDetails.surname"},
            {"title": "Birth year", "field": "personalDetails.birthDate[0]"},
            {"title": "Country", "field": "country"},
            {"title": "Sex", "field": "personalDetails.sex.sex"},
            {
                title: "", field: "", render: (rowData: CompetitorType) => {
                    if (isCompetitorWeighed[rowData.personalDetails.id]) {
                        return <img src={require(`/public/images/check.svg.png`).default}
                                    style={{width: 25, borderRadius: '50%'}} alt=""/>
                    } else {
                        return <></>
                    }
                }
            }
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
                    initialPage: pageIndex
                }}
                onChangePage={(page) => {
                    pageIndex = page;
                }}
                onRowClick={(_event, rowData?: CompetitorType) => {
                    if (rowData == null) return
                    let categoriesAndWeightingDetails = categoriesAndWeightingDetailsByCompetitorId[rowData.personalDetails.id]
                    if (categoriesAndWeightingDetails == null) return
                    setCategories(categoriesAndWeightingDetails.categories);
                    setWeightingDetails(categoriesAndWeightingDetails.weightDetails);
                    setWeight(categoriesAndWeightingDetails.weightDetails[0].weight);
                    setPersonalDetails(new PersonalDetails(rowData.personalDetails.id,
                        rowData.personalDetails.name, rowData.personalDetails.surname,
                        rowData.personalDetails.linkToProfilePicture, rowData.personalDetails.birthDate[0].toString(),
                        rowData.personalDetails.sex.sex
                    ))
                    setCompetitor(new Competitor(rowData.personalDetails.id, personalDetails!,
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
            {
                title: "", field: "", render: (rowData: CategoryType) => {
                    return <img src={require(`/public/images/trash.png`).default}
                                style={{width: 25}} alt=""
                                onClick={() => {
                                    const remove = async () => {
                                        await axios.delete(desktopServerUrl + `/weighting/removeRegistration?competitorId=`
                                            + personalDetails!.id + `&categoryAtCompetitionId=` + rowData.id);
                                    }
                                    remove().then(() => {
                                        fetchDataForCompetitor(personalDetails!.id).then(data => {
                                            categoriesAndWeightingDetailsByCompetitorId[personalDetails!.id] = data;
                                            let categoriesAndWeightingDetails = categoriesAndWeightingDetailsByCompetitorId[personalDetails!.id];
                                            setCategories(categoriesAndWeightingDetails.categories);
                                            setWeightingDetails(categoriesAndWeightingDetails.weightDetails);
                                        })
                                    })
                                }}/>
                }
            }
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
                    components={{
                        Toolbar: props => (
                            <Row>
                                <Col>
                                    <MTableToolbar {...props}/>
                                </Col>
                                <Col>
                                    <div style={{ padding: "10px 10px", textAlign: "right" }}>
                                        <Button variant="secondary" onClick={() => {
                                            const fetchData = async () => {
                                                const {data} = await axios.get(desktopServerUrl + `weighting/getAvailableCategoriesForCompetitor?competitionId=`
                                                    + competitionId + `&competitorId=` + personalDetails!.id)
                                                return data;
                                            }
                                            fetchData().then(data => {
                                                console.log(data)
                                                let categoriesList: CategoryType[] = [];
                                                for (const ct of data) {
                                                    categoriesList.push(ct.category);
                                                }
                                                setCategoriesToChoseFrom(categoriesList);
                                                setIsModalOpen(true);
                                            })
                                        }}>+</Button>
                                    </div>
                                </Col>
                            </Row>
                        ),
                    }}
                />
            </Box>
        )
    }

    function CompetitorDetails() {

        function showImage() {
            let fileExists = true;
            try {
                require(`/public/images/${personalDetails!.profilePhoto}`);
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
                                    src={require(`/public/images/${personalDetails!.profilePhoto}`).default}/>) :
                            (<Image className="photo" src={require(`/public/images/blank.png`).default}/>)
                    }
                </Box>
                <Box>
                    <Row
                        className="detail">{personalDetails && personalDetails.name} {personalDetails && personalDetails.surname}</Row>
                    <Row className="detail">{personalDetails && personalDetails.birthdate}</Row>
                    <Row className="detail">{competitor && competitor.country}</Row>
                    <Row className="detail">{competitor && competitor.club}</Row>
                    <Row className="detail">{personalDetails && personalDetails.sex}</Row>
                    <Row>Weight:</Row>
                    <Row><Input id="weightInput" className="detail" defaultValue={weight} ref={inputRef}></Input></Row>
                    <Row className="button">
                        <Button variant="light" onClick={async () => {
                            const inputValue = inputRef.current?.children[0] as HTMLInputElement
                            if (inputValue == null) return
                            for (const wd of weightingDetails) {
                                let body = {
                                    categoryAtCompetitionId: wd.registration.categoryAtCompetition.id,
                                    competitorId: competitor?.id,
                                    weight: Number(inputValue.value)
                                }
                                await axios.post(desktopServerUrl + `weighting/update-weighting-details`, body)
                            }
                            isCompetitorWeighed[competitor!.id!] = true;
                        }}>OK</Button>
                    </Row>
                </Box>
            </Box>
        );
    }

    function CategoryModal() {

        return (
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <ModalHeader closeButton>
                    <h4>Add category</h4>
                </ModalHeader>
                <ModalBody>
                    <div className={'d-flex justify-content-center align-items-center'}>
                        <Form.Group className={'d-flex justify-content-center flex-column'}>
                            <Form.Label>Choose category</Form.Label>
                            <select ref={selectCatRef}>
                                {categoriesToChoseFrom.map((category) => (
                                    <option value={category.id}>{category.ageCategory.name}, {category.weightCategory}</option>
                                ))}
                            </select>
                        </Form.Group>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className={'cancel-btn'} onClick={() => {
                        setIsModalOpen(false)
                    }}>Cancel</Button>
                    <Button onClick={saveCategory} className={'save-btn'}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }

    return (
        <>
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
            <CategoryModal/>
        </>
    );
}

export default Weighting;