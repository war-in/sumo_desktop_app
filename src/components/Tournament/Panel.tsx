import {Button, Col, Container, Row} from "react-bootstrap";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {DrawType, Model} from "./Model";
import React from "react";

type Props = {
  model: Model,
  drawType: DrawType,
}

const Panel: React.FC<Props> = (props) => {
  return (
    <Container>
      <Row className="h-100">
        <Col className="col-2">
          <IoIosArrowDown size={60}/>
        </Col>
        <Col className="col-8">
          <Row>
            <Col>
              <Button className="panel-button-current" onClick={ () => {
                props.drawType.roundNames[0] = "zmiana"
              }
              }>Marcin Warchoł</Button>
            </Col>
            <Col>
              <Button className="panel-button-current">Jakub Nowakowski</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="panel-button-next" style={{float: "right"}}>Adam Nowak</Button>
            </Col>
            <Col>
              <Button className="panel-button-next" style={{float: "left"}}>Gabriela Erazmus</Button>
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