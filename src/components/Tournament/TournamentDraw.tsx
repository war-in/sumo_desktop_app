import {useLocation} from "react-router-dom";
import {Location} from "history";
import {Col, Container, Row} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Panel from "./Panel";
import Slide from "./Slide";
import {useState} from "react";
import {DrawType, Model, RowData} from "./Model";


type LocationState = {
  rowData: RowData,
  drawType: DrawType
}

function slider(model: Model) {
  const slides = []

  for (let i=0; i < model.drawType.numberOfRounds; i++)
    slides.push(<Slide model={model} roundId={i}/>)

  return (
    <Carousel variant={"dark"} interval={null} className={"carousel"}>
      {slides.map(slide => {
        return (
          <Carousel.Item>
            {slide}
          </Carousel.Item>
      )})}
    </Carousel>
  )
}

function TournamentDraw() {
  const location = useLocation();
  const {rowData, drawType} = location.state as LocationState

  const [model, setModel] = useState<Model>(new Model(drawType, rowData, []));

  return (
    <Container className="tournament-container h-100">
      <h1 className="h-10 p-0 m-0">{rowData.weight}kg {rowData.age} {rowData.sex}</h1>
      <Row className="draw-row h-90">
        {slider(model)}
      </Row>
      <Row className="panel">
        <Panel model={model} drawType={drawType}/>
      </Row>
    </Container>
  )
}

export default TournamentDraw;
