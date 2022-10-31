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
import {IconContext} from "react-icons";
import {IDrawVisualizer} from "../../objects/fightModel/draws/IDrawVisualizer";
import FullScreenModal from "./TeamFight/FullScreenModal";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import axios from "axios";
import CompetitorsAndFightsInDraw from "../../objects/fightModel/CompetitorsAndFightsInDraw";
import IndividualMatch from "../../objects/fightModel/IndividualMatch";
import FightFromDatabase from "../../objects/fightModel/FightFromDatabase";


type LocationState = {
    rowData: RowData,
    drawFromDatabase: DrawFromDatabase
}


function slider(model: Model, visualizer: IDrawVisualizer) {
    let slides = visualizer?.getSlidesForRounds()

    return (
        <IconContext.Provider value={{color: '#feb886', size: '60px'}}>
            <Carousel variant={"dark"} interval={null} className="carousel alignVertically" prevIcon={<IoIosArrowBack/>}
                      nextIcon={<IoIosArrowForward/>}>
                {
                    slides.map(slide => {
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
            const personal_details = new PersonalDetails(
                competitor.personalDetails!.id,
                competitor.personalDetails!.name,
                competitor.personalDetails!.surname,
                "",
                null,
                null);

            return new Competitor(
                competitor.id,
                personal_details,
                competitor.country,
                "",
                0);
        })
    )
}

function createFights(fights: FightFromDatabase[], competitors: Competitor[]): IndividualMatch[] {
    const competitorsById: Record<number, Competitor> =
        competitors.reduce(function (map, competitor) {
            // @ts-ignore
            map[competitor!.id] = competitor;
            return map;
        }, {});

    return fights.map(fight => {
        let firstCompetitor: Competitor | null = null;
        let secondCompetitor: Competitor | null = null;
        if (fight.firstCompetitor?.id != null)
            firstCompetitor = competitorsById[fight.firstCompetitor.id];
        if (fight.secondCompetitor?.id != null)
            secondCompetitor = competitorsById[fight.secondCompetitor.id];

        let winner: Competitor | null = null;
        switch (fight.whoIsWinner) {
            case 1:
                winner = firstCompetitor;
                break;
            case 2:
                winner = secondCompetitor;
                break;
        }

        return new IndividualMatch(firstCompetitor, secondCompetitor, winner)
    })
}

function TournamentDraw() {

    const location = useLocation();
    const {rowData, drawFromDatabase} = location.state as LocationState
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const [model, setModel] = useState<Model>(
        new Model(
            drawFromDatabase,
            rowData,
            createCompetitors(competitors),
            createFights([], competitors),
         false));
    const updateModelVisualize = () => {
        let newModel = Object.assign({}, model);
        setModel(newModel)
    }
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:8080/draw/with-fights?drawId=" + rowData.id)
                .then(response => {
                    const _competitors = createCompetitors((response.data as CompetitorsAndFightsInDraw).competitors);
                    setModel(new Model(
                        drawFromDatabase,
                        rowData,
                        _competitors,
                        createFights(
                            (response.data as CompetitorsAndFightsInDraw).fights,
                            _competitors
                        ),
                        true))
                    setCompetitors((response.data as CompetitorsAndFightsInDraw).competitors);
                })
        }
        fetchData();
    }, []);

    const [fullDrawVisible, setFullDrawVisible] = useState<boolean>(false)
    const [resultsVisible, setResultsVisible] = useState<boolean>(false)
    const hideFullDrawModal = () => {
        setFullDrawVisible(false)
    }
    const hideResults = () => {
        setResultsVisible(false)
    }
    let visualizer = model.drawVisualizer

    return (
        <Container className="tournament-container h-100">
            <h1 className="h-10 p-0 m-0">{rowData.weight} {rowData.age} {rowData.sex}</h1>
            <IconContext.Provider value={{color: '#feb886', size: '60px'}}>
                <RiIcons.RiFullscreenLine onClick={() => setFullDrawVisible(true)}/>
                <GiIcons.GiPodium onClick={() => setResultsVisible(true)}/>
            </IconContext.Provider>
            <FullScreenModal show={fullDrawVisible} onHide={hideFullDrawModal} content={visualizer?.fullDraw()}
                             header="Cała krzyżówka"/>
            <FullScreenModal show={resultsVisible} onHide={hideResults} content={visualizer?.results()}
                             header="Wyniki"/>

            <Row className="draw-row h-90">
                {slider(model, visualizer)}
            </Row>
            <Row className="panel">
                <Panel model={model} setModel={setModel} updateModelView={updateModelVisualize}/>
            </Row>
        </Container>
    )
}

export default TournamentDraw;
