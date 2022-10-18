import React from 'react';
import {Container} from "react-bootstrap";
import "./Tournament.css";
import CategoriesAtCompetition from "./CategoriesAtCompetition";


function TournamentMenu() {

  return (
    <Container className='tournament'>
      <h1 className="text-center">Tournament</h1>
      <CategoriesAtCompetition/>
    </Container>
  );
}
export default TournamentMenu;
