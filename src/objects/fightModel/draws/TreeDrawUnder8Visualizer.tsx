import {IDrawVisualizer} from "./IDrawVisualizer";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TreeDrawUnder8 from "./TreeDrawUnder8";
import MatchVisualisation from "../../../components/Tournament/MatchVisualisation";
import IndividualMatch from "../IndividualMatch";
import Competitor from "../../Competitor";
import Category from "../../Category";
import PersonalDetails from "../../PersonalDetails";

export default class TreeDrawUnder8Visualizer implements IDrawVisualizer {
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
                                    <MatchVisualisation match={this.draw.matches[7] } active={true} mirrorView={true}/>
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
                                    <MatchVisualisation match={this.draw.matches[2]}/>
                                </Col>
                                <Col>
                                    <MatchVisualisation match={this.draw.matches[3]} active={true} mirrorView={true}/>
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
                                <Col className="col-3">
                                    <MatchVisualisation match={this.draw.matches[10]} showWinner={false}/>
                                </Col>
                                <Col className="col-5">
                                    <MatchVisualisation match={this.draw.matches[9]}/>

                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-3">
                                    <MatchVisualisation match={this.draw.matches[11]} showWinner={false}/>
                                </Col>
                                <Col className="col-5">
                                    <MatchVisualisation match={this.draw.matches[8]}/>
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

    fullDraw(): React.ReactNode {
            return (
                <Container fluid={true}>
                    <Row>
                        <h1>Główna krzyżówka</h1>
                    </Row>
                    <Row>
                        <Col>
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                        </Col>
                        <Col>
                            <div className={"border border-3 rounded m-3 competitorBox-inFullDraw"}>
                                {this.draw.matches[4]?.firstCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[4]?.firstCompetitor?.personalDetails.surname}
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
                                {this.draw.matches[6]?.firstCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[6]?.firstCompetitor?.personalDetails.surname}
                            </div>
                        </Col>
                        <Col>
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
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
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                        </Col>
                        <Col>
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                                {this.draw.matches[4]?.secondCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[4]?.secondCompetitor?.personalDetails.surname}
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
                                {this.draw.matches[6]?.secondCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[6]?.secondCompetitor?.personalDetails.surname}
                            </div>
                        </Col>
                        <Col>
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
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
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                        </Col>
                        <Col>
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                                {this.draw.matches[5]?.firstCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[5]?.firstCompetitor?.personalDetails.surname}
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
                                {this.draw.matches[7]?.firstCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[7]?.firstCompetitor?.personalDetails.surname}
                            </div>
                        </Col>
                        <Col>
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
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
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                        </Col>
                        <Col>
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw">
                                {this.draw.matches[5]?.secondCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[5]?.secondCompetitor?.personalDetails.surname}
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
                                {this.draw.matches[7]?.secondCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[7]?.secondCompetitor?.personalDetails.surname}
                            </div>
                        </Col>
                        <Col>
                            <div className="border border-3 rounded m-3 competitorBox-inFullDraw d-none"/>
                        </Col>
                    </Row>
                    <Row>
                        <h1>Repasarze</h1>
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
                                {this.draw.matches[11]?.firstCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[11]?.firstCompetitor?.personalDetails.surname}
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
                                {this.draw.matches[11]?.winner?.personalDetails.name}
                                <br/>
                                {this.draw.matches[11]?.winner?.personalDetails.surname}
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
                                {this.draw.matches[11]?.secondCompetitor?.personalDetails.name}
                                <br/>
                                {this.draw.matches[11]?.secondCompetitor?.personalDetails.surname}
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
                </Container>
            )
    }

    results(): React.ReactNode {
        return (<>
        <Row>
            1. {this.draw.matches[1]?.winner?.personalDetails.name +" "+ this.draw.matches[1]?.winner?.personalDetails.surname}
        </Row>
        <Row>
            2. {this.draw.matches[1]?.looser?.personalDetails.name +" "+ this.draw.matches[1]?.looser?.personalDetails.surname}
        </Row>
        <Row>
            3. {this.draw.matches[8]?.winner?.personalDetails.name +" "+ this.draw.matches[8]?.winner?.personalDetails.surname}
        </Row>
        <Row>
            3. {this.draw.matches[9]?.winner?.personalDetails.name +" "+ this.draw.matches[9]?.winner?.personalDetails.surname}
        </Row>
        <Row>
            5. {this.draw.matches[8]?.looser?.personalDetails.name +" "+ this.draw.matches[8]?.looser?.personalDetails.surname}
        </Row>
        <Row>
            5. {this.draw.matches[9]?.looser?.personalDetails.name +" "+ this.draw.matches[9]?.looser?.personalDetails.surname}
        </Row>

        </>);
    }


}
