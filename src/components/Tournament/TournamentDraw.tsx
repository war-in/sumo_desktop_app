import {useLocation} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Panel from "./Panel";
import Slide from "./Slide";
import {useState} from "react";
import {DrawFromDatabase, Model, RowData} from "./Model";
// @ts-ignore
import competitors from "../../mocks/CompetitorsAtCategory.json";
import Competitor from "../../objects/Competitor";
import PersonalDetails from "../../objects/PersonalDetails";


type LocationState = {
  rowData: RowData,
  drawFromDatabase: DrawFromDatabase
}

function slider(model: Model) {
  const slides = []

  console.log(model)

  for (let i=0; i < model.drawFromDatabase.drawType.numberOfRounds; i++)
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

function createCompetitors(competitors: Competitor[]) {
  return (
    competitors.map(competitor => {

      const personal_details = new PersonalDetails(competitor.personalDetails.id, competitor.personalDetails.name, competitor.personalDetails.surname, null, null, null);
      return new Competitor(competitor.id, personal_details, null, null, null, null);
    })
  )

}

function TournamentDraw() {
  const location = useLocation();
  const {rowData, drawFromDatabase} = location.state as LocationState

  const [model, setModel] = useState<Model>(new Model(drawFromDatabase, rowData, createCompetitors(competitors)));

  console.log(model)

  return (
    <Container className="tournament-container h-100">
      <h1 className="h-10 p-0 m-0">{rowData.weight}kg {rowData.age} {rowData.sex}</h1>
      <Row className="draw-row h-90">
        {slider(model)}
      </Row>
      <Row className="panel">
        <Panel model={model} setModel={setModel}/>
      </Row>
    </Container>
  )
}

export default TournamentDraw;
