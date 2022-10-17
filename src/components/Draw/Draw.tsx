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

type Category = {
    category: {
        id: number
    },
    competitors: object[]
}

type DrawType = {
    id: number,
    numberOfCompetitors: number,
    region: {
        region: string
    }
}

type GeneratedCombat = {
    drawType: DrawType,
    combats: any
}

type Competitor = {
    personalDetails: any
}

let selectedDrawType: DrawType | null = null;
let generatedCombats: { [key: number]: GeneratedCombat | null } = {};
let categoriesToIndexes: { [key: number]: number } = {};

function Draw() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [buttons, setButtons] = useState<DrawType[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
    const [combats, setCombats] = useState<Competitor[]>([]);

    const [state, setState] = useState({buttonsVisible: false, combatsVisible: false});
    const showButtons = () => {
        setState({buttonsVisible: true, combatsVisible: false})
    }
    const showCombats = () => {
        setState({buttonsVisible: false, combatsVisible: true})
    }

    const fetchData = async () => {
        const { data } = await axios.get(desktopServerUrl + `draw/categories-with-competitors?competitionId=` + competitionId);
        return data;
    }

    useEffect(() => {
        const sessionStorageData = sessionStorage.getItem("categories");
        if (sessionStorageData) {
            setCategories(JSON.parse(sessionStorageData));
        } else {
            fetchData().then(data => {
                setCategories(data)
                sessionStorage.setItem("categories", JSON.stringify(data));
            })
        }
    }, []);

    function combatsAlreadyGenerated(categoryId: number) {
        return generatedCombats[categoryId] != null;
    }

    function CategoryDetails(props: { categoryId: number }) {
        const Columns = [
            {"title": undefined, "field": "id"},
            {"title": undefined, "field": "personalDetails.surname"},
            {"title": undefined, "field": "personalDetails.name"},
            {"title": undefined, "field": "country"},
        ]

        const dataset = categories[categoriesToIndexes[props.categoryId]].competitors;

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
                        sorting: false,
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
                        detailPanelType: "single",
                        grouping: true,
                    }}
                    onRowClick={async (_event, rowData?: Category) => {
                        if (rowData == null) return
                        if (combatsAlreadyGenerated(rowData.category.id)) {
                            selectedDrawType = generatedCombats[rowData.category.id]!.drawType;
                            setCombats(generatedCombats[rowData.category.id]!.combats);
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

    function GenerateCombatsButton(props: { drawType: DrawType }) {
        let displayName: string;
        if (props.drawType.numberOfCompetitors == 0) {
            displayName = "Round Robin Draw";
        } else {
            displayName = "Draw for " + props.drawType.numberOfCompetitors + " competitors";
        }
        return (<div>{state.buttonsVisible && <Button className="combat-button" variant="dark" onClick={async () => {
            let body = {
                competitors: categories[categoriesToIndexes[selectedCategoryId]].competitors,
                drawType: props.drawType
            }
            await axios.post(desktopServerUrl + `draw`, body)
                .then(response => {
                    selectedDrawType = props.drawType;
                    setCombats(response.data)
                    showCombats();
                })
        }}>{displayName}</Button>}</div>);
    }

    function GenerateCombatsButtons() {
        let buttonsList : any[] = [];
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
            generatedCombats[selectedCategoryId] = {combats: combats, drawType: selectedDrawType!};
        }}>Save</Button>);
    }

    function CancelButton() {
        return (<Button className="cancel-button" variant="danger" onClick={async () => {
            generatedCombats[selectedCategoryId] = null;
            showButtons()
        }}>Cancel</Button>);
    }

    function Combats() {
        const dragItem = useRef<number |  null>(null);
        const dragOverItem = useRef<number |  null>(null);
        const dragStart = (_e: React.DragEvent<HTMLElement>, position: number) => {
            dragItem.current = position;
        };
        const dragEnter = (_e: React.DragEvent<HTMLElement>, position: number) => {
            dragOverItem.current = position;
        };

        const drop = () => {
            if (dragItem.current != null && dragOverItem.current != null) {
                const copyCombats = [...combats];
                const dragItemContent = copyCombats[dragItem.current];
                const dragOverItemContent = copyCombats[dragOverItem.current];
                copyCombats.splice(dragItem.current, 1, dragOverItemContent);
                copyCombats.splice(dragOverItem.current, 1, dragItemContent);
                dragItem.current = null;
                dragOverItem.current = null;
                setCombats(copyCombats);
            }
        };

        function Detail(props: { index: number }) {
            return (
                <Row className="detail"
                     onDragStart={(e) => dragStart(e, props.index)}
                     onDragEnter={(e) => dragEnter(e, props.index)}
                     onDragEnd={drop}
                     draggable>{combats[props.index] != null && combats[props.index].personalDetails != null && <>{combats[props.index].personalDetails.surname} {combats[props.index].personalDetails.name}</>}
                </Row>
            );
        }

        function TwoElementCombat(props: { index: number }) {
            return (
                <Box className="combat">
                    <Detail index={props.index}/>
                    <Detail index={props.index + 1}/>
                </Box>
            );
        }

        let left : any[] = [];
        let right : any[] = [];
        if (selectedDrawType != null && (selectedDrawType.numberOfCompetitors == 0 || selectedDrawType.numberOfCompetitors == 5)) {
            for (let i = 0; i < combats.length; i++) {
                left.push(<Box className="combat">
                        <Detail index={i}/>
                    </Box>
                );
            }
        } else if (selectedDrawType != null && selectedDrawType.numberOfCompetitors == 10) {
            for (let i = 0; i < combats.length / 2; i++) {
                left.push(<Box className="combat"><Detail index={i}/></Box>);
            }
            for (let i = combats.length / 2; i < combats.length; i++) {
                right.push(<Box className="combat"><Detail index={i}/></Box>);
            }
        } else {
            for (let i = 0; i < combats.length / 2; i += 2) {
                left.push(<TwoElementCombat index={i}/>);
            }
            for (let i = combats.length / 2; i < combats.length; i += 2) {
                right.push(<TwoElementCombat index={i}/>);
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