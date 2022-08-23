import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import './Draw.css';
import MaterialTable from "material-table";
import {Box} from "@material-ui/core";
import axios from "axios";

//TODO: competitionId, region and desktopServerUrl are set as constants for development - this needs to be fixed before deploy
const competitionId = 1;
const region = "EUROPE";
const desktopServerUrl = "http://localhost:8080/";

function Draw() {
    const [categories, setCategories] = useState([]);
    const [buttons, setButtons] = useState([]);
    const [combats, setCombats] = useState([[], []]);
    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const [selectedDrawType, setSelectedDrawType] = useState();
    const [generatedCombats, setGeneratedCombats] = useState({});

    let categoriesToIndexes = {};

    const [state, setState] = useState({buttonsVisible: false, combatsVisible: false});
    const showButtons = () => {
        setState({buttonsVisible: true, combatsVisible: false})
    }
    const showCombats = () => {
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

    function combatsAlreadyGenerated(categoryId: number) {
        return generatedCombats[categoryId] != null;
    }

    function CategoryDetails({categoryId}) {
        const Columns = [
            {"title": undefined, "field": "id"},
            {"title": undefined, "field": "personalDetails.surname"},
            {"title": undefined, "field": "personalDetails.name"},
            {"title": undefined, "field": "country"},
        ]

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
                    onRowClick={async (event, rowData) => {
                        if (rowData == null) return
                        if (combatsAlreadyGenerated(rowData.category.id)) {
                            setCombats(generatedCombats[rowData.category.id])
                            showCombats()
                        } else {
                            setSelectedCategoryId(rowData.category.id)
                            await axios.get(desktopServerUrl + `draw/suggested-draw-types?numberOfCompetitors=` + rowData.competitors.length + `&region=` + region)
                                .then(response => {
                                    setButtons(response.data)
                                })
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

    function GenerateCombatsButton({drawType}) {
        return (<div>{state.buttonsVisible && <Button className="combat-button" variant="dark" onClick={async () => {
            let body = {
                competitors: categories[categoriesToIndexes[selectedCategoryId]].competitors,
                drawType: drawType
            }
            await axios.post(desktopServerUrl + `draw`, body)
                .then(response => {
                    setCombats(response.data)
                })
            setSelectedDrawType(drawType);
            showCombats();
        }}>Draw for {drawType.numberOfCompetitors} competitors</Button>}</div>);
    }

    function GenerateCombatsButtons() {
        let buttonsList = [];
        buttons.forEach((button) => {
            buttonsList.push(<GenerateCombatsButton drawType={button}/>)
        })
        return (
            <Box className="combats">
                {buttonsList}
            </Box>
        );
    }

    function SaveCombatsButton() {
        return (<Button className="save-button" variant="dark" onClick={async () => {
            let body = {
                competitors: categories[categoriesToIndexes[selectedCategoryId]].competitors,
                drawType: selectedDrawType,
                categoryAtCompetitionId: selectedCategoryId
            }
            await axios.post(desktopServerUrl + `draw/save-draw`, body)
            generatedCombats[selectedCategoryId] = combats;
        }}>Save</Button>);
    }

    function Combat({combat}) {
        return (
            <Box className="combat">
                <Row
                    className="detail">{combat[0].personalDetails != null && <>{combat[0].personalDetails.surname} {combat[0].personalDetails.name}</>}</Row>
                <Row
                    className="detail">{combat[1].personalDetails != null && <>{combat[1].personalDetails.surname} {combat[1].personalDetails.name}</>}</Row>
            </Box>
        );
    }

    //TODO: combats generation working for all draw types
    function Combats() {
        let leftList = [];
        let rightList = [];
        for (const element of combats[0]) {
            for (const x of element) {
                leftList.push(<Combat combat={x}/>)
            }
        }
        for (const element of combats[1]) {
            for (const x of element) {
                rightList.push(<Combat combat={x}/>)
            }
        }
        return (
            <div>{state.combatsVisible &&
                <div>
                    <Container className="combats">
                        <Row className="details-card">
                            <Col>
                                {leftList}
                            </Col>
                            <Col>
                                {rightList}
                            </Col>
                        </Row>
                    </Container>
                    <SaveCombatsButton/>
                </div>
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