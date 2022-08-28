import {useLocation} from "react-router-dom";
import {Button, Container, Row} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Panel from "./Panel";
import React, {useState} from "react";
import {DrawFromDatabase, Model, RowData} from "./Model";
// @ts-ignore
import competitors from "../../mocks/CompetitorsAtCategory.json";
import competitors8 from "../../mocks/CompetitorsAtCategory8.json";
import competitors5 from "../../mocks/CompetitorsAtCategory5.json";
import Competitor from "../../objects/Competitor";
import PersonalDetails from "../../objects/PersonalDetails";
import Category from "../../objects/Category";
import IndividualMatch from "../../objects/fightModel/IndividualMatch";
import TreeDrawUnder16Visualizer from "../../objects/fightModel/draws/TreeDrawUnder16Visualizer";
import TreeDrawUnder16 from "../../objects/fightModel/draws/TreeDrawUnder16";
import * as GiIcons from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri';
import { IconContext } from "react-icons";
import FullDrawModal from "./TeamFight/FullScreenModal";
import {IDrawVisualizer} from "../../objects/fightModel/draws/IDrawVisualizer";
import FullScreenModal from "./TeamFight/FullScreenModal";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";



type LocationState = {
    rowData: RowData,
    drawFromDatabase: DrawFromDatabase
}

function slider(model: Model,visualizer:IDrawVisualizer) {
    let slides = []

    console.log(model)

    // let visualizer = new RoundRobinDrawVisualizer(model.draw as RoundRobinDraw)
    // slides = visualizer.getSlidesForRounds()
    // console.log("tutaj jest tabilica slajdów")
    // console.log(slides)

    slides = visualizer.getSlidesForRounds()
    console.log("tutaj jest tabilica slajdów")
    console.log(slides)
    // setFullDrawContent(visualizer.fullDraw())

    // for (let i=0; i < model.drawFromDatabase.drawType.numberOfRounds; i++)
    //     slides.push(<Slide model={model} roundId={i}/>)

    return (
        <IconContext.Provider value={{color: '#feb886',size:'60px'}}>
        <Carousel variant={"dark"} interval={null} className={"carousel"} prevIcon={<IoIosArrowBack/>} nextIcon={<IoIosArrowForward/>}>
            {slides.map(slide => {
                return (
                    <Carousel.Item>
                        {slide}
                    </Carousel.Item>
                )
            })}
        </Carousel>
        </IconContext.Provider>
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

    const [model, setModel] = useState<Model>(new Model(drawFromDatabase, rowData, createCompetitors(competitors5)));
    const [fullDrawVisible,setFullDrawVisible] = useState<boolean>(false)
    const [resultsVisible,setResultsVisible] = useState<boolean>(false)
    const hideFullDrawModal = ()=>{setFullDrawVisible(false)}
    const hideResults = ()=>{setResultsVisible(false)}
    let visualizer = model.drawVisualizer

    const updateModelVisualize = () => {
        let newModel = Object.assign({}, model);
        setModel(newModel)
        console.log("nowy model")
        console.log(model)
    }

    console.log(model)

    return (
        <Container className="tournament-container h-100">
                <h1 className="h-10 p-0 m-0">{rowData.weight}kg {rowData.age} {rowData.sex}</h1>
                <IconContext.Provider value={{color: '#feb886',size:'60px'}}>
                        <RiIcons.RiFullscreenLine onClick={()=>setFullDrawVisible(true)}/>
                        <GiIcons.GiPodium onClick={()=>setResultsVisible(true)}/>
                </IconContext.Provider>
            <FullScreenModal show={fullDrawVisible} onHide={hideFullDrawModal} content={visualizer.fullDraw()} header="Cała krzyżówka"/>
            <FullScreenModal show={resultsVisible} onHide={hideResults} content={visualizer.results()} header="Wyniki"/>

            <Row className="draw-row h-90">
                {slider(model,visualizer)}
            </Row>
            <Row className="panel">
                <Panel model={model} setModel={setModel} updateModelView={updateModelVisualize}/>
            </Row>
        </Container>
    )
}

export default TournamentDraw;
