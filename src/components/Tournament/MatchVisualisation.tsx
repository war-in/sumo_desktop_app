import IndividualMatch from "../../objects/fightModel/IndividualMatch";
import {Col, Row} from "react-bootstrap";

type Props = {
    match: IndividualMatch
    active?: boolean
    mirrorView?: boolean
    showWinner?: boolean
}

const MatchVisualisation: React.FC<Props> = (props: Props) => {

    let mirrorView = true;
    let showWinner = false;

    if (props.mirrorView == undefined) {
        console.log("to mirror draw")
        console.log(props.mirrorView)
        mirrorView = false
    }
    if (props.showWinner == undefined) {
        showWinner = true
    }

    return (
        <>
            {
                mirrorView ?
                    (
                        <div className={props.match.actualPlaying ? "border-bottom border-2 border-success" : ""}>
                            <Row className="row-2 ">
                                <Col className="col-2"/>
                                <Col className="col-2">
                                    <div className="border border-3 rounded m-3 competitorBox">
                                        <>
                                            {props.match.firstCompetitor?.personalDetails.name}
                                            <br/>
                                            {props.match.firstCompetitor?.personalDetails.surname}
                                        </>

                                    </div>
                                </Col>
                            </Row>
                            {
                                showWinner ? (
                                    <Row>
                                        <Col className="col-2">
                                            <div className="border border-3 rounded m-3 competitorBox">
                                                {props.match?.winner?.personalDetails.name}
                                                <br/>
                                                {props.match?.winner?.personalDetails.surname}
                                            </div>
                                        </Col>
                                    </Row>
                                ) : ""
                            }
                            <Row>
                                <Col className="col-2"/>
                                <Col className="col-2">
                                    <div className="border border-3 rounded m-3 competitorBox">
                                        <>
                                            {props.match.secondCompetitor?.personalDetails.name}
                                            <br/>
                                            {props.match.secondCompetitor?.personalDetails.surname}
                                        </>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) :
                    (<div className={props.match.actualPlaying ? "border-bottom border-2 border-success" : ""}>
                        <Row className="row-2 ">
                            <Col className="col-2">
                                <div className="border border-3 rounded m-3 competitorBox">
                                    <>
                                        {props.match.firstCompetitor?.personalDetails.name}
                                        <br/>
                                        {props.match.firstCompetitor?.personalDetails.surname}
                                    </>

                                </div>
                            </Col>
                        </Row>
                        {
                            showWinner ? (
                                <Row>
                                    <Col className="col-2"/>
                                    <Col className="col-2">
                                        <div className="border border-3 rounded m-3 competitorBox">
                                            {props.match?.winner?.personalDetails.name}
                                            <br/>
                                            {props.match?.winner?.personalDetails.surname}
                                        </div>
                                    </Col>
                                </Row>
                            ) : ""
                        }
                        <Row>
                            <Col className="col-2">
                                <div className="border border-3 rounded m-3 competitorBox">
                                    <>
                                        {props.match.secondCompetitor?.personalDetails.name}
                                        <br/>
                                        {props.match.secondCompetitor?.personalDetails.surname}
                                    </>
                                </div>
                            </Col>
                        </Row>
                    </div>)
            }

        </>
    )

}
export default MatchVisualisation