import React from "react";
import {Model} from "../Model";
import {Button, Col, Container, Row} from "react-bootstrap";
import Competitor from "../../../objects/Competitor";
import PersonalDetails from "../../../objects/PersonalDetails";
import Panel from "../Panel";

type Props = {
  model: Model
}

type Team = {
  name: string,
  competitors: Competitor[]
}

function generateTeam(competitors: Competitor[]) {
  return (
    competitors.map(competitor => {
      return (
        <Row>
          <Button>
            {competitor.personalDetails.name + ' ' + competitor.personalDetails.surname}
          </Button>
        </Row>
      )
    })
  )
}

const TeamFight: React.FC<Props> = (props) => {
  const team1: Team = {
    name: "lubzina",
    competitors: [
      new Competitor(1, new PersonalDetails(1, "Kuba", "Nowakowski", null, null, null), "Lubzina", "lubzina", null, null),
      new Competitor(2, new PersonalDetails(2, "Marcin", "Warchoł", null, null, null), "Lubzina", "lubzina", null, null),
      new Competitor(3, new PersonalDetails(3, "Gabi", "Erazmus", null, null, null), "Lubzina", "lubzina", null, null),
    ]
  }
  const team2: Team = {
    name: "debica",
    competitors: [
      new Competitor(4, new PersonalDetails(4, "Adam", "Nowak", null, null, null), "Lubzina", "lubzina", null, null),
      new Competitor(5, new PersonalDetails(5, "Piotr", "Stawarski", null, null, null), "Lubzina", "lubzina", null, null),
      new Competitor(6, new PersonalDetails(6, "Kasia", "Wyszyńska", null, null, null), "Lubzina", "lubzina", null, null),
    ]
  }

  console.log(team1)

  return (
    <Container className="team-fight">
      <h1 className="text-center">{team1.name + ' vs ' + team2.name}</h1>
      <Row>
        <Col className="col-6">
          {generateTeam(team1.competitors)}
        </Col>
        <Col className="col-6">
          {generateTeam(team2.competitors)}
        </Col>
      </Row>
      <Row className="reserve-players">
        <h2 className="text-center">Reserve players</h2>
        <Col className="col-6">
          <Button>Player1</Button>
        </Col>
        <Col className="col-6">
          <Button>Player2</Button>
        </Col>
      </Row>
      <Row>

      </Row>
    </Container>
  )
}

export default TeamFight;