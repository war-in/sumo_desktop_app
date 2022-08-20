import {Button, Col, Container, Row} from "react-bootstrap";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {Model} from "./Model";
import React from "react";

type Props = {
  model: Model,
  setModel: React.Dispatch<React.SetStateAction<Model>>
}

const Panel: React.FC<Props> = (props) => {

  console.log(props.model.draw.matches)

  const currenFightId = props.model.draw.actualFightIndex;
  const firstCompetitor = props.model.draw.matches[currenFightId].firstCompetitor
  const secondCompetitor = props.model.draw.matches[currenFightId].secondCompetitor

  const nextFirstCompetitor = props.model.draw.matches[currenFightId+1].firstCompetitor
  const nextSecondCompetitor = props.model.draw.matches[currenFightId+1].secondCompetitor

  console.log(firstCompetitor);
  console.log(secondCompetitor);

  return (
    <Container>
      <Row className="h-100">
        <Col className="col-2">
          <IoIosArrowDown size={60}/>
        </Col>
        <Col className="col-8">
          <Row>
            <Col>
              <Button className="panel-button-current">
                {firstCompetitor.personalDetails.name + '' + firstCompetitor.personalDetails.surname}
              </Button>
            </Col>
            <Col>
              <Button className="panel-button-current">
                {secondCompetitor.personalDetails.name + '' + secondCompetitor.personalDetails.surname}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="panel-button-next" style={{float: "right"}}>
                {nextFirstCompetitor.personalDetails.name + '' + nextFirstCompetitor.personalDetails.surname}
              </Button>
            </Col>
            <Col>
              <Button className="panel-button-next" style={{float: "left"}}>
                {nextSecondCompetitor.personalDetails.name + '' + nextSecondCompetitor.personalDetails.surname}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col className="col-2">
          <IoIosArrowUp size={60}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Panel;