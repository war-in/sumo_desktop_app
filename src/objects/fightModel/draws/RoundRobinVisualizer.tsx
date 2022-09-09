import {IDrawVisualizer} from "./IDrawVisualizer";
import RoundRobinDraw from "./RoundRobinDraw";
import React from "react";
import MatchVisualisation from "../../../components/Tournament/MatchVisualisation";
import {Col, Row} from "react-bootstrap";

export default class RoundRobinDrawVisualizer implements IDrawVisualizer {
    draw: RoundRobinDraw;
    slidersForRounds: React.ReactNode[]

    constructor(draw: RoundRobinDraw) {
        this.draw = draw;
        this.slidersForRounds = []
        this.reinitializeslider()

    }

    getSlidesForRounds(): React.ReactNode[] {
        this.reinitializeslider()
        return this.slidersForRounds;
    }

    reinitializeslider() {
        this.slidersForRounds = []
        for (let i = 0; i < this.draw.rounds.length; i++) {
            let actualRound = this.draw.rounds[i]
            let firstIndex = actualRound.firstFightIndex as number
            let lastIndex = actualRound.lastFightIndex as number
            let matchesInRounds = this.draw.matches.slice(firstIndex, lastIndex + 1)
            let matches = (matchesInRounds.map(match => {
                return (
                    <Col className=" .mx-auto mt-4 col-xs-12 col-s-12 col-md-6 col-l-4 col-xl-4 col-xxl-3">
                        <MatchVisualisation match={match} active={true}/>
                    </Col>
                )
            }))
            this.slidersForRounds.push(
                <>
                    <h2>{actualRound.roundName}</h2>
                    <Row className="justify-content-center align-item-center">
                        {matches}
                    </Row>
                </>
            )
        }
    }

    fullDraw(): React.ReactNode {
        return (<>
            {this.draw.competitors.map(competitor => {
                return (<>{competitor.personalDetails!.name + " " + competitor.personalDetails!.name + " " +
                    competitor.points}
                    < br/> </>)
                    })}
                </>)
            }

                results(): React.ReactNode {
                return undefined;
            }


            }
