import React from "react";
import {Model} from "./Model";
import {Round} from "../../objects/fightModel/Round";
import {Button, Col, Container, Row} from "react-bootstrap";
import {IDraw} from "../../objects/fightModel/draws/IDraw";
import IndividualMatch from "../../objects/fightModel/IndividualMatch";

type Props = {
    model: Model,
    roundId: number
    content?: React.ReactNode
}

function generateGroup(draw: IDraw, start: number, end: number) {
    const matches: IndividualMatch[] = draw.matches

    return (
        matches.map((match, index) => {
            if (start <= index && index <= end) {
                return (
                    <Container id={index.toString()}>
                        <Button>
                          {match.firstCompetitor?.personalDetails?.name + ' ' + match.firstCompetitor?.personalDetails?.surname}
                        </Button>
                        <Button>
                          {match.secondCompetitor?.personalDetails?.name + ' ' + match.secondCompetitor?.personalDetails?.surname}
                        </Button>
                    </Container>
                )
            }
        })
    )
}

function generateWinners(draw: IDraw, start: number, end: number) {
    const matches: IndividualMatch[] = draw.matches

    return (
        matches.map((match, index) => {
            if (start <= index && index <= end) {
                return (
                    <Button>
                        {match.winner?.personalDetails?.name + ' ' + match.winner?.personalDetails?.surname}
                    </Button>
                )
            }
        })
    )
}

const Slide: React.FC<Props> = (props) => {
    const name: string = props.model.drawFromDatabase.drawType.roundNames[props.roundId];
    const roundData: Round = props.model.draw.rounds[props.roundId];
    return (
        <Container>
            <h2>{name}</h2>
            <Row>
                <Col className="col-3">
                  {generateGroup(props.model.draw, roundData.firstFightIndex, (roundData.firstFightIndex+roundData.lastFightIndex!)/2)}
                </Col>
                <Col className="col-3">
                  {generateWinners(props.model.draw, roundData.firstFightIndex, (roundData.firstFightIndex+roundData.lastFightIndex!)/2)}
                </Col>
                <Col className="col-3">
                  {generateWinners(props.model.draw, (roundData.firstFightIndex+roundData.lastFightIndex!)/2+1, roundData.lastFightIndex!)}
                </Col>
                <Col className="col-3">
                  {generateGroup(props.model.draw, (roundData.firstFightIndex+roundData.lastFightIndex!)/2+1, roundData.lastFightIndex!)}
                </Col>
            </Row>
        </Container>
    )
}

export default Slide;