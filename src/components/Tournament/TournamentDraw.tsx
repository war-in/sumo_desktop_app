import {useLocation} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Panel from "./Panel";
import React, {useEffect, useState} from "react";
import {DrawFromDatabase, Model, RowData} from "./Model";
import Competitor from "../../objects/Competitor";
import PersonalDetails from "../../objects/PersonalDetails";
import * as GiIcons from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri';
import { IconContext } from "react-icons";
import {IDrawVisualizer} from "../../objects/fightModel/draws/IDrawVisualizer";
import FullScreenModal from "./TeamFight/FullScreenModal";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import axios from "axios";



type LocationState = {
    rowData: RowData,
    drawFromDatabase: DrawFromDatabase
}



function slider(model: Model,visualizer:IDrawVisualizer) {
    let slides = visualizer?.getSlidesForRounds()

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
            console.log(competitor)
            const personal_details = new PersonalDetails(competitor.personalDetails!.id, competitor.personalDetails!.name, competitor.personalDetails!.surname, "", null, null);
            return new Competitor(competitor.id, personal_details, "", "", 0);
        })
    )

}

function TournamentDraw() {

    const location = useLocation();
    const {rowData, drawFromDatabase} = location.state as LocationState
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const [model, setModel] = useState<Model>(new Model(drawFromDatabase, rowData, createCompetitors(competitors), false));
    const updateModelVisualize = () => {
        let newModel = Object.assign({}, model);
        setModel(newModel)
    }
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:8080/draw/ready-draw?drawId="+rowData.id)
                .then(response => {
                    setModel(new Model(drawFromDatabase, rowData, createCompetitors(response.data), true))
                    setCompetitors(response.data);
                })
        }
        fetchData();
    }, []);

    const [fullDrawVisible,setFullDrawVisible] = useState<boolean>(false)
    const [resultsVisible,setResultsVisible] = useState<boolean>(false)
    const hideFullDrawModal = ()=>{setFullDrawVisible(false)}
    const hideResults = ()=>{setResultsVisible(false)}
    let visualizer = model.drawVisualizer

    return (
        <Container className="tournament-container h-100">
                <h1 className="h-10 p-0 m-0">{rowData.weight}kg {rowData.age} {rowData.sex}</h1>
                <IconContext.Provider value={{color: '#feb886',size:'60px'}}>
                        <RiIcons.RiFullscreenLine onClick={()=>setFullDrawVisible(true)}/>
                        <GiIcons.GiPodium onClick={()=>setResultsVisible(true)}/>
                </IconContext.Provider>
            <FullScreenModal show={fullDrawVisible} onHide={hideFullDrawModal} content={visualizer?.fullDraw()} header="Cała krzyżówka"/>
            <FullScreenModal show={resultsVisible} onHide={hideResults} content={visualizer?.results()} header="Wyniki"/>

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
