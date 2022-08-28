import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import './Draw.css';
import MaterialTable from "material-table";
import {Box} from "@material-ui/core";
import axios from "axios";

//TODO: competitionId, region and desktopServerUrl are set as constants for development - this needs to be fixed before deploy
const competitionId = 1;
const region = "EUROPE";
const desktopServerUrl = "http://localhost:8080/";

let selectedDrawType = {};
let generatedCombats = {};
let combats = {};
let categoriesToIndexes = {};


function Draw() {
    const [categories, setCategories] = useState([]);
    const [buttons, setButtons] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const [lists, setLists] = useState({leftList: [], rightList: []})

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

    function arrangeCombats() {
        let l = []
        let r = []
        if (selectedDrawType != null) {
            if (selectedDrawType.numberOfCompetitors == 5) {
                l.push([combats[0][0], combats[0][1]])
                r.push([combats[0][2], combats[0][3]])
                l.push([combats[0][4], null])
            }
            if (selectedDrawType.numberOfCompetitors == 10) {
                l.push([combats[0][0], combats[0][1]])
                l.push([combats[0][2], combats[0][3]])
                l.push([combats[0][4], null])
                r.push([combats[1][0], combats[1][1]])
                r.push([combats[1][2], combats[1][3]])
                r.push([combats[1][4], null])
            }
            if (selectedDrawType.numberOfCompetitors == 16) {
                let index = 0;
                for (const element of combats[0]) {
                    for (const x of element) {
                        l.push(x)
                        index = index + 2;
                    }
                }
                for (const element of combats[1]) {
                    for (const x of element) {
                        r.push(x)
                        index = index + 2;
                    }
                }
            }
            if (selectedDrawType.numberOfCompetitors == 32) {
                let index = 0;
                for (const element of combats[0]) {
                    for (const x of element) {
                        for (const y of x) {
                            l.push(y)
                            index = index + 2;
                        }
                    }
                }
                for (const element of combats[1]) {
                    for (const x of element) {
                        for (const y of x) {
                            r.push(y)
                            index = index + 2;
                        }
                    }
                }
            }
            if (selectedDrawType.numberOfCompetitors == 64) {
                let index = 0;
                for (const element of combats[0]) {
                    for (const x of element) {
                        for (const y of x) {
                            for (const z of y) {
                                l.push(z)
                                index = index + 2;
                            }
                        }
                    }
                }
                for (const element of combats[1]) {
                    for (const x of element) {
                        for (const y of x) {
                            for (const z of y) {
                                r.push(z)
                                index = index + 2;
                            }
                        }
                    }
                }
            }
        }
        setLists({leftList: l, rightList: r})
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
                            combats = generatedCombats[rowData.category.id].combats;
                            arrangeCombats();
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
        return (<div>{state.buttonsVisible && <Button className="combat-button" variant="dark" onClick={async () => {
            selectedDrawType = null;
            let body = {
                competitors: categories[categoriesToIndexes[selectedCategoryId]].competitors,
                drawType: drawType
            }
            await axios.post(desktopServerUrl + `draw`, body)
                .then(response => {
                    combats = response.data;
                    selectedDrawType = drawType;
                    arrangeCombats();
                    showCombats();
                })
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
            generatedCombats[selectedCategoryId] = { combats: combats, drawType: selectedDrawType };
        }}>Save</Button>);
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
            const copyLeftList = [...lists.leftList];
            const copyRightList = [...lists.rightList];
            if (dragItem.current.list=="L") {
                const dragItemContent = copyLeftList[dragItem.current.combatIndex][dragItem.current.competitorIndex];
                if (dragOverItem.current.list=="L") {
                    const dragOverItemContent = copyLeftList[dragOverItem.current.combatIndex][dragOverItem.current.competitorIndex];
                    copyLeftList[dragItem.current.combatIndex].splice(dragItem.current.competitorIndex, 1, dragOverItemContent);
                    copyLeftList[dragOverItem.current.combatIndex].splice(dragOverItem.current.competitorIndex, 1, dragItemContent);
                } else {
                    const dragOverItemContent = copyRightList[dragOverItem.current.combatIndex][dragOverItem.current.competitorIndex];
                    copyLeftList[dragItem.current.combatIndex].splice(dragItem.current.competitorIndex, 1, dragOverItemContent);
                    copyRightList[dragOverItem.current.combatIndex].splice(dragOverItem.current.competitorIndex, 1, dragItemContent);
                }
            } else {
                const dragItemContent = copyRightList[dragItem.current.combatIndex][dragItem.current.competitorIndex];
                if (dragOverItem.current.list=="L") {
                    const dragOverItemContent = copyLeftList[dragOverItem.current.combatIndex][dragOverItem.current.competitorIndex];
                    copyRightList[dragItem.current.combatIndex].splice(dragItem.current.competitorIndex, 1, dragOverItemContent);
                    copyLeftList[dragOverItem.current.combatIndex].splice(dragOverItem.current.competitorIndex, 1, dragItemContent);
                } else {
                    const dragOverItemContent = copyRightList[dragOverItem.current.combatIndex][dragOverItem.current.competitorIndex];
                    copyRightList[dragItem.current.combatIndex].splice(dragItem.current.competitorIndex, 1, dragOverItemContent);
                    copyRightList[dragOverItem.current.combatIndex].splice(dragOverItem.current.competitorIndex, 1, dragItemContent);
                }
            }
            dragItem.current = null;
            dragOverItem.current = null;
            setLists({leftList: copyLeftList, rightList: copyRightList})
        };

        return (
            <div>{state.combatsVisible &&
                <div>
                    <Container className="combats">
                        <Row className="details-card">
                            <Col>
                                <>
                                    {
                                        lists.leftList&&
                                        lists.leftList.map((combat, index) => (
                                            <Box className="combat">
                                                <Row className="detail"
                                                     onDragStart={(e) => dragStart(e, {list: "L", combatIndex: index, competitorIndex: 0})}
                                                     onDragEnter={(e) => dragEnter(e, {list: "L", combatIndex: index, competitorIndex: 0})}
                                                     onDragEnd={drop}
                                                     draggable>{combat[0] != null && combat[0].personalDetails != null && <>{combat[0].personalDetails.surname} {combat[0].personalDetails.name}</>}</Row>
                                                <Row className="detail"
                                                     onDragStart={(e) => dragStart(e, {list: "L", combatIndex: index, competitorIndex: 1})}
                                                     onDragEnter={(e) => dragEnter(e, {list: "L", combatIndex: index, competitorIndex: 1})}
                                                     onDragEnd={drop}
                                                     draggable>{combat[1] != null && combat[1].personalDetails != null && <>{combat[1].personalDetails.surname} {combat[1].personalDetails.name}</>}</Row>
                                            </Box>
                                        ))}
                                </>
                            </Col>
                            <Col>
                                <>
                                    {
                                        lists.rightList&&
                                        lists.rightList.map((combat, index) => (
                                            <Box className="combat">
                                                <Row className="detail"
                                                     onDragStart={(e) => dragStart(e, {list: "R", combatIndex: index, competitorIndex: 0})}
                                                     onDragEnter={(e) => dragEnter(e, {list: "R", combatIndex: index, competitorIndex: 0})}
                                                     onDragEnd={drop}
                                                     draggable>{combat[0] != null && combat[0].personalDetails != null && <>{combat[0].personalDetails.surname} {combat[0].personalDetails.name}</>}</Row>
                                                <Row className="detail"
                                                     onDragStart={(e) => dragStart(e, {list: "R", combatIndex: index, competitorIndex: 1})}
                                                     onDragEnter={(e) => dragEnter(e, {list: "R", combatIndex: index, competitorIndex: 1})}
                                                     onDragEnd={drop}
                                                     draggable>{combat[1] != null && combat[1].personalDetails != null && <>{combat[1].personalDetails.surname} {combat[1].personalDetails.name}</>}</Row>
                                            </Box>
                                        ))}
                                </>
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