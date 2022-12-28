import React from 'react';
import {Container} from "react-bootstrap";
import "./Tournament.css";
import CategoriesAtCompetition from "./CategoriesAtCompetition";
import Competition from "../../objects/Competition";

type Props = {
    competition?: Competition
}

const TournamentMenu: React.FC < Props > = (props: Props) => {

    return (
    <Container className='tournament'>
      <h1 className="text-center">Tournament</h1>
      <CategoriesAtCompetition competition={props.competition}/>
    </Container>
  );
}
export default TournamentMenu;
