import {Button, Col, Container, Row} from "react-bootstrap";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {Model} from "./Model";
import React, {useState} from "react";
import IndividualMatch from "../../objects/fightModel/IndividualMatch";
import {IconContext} from "react-icons";

type Props = {
    model: Model,
    setModel: React.Dispatch<React.SetStateAction<Model>>
    updateModelView: () => void
}

const Panel: React.FC<Props> = (props) => {
    const [actualMatch, setActualMatch] = useState<IndividualMatch>(props.model.draw.getActualMatch())
    const [nextMatch, setNextMatch] = useState<IndividualMatch>(props.model.draw.getNextMatch())

    const playActualMatch = (firstWin: boolean) => {
        props.model.draw.playActualMatch(firstWin)
        props.updateModelView()
        setActualMatch(props.model.draw.getActualMatch())
        setNextMatch(props.model.draw.getNextMatch())
        console.log(props.model)
    }

    const goToNextMatch = () => {
        props.model.draw.goToNextMatch()
        props.updateModelView()
        setActualMatch(props.model.draw.getActualMatch())
        setNextMatch(props.model.draw.getNextMatch())
        console.log(props.model)
    }
    const goToPrevMatch = () => {
        props.model.draw.goToPrevMatch()
        props.updateModelView()
        setActualMatch(props.model.draw.getActualMatch())
        setNextMatch(props.model.draw.getNextMatch())
        console.log(props.model)
    }

    console.log(props.model.draw.matches)
    const currenFightId = props.model.draw.actualFightIndex;
    const firstCompetitor = actualMatch ? actualMatch.firstCompetitor : null
    const secondCompetitor = actualMatch ? actualMatch.secondCompetitor : null

    const nextFirstCompetitor = nextMatch ? nextMatch.firstCompetitor : null
    const nextSecondCompetitor = nextMatch ? nextMatch.secondCompetitor : null

    console.log(firstCompetitor);
    console.log(secondCompetitor);

    return (
        <IconContext.Provider value={{color: '#feb886', size: '60px'}}>
            <Container>

                <Row className="h-100">
                    <Col className="col-2">
                        <IoIosArrowDown size={60} onClick={()=>goToPrevMatch()}/>
                    </Col>
                    <Col className="col-8">
                        <Row>
                            <Col>
                                <Button  className="panel-button-current" onClick={() => {
                                    playActualMatch(true)
                                }}>
                                    {firstCompetitor ? firstCompetitor.personalDetails.name + ' ' + firstCompetitor.personalDetails.surname : ""}
                                </Button>
                            </Col>
                            <Col>
                                <Button className="panel-button-current" onClick={() => {
                                    playActualMatch(false)
                                }}>
                                    {secondCompetitor ? secondCompetitor.personalDetails.name + ' ' + secondCompetitor.personalDetails.surname : ""}
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button className="panel-button-next" style={{float: "right"}}>
                                    {nextFirstCompetitor ? nextFirstCompetitor.personalDetails.name + ' ' + nextFirstCompetitor.personalDetails.surname : ""}
                                </Button>
                            </Col>
                            <Col>
                                <Button className="panel-button-next" style={{float: "left"}}>
                                    {nextSecondCompetitor ? nextSecondCompetitor.personalDetails.name + ' ' + nextSecondCompetitor.personalDetails.surname : ""}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-2">
                        <IoIosArrowUp size={60} onClick={()=>goToNextMatch()}/>
                    </Col>
                </Row>
            </Container>
        </IconContext.Provider>
    )
}

export default Panel;