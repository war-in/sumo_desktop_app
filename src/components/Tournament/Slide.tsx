import React from "react";
import {Model} from "./Model";
import {Round} from "../../objects/fightModel/Round";
import {Col, Container, Row} from "react-bootstrap";
import Competitor from "../../objects/Competitor";

type Props = {
  model: Model,
  roundId: number
}

const Slide: React.FC<Props> =  (props) => {
  const name: string = props.model.drawType.roundNames[props.roundId];
  const roundData: Round = props.model.draw.rounds[props.roundId];
  // @ts-ignore
  const numOfFights: number = 10;
  const competitors: Competitor[] = props.model.draw.competitors;
  return (
    <Container>
      <h2>{name}</h2>
      <Row>
        <Col className="col-3">
          <h3>"tu"</h3>
        </Col>
        <Col className="col-3">
          <h3>"tu"</h3>
        </Col>
        <Col className="col-3">
          <h3>"tu"</h3>
        </Col>
        <Col className="col-3">
          <h3>"tu"</h3>
        </Col>
      </Row>
    </Container>
  )
}

export default Slide;