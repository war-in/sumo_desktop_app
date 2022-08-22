import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import './Draw.css';
import MaterialTable from "material-table";
import {Box} from "@material-ui/core";
import axios from "axios";

//TODO: competitionId and desktopServerUrl are set as constants for development - this needs to be fixed before deploy
const competitionId = 1;
const desktopServerUrl = "http://localhost:8080/";

//TODO: add generating logic for Buttons and Combat view
//TODO: connect to backend

function Draw() {
    const [categories, setCategories] = useState([]);

    let categoriesToIndexes = {};

    const [state, setState] = useState({buttonsVisible: false, combatsVisible: false});
    const showButtons = () => {
        setState({buttonsVisible: true, combatsVisible: false})
    }
    const showFights = () => {
        setState({buttonsVisible: false, combatsVisible: true})
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(desktopServerUrl + `draw/categories-with-competitors?competitionId=` + competitionId)
                .then(response => {
                    setCategories(response.data)
                })
        }
        fetchData()
    }, []);

    function combatsAlreadyGenerated(category: number) {
        return category > 60;
    }

    function CategoryDetails({categoryId}) {
        const Columns = [
            {"title": undefined, "field": "id"},
            {"title": undefined, "field": "personalDetails.surname"},
            {"title": undefined, "field": "personalDetails.name"},
            {"title": undefined, "field": "country"},
        ]

        //console.log(categoriesToIndexes[categoryId])
        const dataset = categories[categoriesToIndexes[categoryId]].competitors;

        return (
            <Box className="category-details">
                <MaterialTable
                    title=""
                    columns={Columns}
                    data={dataset}
                    options={{
                        header: false,
                        toolbar: false,
                        paging: false,
                        sorting: false
                    }}
                />
            </Box>
        );
    }

    function Categories() {
        const Columns = [
            {"title": "Weight", "field": "category.weightCategory"},
            {"title": "Age", "field": "category.ageCategory.name"},
            {"title": "Sex", "field": "category.sex.sex"},
            {"title": "Nr of competitors", "field": "competitors.length"},
        ]

        useEffect(() => {
            for (let i = 0; i < categories.length; i++) {
                categoriesToIndexes[categories[i].category.id] = i;
            }
        }, []);

        return (
            <Box className="categories">
                <MaterialTable
                    title="Categories"
                    columns={Columns}
                    data={categories}
                    options={{
                        doubleHorizontalScroll: true,
                        maxBodyHeight: 500,
                        search: false,
                        detailPanelType: "single"
                    }}
                    onRowClick={(event, rowData) => {
                        if (rowData == null) return
                        if (combatsAlreadyGenerated(rowData.weight)) {
                            showFights()
                        } else {
                            showButtons()
                        }
                    }}
                    detailPanel={[
                        {
                            tooltip: 'Competitors',
                            render: rowData => {
                                return (
                                    <CategoryDetails categoryId={rowData.category.id}/>
                                )
                            },
                        }
                    ]}
                />
            </Box>
        );
    }

    function GenerateCombatsButton() {
        return (<div>{state.buttonsVisible && <Button className="combat-button" variant="dark" onClick={() => {
            showFights();
        }}>Krzyżówka 15</Button>}</div>);
    }

    function GenerateCombatsButtons() {
        return (
            <Box className="combats">
                <GenerateCombatsButton/>
                <GenerateCombatsButton/>
                <GenerateCombatsButton/>
            </Box>
        );
    }

    function Combat() {
        return (
            <Box className="combat">
                <Row className="detail">Para 1 A</Row>
                <Row className="detail">Para 1 B</Row>
            </Box>
        );
    }

    function Combats() {
        return (
            <div>{state.combatsVisible &&
                <Container className="combats">
                    <Row className="details-card">
                        <Col>
                            <Combat/>
                            <Combat/>
                            <Combat/>
                        </Col>
                        <Col>
                            <Combat/>
                            <Combat/>
                            <Combat/>
                        </Col>
                    </Row>
                </Container>
            }</div>
        );
    }

    return (
        <Container className='draw'>
            <h1 className="title">Draw</h1>
            <Row>
                <Col className="col-6">
                    <Categories/>
                </Col>
                <Col className="col-6">
                    <GenerateCombatsButtons/>
                    <Combats/>
                </Col>
            </Row>
        </Container>
    );
}

export default Draw;