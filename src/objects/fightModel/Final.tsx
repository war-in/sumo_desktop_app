import IndividualMatch from "./IndividualMatch";
import {Col, Row} from "react-bootstrap";

type Props = {
    match: IndividualMatch
}

const Final: React.FC<Props> = (props: Props) => {
    const winner = props.match.winner
    const firstCompetitor = props.match.firstCompetitor
    const secondCompetitor = props.match.secondCompetitor
    return (
        <Row>
            <Col>
                <div className="border border-3 rounded m-3 competitorBox">
                    {
                        firstCompetitor != null ?
                            <>
                                {firstCompetitor?.personalDetails?.name + ' ' +
                                    firstCompetitor?.personalDetails?.surname}
                            </>
                            : ""
                    }
                </div>
            </Col>
            <Col>
                <div className="border border-3 rounded m-3 winnerBox">
                    {
                        winner != null ?
                            <>
                                {winner?.personalDetails?.name + ' ' +
                                    winner?.personalDetails?.surname}
                            </>
                            : ""
                    }
                </div>
            </Col>
            <Col>
                <div className="border border-3 rounded m-3 competitorBox">
                    {
                        secondCompetitor != null ?
                            <>
                                {secondCompetitor?.personalDetails?.name + ' ' +
                                    secondCompetitor?.personalDetails?.surname}
                            </>
                            : ""
                    }
                </div>
            </Col>
        </Row>
    )

}
export default Final