import React from 'react';
import {Container} from "react-bootstrap";
import "./Tournament.css";
import CategoriesAtCompetition from "./CategoriesAtCompetition";
import RoundRobinDraw from "../../objects/fightModel/draws/RoundRobinDraw";
import competitors from "../../mocks/CompetitorsAtCategory.json";
import Competitor from "../../objects/Competitor";


function TournamentMenu() {

    let draw = new RoundRobinDraw(competitors as Competitor[])
    console.log(draw.rounds)

  return (
    <Container className='tournament'>
      <h1 className="text-center">Tournament</h1>
      <CategoriesAtCompetition/>
    </Container>
  );
}

export default TournamentMenu;
