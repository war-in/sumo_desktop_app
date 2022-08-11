import {useLocation} from "react-router-dom";
import {Location} from "history";
import {Col, Container, Row} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Panel from "./Panel";

type LocationState = {
  weight: string,
  age: string,
  sex: string,
  nr: string
}

function TournamentDraw() {
  const location = useLocation();
  const {weight, age, sex, nr} = location.state as LocationState

  return (
    <Container className="tournament-container h-100">
      <h1 className="h-10 p-0 m-0">{weight}kg {age} {sex}</h1>
      <Row className="draw-row h-90">
        <Carousel variant={"dark"} interval={null} className={"carousel"}>
          <Carousel.Item>
            <h2 className="round">Round1</h2>
          </Carousel.Item>
          <Carousel.Item>
            <h2>Round2</h2>
          </Carousel.Item>
          <Carousel.Item>
            <h2>Finals</h2>
          </Carousel.Item>
        </Carousel>
      </Row>
      <Row className="panel">
        <Panel/>
      </Row>
    </Container>
  )
}

export default TournamentDraw;
