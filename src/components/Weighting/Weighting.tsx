import React from 'react';
import {Container} from "react-bootstrap";
import Competitors from "./Competitors";
import CompetitorDetails from "./CompetitorDetails";
import Categories from "./Categories";
import './Competitors.css';
import './Categories.css';

function Weighting() {
  console.log("tutaj");
  return (
    <Container className='weighting'>
        <CompetitorDetails/>
        <Container className='competitors'>
            <Competitors/>
        </Container>
        <Container className='categories'>
            <Categories/>
        </Container>
    </Container>
  );
}

export default Weighting;