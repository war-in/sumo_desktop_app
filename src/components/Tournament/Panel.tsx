import {Button, Col, Container, Row} from "react-bootstrap";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {Model} from "./Model";
import React, {useState} from "react";
import IndividualMatch from "../../objects/fightModel/IndividualMatch";
import {IconContext} from "react-icons";
import {Box} from "@material-ui/core";

type Props = {
    model: Model,
    setModel: React.Dispatch<React.SetStateAction<Model>>
    updateModelView: () => void
}

const Panel: React.FC<Props> = (props) => {
    const [actualMatch, setActualMatch] = useState<IndividualMatch>(props.model.draw.getActualMatch())
    const [nextMatch, setNextMatch] = useState<IndividualMatch>(props.model.draw.getNextMatch())
    const [hidden, setHidden] = useState<boolean>(false)

    const playActualMatch = async (firstWin: boolean) => {
        await props.model.draw.playActualMatch(firstWin, props.model.rowData.id)
        props.updateModelView()
        setActualMatch(props.model.draw.getActualMatch())
        setNextMatch(props.model.draw.getNextMatch())
    }

    const goToNextMatch = () => {
        props.model.draw.goToNextMatch()
        props.updateModelView()
        setActualMatch(props.model.draw.getActualMatch())
        setNextMatch(props.model.draw.getNextMatch())
    }
    const goToPrevMatch = () => {
        props.model.draw.goToPrevMatch()
        props.updateModelView()
        setActualMatch(props.model.draw.getActualMatch())
        setNextMatch(props.model.draw.getNextMatch())
    }
    const start = () => {
        setActualMatch(props.model.draw.getActualMatch())
        setNextMatch(props.model.draw.getNextMatch())
        setHidden(true)
    }

    const startButton = () => {
        return (
            <Row className="h-100">
                <Col>
                    <Button className={"panel-button-current "} onClick={() => {
                        start()
                    }}>Start</Button>
                </Col>
            </Row>
        )
    }

    const panelButtons = () => {
        return (
            <Row className="h-100">
                <Col className="col-2">
                    <IoIosArrowDown size={60} onClick={() => goToPrevMatch()}/>
                </Col>
                <Col className="col-8">
                    <Row>
                        <Col>
                            <Button className="panel-button-current" onClick={() => {
                                playActualMatch(true)
                            }}>
                                {firstCompetitor ?
                                    <Box>
                                        <p className="m-0" style={{fontWeight: "bold", fontSize: '20px'}}>
                                            {firstCompetitor.personalDetails?.name + ' ' + firstCompetitor.personalDetails?.surname}
                                        </p>
                                        <p className="m-0">{firstCompetitor.country}</p>
                                    </Box>
                                    : ""}
                            </Button>
                        </Col>
                        <Col>
                            <Button className="panel-button-current" onClick={() => {
                                playActualMatch(false)
                            }}>
                                {secondCompetitor ?
                                    <Box>
                                        <p className="m-0" style={{fontWeight: "bold", fontSize: '20px'}}>
                                            {secondCompetitor.personalDetails?.name + ' ' + secondCompetitor.personalDetails?.surname}
                                        </p>
                                        <p className="m-0">{secondCompetitor.country}</p>
                                    </Box>
                                    : ""}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="panel-button-next" style={{float: "right"}}>
                                {nextFirstCompetitor ? nextFirstCompetitor.personalDetails?.name + ' ' + nextFirstCompetitor.personalDetails?.surname : ""}
                            </Button>
                        </Col>
                        <Col>
                            <Button className="panel-button-next" style={{float: "left"}}>
                                {nextSecondCompetitor ? nextSecondCompetitor.personalDetails?.name + ' ' + nextSecondCompetitor.personalDetails?.surname : ""}
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col className="col-2">
                    <IoIosArrowUp size={60} onClick={() => goToNextMatch()}/>
                </Col>
            </Row>
        )
    }

    const firstCompetitor = actualMatch ? actualMatch.firstCompetitor : null
    const secondCompetitor = actualMatch ? actualMatch.secondCompetitor : null

    const nextFirstCompetitor = nextMatch ? nextMatch.firstCompetitor : null
    const nextSecondCompetitor = nextMatch ? nextMatch.secondCompetitor : null

    return (
        <IconContext.Provider value={{color: '#feb886', size: '60px'}}>
            <Container>
                {hidden ? panelButtons() : startButton()}
            </Container>
        </IconContext.Provider>
    )
}

export default Panel;