import {IDrawVisualizer} from "./IDrawVisualizer";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TreeDrawUnder8 from "./TreeDrawUnder8";
import MatchVisualisation from "../../../components/Tournament/MatchVisualisation";
import Competitor from "../../Competitor";
import Category from "../../Category";
import PersonalDetails from "../../PersonalDetails";
import Final from "../Final";

export default class TreeDrawUnder16Visualizer implements IDrawVisualizer {
    draw: TreeDrawUnder8;
    slidersForRounds: React.ReactNode[]

    constructor(draw: TreeDrawUnder8) {
        this.draw = draw;
        this.slidersForRounds = []
        this.reinitializeSlider()

    }

    getSlidesForRounds(): React.ReactNode[] {
        this.reinitializeSlider()
        return this.slidersForRounds;
    }

    reinitializeSlider() {

        this.slidersForRounds = []
        for (let i = 0; i < this.draw.rounds.length; i++) {
            let actualRound = this.draw.rounds[i]
            let slide;
            switch (i) {
                case 0:
                    slide = (
                        <Container className="h-100">
                            <h2 className="h-10">{actualRound.roundName}</h2>
                            <Row className="h-90">
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[8]}/>
                                    <MatchVisualisation match={this.draw.matches[9]}/>
                                    <MatchVisualisation match={this.draw.matches[10]}/>
                                    <MatchVisualisation match={this.draw.matches[11]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[12]} mirrorView={true}/>
                                    <MatchVisualisation match={this.draw.matches[13]} mirrorView={true}/>
                                    <MatchVisualisation match={this.draw.matches[14]} mirrorView={true}/>
                                    <MatchVisualisation match={this.draw.matches[15]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </Container>
                    )
                    break;
                case 1:
                    slide = (
                        <Container>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[4]}/>
                                    <MatchVisualisation match={this.draw.matches[5]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[6]} mirrorView={true}/>
                                    <MatchVisualisation match={this.draw.matches[7]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </Container>
                    )
                    break;
                case 2:
                    slide = (
                        <Container>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[2]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[3]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </Container>
                    )
                    break;
                case 3:
                    slide = (
                        <Container>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[20]}/>
                                    <MatchVisualisation match={this.draw.matches[21]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[22]} mirrorView={true}/>
                                    <MatchVisualisation match={this.draw.matches[23]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </Container>
                    )
                    break;
                case 4:
                    slide = (
                        <Container>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[19]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[18]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </Container>
                    )
                    break;
                case 5:
                    slide = (
                        <Container>
                            <h2>{actualRound.roundName}</h2>
                            <Row>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[17]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[16]} mirrorView={true}/>
                                </Col>
                            </Row>
                        </Container>
                    )
                    break;
                case 6:
                    slide = (
                        <Container className="h-100">
                            <h2>{actualRound.roundName}</h2>
                            <Final match={this.draw.matches[1]}/>
                        </Container>
                    )
                    break;

            }

            this.slidersForRounds.push(
                slide
            )
        }
    }

    results(): React.ReactNode {
        return (
            <Container>
                <Row>
                    1. {this.draw.matches[1]?.winner?.personalDetails.name +" "+ this.draw.matches[1]?.winner?.personalDetails.surname}
                </Row>
                <Row>
                    2. {this.draw.matches[1]?.looser?.personalDetails.name +" "+ this.draw.matches[1]?.looser?.personalDetails.surname}
                </Row>
                <Row>
                    3. {this.draw.matches[16]?.winner?.personalDetails.name +" "+ this.draw.matches[16]?.winner?.personalDetails.surname}
                </Row>
                <Row>
                    3. {this.draw.matches[17]?.winner?.personalDetails.name +" "+ this.draw.matches[17]?.winner?.personalDetails.surname}
                </Row>
                <Row>
                    5. {this.draw.matches[16]?.looser?.personalDetails.name +" "+ this.draw.matches[16]?.looser?.personalDetails.surname}
                </Row>
                <Row>
                    5. {this.draw.matches[17]?.looser?.personalDetails.name +" "+ this.draw.matches[17]?.looser?.personalDetails.surname}
                </Row>
            </Container>
        )
    }


    fullDraw(): React.ReactNode {
        return (
            <Container fluid={true}>
                <Row>
                    <h1>Główna krzyżówka</h1>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[8]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[8]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[12]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[12]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className={"border border-3 rounded m-3 competitorBox-inFullDraw"}>
                            {this.draw.matches[8]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[8]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[12]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[12]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[8]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[8]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[12]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[12]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[2]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[2]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[3]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[3]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[9]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[9]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[13]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[13]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[9]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[9]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[13]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[13]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[9]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[9]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[13]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[13]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[1]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[1]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[1]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[1]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[10]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[10]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[14]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[14]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[10]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[10]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[14]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[14]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[10]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[10]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[14]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[14]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[2]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[2]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[3]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[3]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[11]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[11]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[15]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[15]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[11]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[11]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[15]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[15]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[10]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[10]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[14]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[14]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <h1>Repasarze</h1>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[9]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[9]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[13]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[13]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[10]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[10]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[14]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[14]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[10]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[10]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[14]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[14]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[2]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[2]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[3]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[3]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[11]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[11]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[15]?.firstCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[15]?.firstCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[11]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[11]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[15]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[15]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[15]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[15]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[15]?.winner?.personalDetails.name}
                            <br/>
                            {this.draw.matches[15]?.winner?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[10]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[10]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[14]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[14]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[2]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[2]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                            {this.draw.matches[3]?.secondCompetitor?.personalDetails.name}
                            <br/>
                            {this.draw.matches[3]?.secondCompetitor?.personalDetails.surname}
                        </div>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                    <Col>
                        <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                    </Col>
                </Row>
            </Container>
        )
    }


}
