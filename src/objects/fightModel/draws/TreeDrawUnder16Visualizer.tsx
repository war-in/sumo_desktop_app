import {IDrawVisualizer} from "./IDrawVisualizer";
import React from "react";
import {Col, Row} from "react-bootstrap";
import TreeDrawUnder8 from "./TreeDrawUnder8";
import MatchVisualisation from "../../../components/Tournament/MatchVisualisation";
import IndividualMatch from "../IndividualMatch";
import Competitor from "../../Competitor";
import Category from "../../Category";
import PersonalDetails from "../../PersonalDetails";

export default class TreeDrawUnder16Visualizer implements IDrawVisualizer {
    draw: TreeDrawUnder8;
    slidersForRounds: React.ReactNode[]

    constructor(draw: TreeDrawUnder8) {
        this.draw = draw;
        this.slidersForRounds = []
        this.reinitializeslider()

    }

    getSlidesForRounds(): React.ReactNode[] {
        this.reinitializeslider()
        return this.slidersForRounds;
    }

    reinitializeslider() {
        let personal = new PersonalDetails(null, "Wolny Los", "Wolny Los", "Wolny Los", "Wolny Los", "Wolny Los")
        let competitor = new Competitor(null, personal, "Wolny Los", "Wolny Los", new Category("Wolny Los", "Wolny Los", "Wolny Los"), 0)

        this.slidersForRounds = []
        for (let i = 0; i < this.draw.rounds.length; i++) {
            let actualRound = this.draw.rounds[i]
            let slide;
            switch(i) {
                case 0:
                    slide = (
                        <div>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[8]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[10]} mirrorView={true}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[9]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[11]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </div>
                    )
                    break;
                case 1:
                    slide = (
                        <div>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[12]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[14]}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[13]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[15]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </div>
                    )
                    break;
                case 2:
                    slide = (
                        <div>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[4]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[6]} mirrorView={true}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[5]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[7]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </div>
                    )
                    break;
                case 3:
                    slide = (
                        <div>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[2]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[3]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </div>
                    )
                    break;
                case 4:
                    slide = (
                        <div>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[20]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[22]} mirrorView={true}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[21]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[23]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </div>
                    )
                    break;
                case 5:
                    slide = (
                        <div>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col className="col-3">
                                    <MatchVisualisation match={this.draw.matches[18]} showWinner={false}/>
                                </Col>
                                <Col className="col-5">
                                    <MatchVisualisation match={this.draw.matches[17]}/>

                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-3">
                                    <MatchVisualisation match={this.draw.matches[19]} showWinner={false}/>
                                </Col>
                                <Col className="col-5">
                                    <MatchVisualisation match={this.draw.matches[16]}/>
                                </Col>
                            </Row>
                        </div>
                    )
                    break;
                case 6:
                    slide = (
                        <div>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[1]}/>
                                </Col>
                            </Row>
                        </div>
                    )
                    break;

            }

            this.slidersForRounds.push(
                    slide
            )
        }
    }


}
