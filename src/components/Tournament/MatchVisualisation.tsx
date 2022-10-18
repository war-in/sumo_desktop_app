import IndividualMatch from "../../objects/fightModel/IndividualMatch";
import {Col, Row} from "react-bootstrap";
import Competitor from "../../objects/Competitor";

type Props = {
    match: IndividualMatch
    mirrorView?: boolean
}

function competitors(firstCompetitor: Competitor | null, secondCompetitor: Competitor | null){
    return (
        <>
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
        </>
    )
}

function winner(winner: Competitor | null) {
    return (
        <>
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
        </>
    )
}

function fight(mirrorView: boolean, match: IndividualMatch) {
    const competitors_ = competitors(match?.firstCompetitor, match?.secondCompetitor)
    const winner_ = winner(match?.winner)
    return (
        <Row className={match.actualPlaying ? "border border-2 border-success" : ""}>
            <Col className={mirrorView ? "alignVertically" : ""}>
                {mirrorView ? winner_ : competitors_}
            </Col>
            <Col className={mirrorView ? "" : "alignVertically"}>
                {mirrorView ? competitors_ : winner_}
            </Col>
        </Row>
    )
}

const MatchVisualisation: React.FC<Props> = (props: Props) => {
    let mirrorView = true;
    if (props.mirrorView == undefined || !props.mirrorView) {
        mirrorView = false
    }

    return (
        fight(mirrorView, props.match)
    )

}
export default MatchVisualisation