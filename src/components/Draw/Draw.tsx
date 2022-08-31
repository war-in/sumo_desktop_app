import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import './Draw.css';
import MaterialTable from "material-table";
import {Box} from "@material-ui/core";
import axios from "axios";

//TODO: competitionId, region and desktopServerUrl are set as constants for development - this needs to be fixed before deploy
const competitionId = 10;
const region = "EUROPE";
const desktopServerUrl = "http://localhost:8080/";

let selectedDrawType = {};
let generatedCombats = {};
let categoriesToIndexes = {};

function Draw() {
    const [categories, setCategories] = useState([]);
    const [buttons, setButtons] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const [combats, setCombats] = useState([]);

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
                            selectedDrawType = generatedCombats[rowData.category.id].drawType;
                            setCombats(generatedCombats[rowData.category.id].combats);
                            showCombats();
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
        let displayName;
        if (drawType.numberOfCompetitors == 0) {
            displayName = "Round Robin Draw";
        } else {
            displayName = "Draw for " + drawType.numberOfCompetitors + " competitors";
        }
        return (<div>{state.buttonsVisible && <Button className="combat-button" variant="dark" onClick={async () => {
            let body = {
                competitors: categories[categoriesToIndexes[selectedCategoryId]].competitors,
                drawType: drawType
            }
            await axios.post(desktopServerUrl + `draw`, body)
                .then(response => {
                    selectedDrawType = drawType;
                    setCombats(response.data)
                    showCombats();
                })
        }}>{displayName}</Button>}</div>);
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
                competitors: combats,
                drawType: selectedDrawType,
                categoryAtCompetitionId: selectedCategoryId
            }
            await axios.post(desktopServerUrl + `draw/save-draw`, body)
            generatedCombats[selectedCategoryId] = {combats: combats, drawType: selectedDrawType};
        }}>Save</Button>);
    }

    function CancelButton() {
        return (<Button className="cancel-button" variant="danger" onClick={async () => {
            generatedCombats[selectedCategoryId] = null;
            showButtons()
        }}>Cancel</Button>);
    }

    function Combats() {
        const dragItem = useRef();
        const dragOverItem = useRef();
        const dragStart = (e, position) => {
            dragItem.current = position;
        };
        const dragEnter = (e, position) => {
            dragOverItem.current = position;
        };

        const drop = (e) => {
            const copyCombats = [...combats];
            const dragItemContent = copyCombats[dragItem.current];
            const dragOverItemContent = copyCombats[dragOverItem.current];
            copyCombats.splice(dragItem.current, 1, dragOverItemContent);
            copyCombats.splice(dragOverItem.current, 1, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            setCombats(copyCombats);
        };

        let left = [];
        let right = [];
        if (selectedDrawType.numberOfCompetitors == 0 || selectedDrawType.numberOfCompetitors == 5) {
            for (let i = 0; i < combats.length; i++) {
                left.push(<Box className="combat">
                        <Row className="detail"
                             onDragStart={(e) => dragStart(e, i)}
                             onDragEnter={(e) => dragEnter(e, i)}
                             onDragEnd={drop}
                             draggable>{combats[i] != null && combats[i].personalDetails != null && <>{combats[i].personalDetails.surname} {combats[i].personalDetails.name}</>}</Row>
                    </Box>
                );
            }
        } else if (selectedDrawType.numberOfCompetitors == 10) {
            for (let i = 0; i < combats.length / 2; i++) {
                left.push(<Box className="combat">
                        <Row className="detail"
                             onDragStart={(e) => dragStart(e, i)}
                             onDragEnter={(e) => dragEnter(e, i)}
                             onDragEnd={drop}
                             draggable>{combats[i] != null && combats[i].personalDetails != null && <>{combats[i].personalDetails.surname} {combats[i].personalDetails.name}</>}</Row>
                    </Box>
                );
            }
            for (let i = combats.length / 2; i < combats.length; i++) {
                right.push(<Box className="combat">
                        <Row className="detail"
                             onDragStart={(e) => dragStart(e, i)}
                             onDragEnter={(e) => dragEnter(e, i)}
                             onDragEnd={drop}
                             draggable>{combats[i] != null && combats[i].personalDetails != null && <>{combats[i].personalDetails.surname} {combats[i].personalDetails.name}</>}</Row>
                    </Box>
                );
            }
        } else {
            for (let i = 0; i < combats.length / 2; i += 2) {
                left.push(<Box className="combat">
                    <Row className="detail"
                         onDragStart={(e) => dragStart(e, i)}
                         onDragEnter={(e) => dragEnter(e, i)}
                         onDragEnd={drop}
                         draggable>{combats[i] != null && combats[i].personalDetails != null && <>{combats[i].personalDetails.surname} {combats[i].personalDetails.name}</>}</Row>
                    <Row className="detail"
                         onDragStart={(e) => dragStart(e, i + 1)}
                         onDragEnter={(e) => dragEnter(e, i + 1)}
                         onDragEnd={drop}
                         draggable>{combats[i + 1] != null && combats[i + 1].personalDetails != null && <>{combats[i + 1].personalDetails.surname} {combats[i + 1].personalDetails.name}</>}</Row>
                </Box>);
            }
            for (let i = combats.length / 2; i < combats.length; i += 2) {
                right.push(<Box className="combat">
                    <Row className="detail"
                         onDragStart={(e) => dragStart(e, i)}
                         onDragEnter={(e) => dragEnter(e, i)}
                         onDragEnd={drop}
                         draggable>{combats[i] != null && combats[i].personalDetails != null && <>{combats[i].personalDetails.surname} {combats[i].personalDetails.name}</>}</Row>
                    <Row className="detail"
                         onDragStart={(e) => dragStart(e, i + 1)}
                         onDragEnter={(e) => dragEnter(e, i + 1)}
                         onDragEnd={drop}
                         draggable>{combats[i + 1] != null && combats[i + 1].personalDetails != null && <>{combats[i + 1].personalDetails.surname} {combats[i + 1].personalDetails.name}</>}</Row>
                </Box>);
            }
        }

        return (
            <div>{state.combatsVisible &&
                <div>
                    <Container className="combats">
                        <Row className="details-card">
                            <Col>
                                <>
                                    {left}
                                </>
                            </Col>
                            <Col>
                                <>
                                    {right}
                                </>
                            </Col>
                        </Row>
                    </Container>
                    <SaveCombatsButton/>
                    <CancelButton/>
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