import {useLocation} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Panel from "./Panel";
import {useState} from "react";
import {DrawFromDatabase, Model, RowData} from "./Model";
// @ts-ignore
import competitors from "../../mocks/CompetitorsAtCategory.json";
import Competitor from "../../objects/Competitor";
import PersonalDetails from "../../objects/PersonalDetails";
import Category from "../../objects/Category";
import IndividualMatch from "../../objects/fightModel/IndividualMatch";
import RoundRobinDrawVisualizer from "../../objects/fightModel/draws/RoundRobinVisualizer";
import RoundRobinDraw from "../../objects/fightModel/draws/RoundRobinDraw";
import Slide from "./Slide";
import TreeDrawUnder8Visualizer from "../../objects/fightModel/draws/TreeDrawUnder8Visualizer";
import TreeDrawUnder8 from "../../objects/fightModel/draws/TreeDrawUnder8";
import TreeDrawUnder16Visualizer from "../../objects/fightModel/draws/TreeDrawUnder16Visualizer";
import TreeDrawUnder16 from "../../objects/fightModel/draws/TreeDrawUnder16";


type LocationState = {
    rowData: RowData,
    drawFromDatabase: DrawFromDatabase
}

function slider(model: Model) {
    let slides = []

    console.log(model)

    // let visualizer = new RoundRobinDrawVisualizer(model.draw as RoundRobinDraw)
    // slides = visualizer.getSlidesForRounds()
    // console.log("tutaj jest tabilica slajdów")
    // console.log(slides)

    let visualizer = new TreeDrawUnder16Visualizer(model.draw as TreeDrawUnder16)
    slides = visualizer.getSlidesForRounds()
    console.log("tutaj jest tabilica slajdów")
    console.log(slides)

    // for (let i=0; i < model.drawFromDatabase.drawType.numberOfRounds; i++)
    //     slides.push(<Slide model={model} roundId={i}/>)

    return (
        <Carousel variant={"dark"} interval={null} className={"carousel"}>
            {slides.map(slide => {
                return (
                    <Carousel.Item>
                        {slide}
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}

function createCompetitors(competitors: Competitor[]) {
    return (
        competitors.map(competitor => {

            const personal_details = new PersonalDetails(competitor.personalDetails.id, competitor.personalDetails.name, competitor.personalDetails.surname, null, null, null);
            return new Competitor(competitor.id, personal_details, "", "", new Category("", "", ""), "");
        })
    )

}

function TournamentDraw() {
    const location = useLocation();
    const {rowData, drawFromDatabase} = location.state as LocationState

    const [model, setModel] = useState<Model>(new Model(drawFromDatabase, rowData, createCompetitors(competitors)));
    const [matches,setMatches] = useState<IndividualMatch[]>(model.draw.matches)
    const [active,setActive] = useState<boolean[]>(new Array(matches.length).fill(false))
    const updateModelVisualize = ()=>{
        let newModel = Object.assign({}, model);
        setModel(newModel)
        console.log("nowy model")
        console.log(model)
    }

    console.log(model)

    return (
        <Container className="tournament-container h-100">
            <h1 className="h-10 p-0 m-0">{rowData.weight}kg {rowData.age} {rowData.sex}</h1>
            <Row className="draw-row h-90">
                {slider(model)}
                {/*<MatchVisualisation/>*/}
            </Row>
            <Row className="panel">
                <Panel model={model} setModel={setModel} updateModelView={updateModelVisualize}/>
            </Row>
        </Container>
    )
}

export default TournamentDraw;
