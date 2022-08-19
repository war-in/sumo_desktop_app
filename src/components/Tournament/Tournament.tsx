import React from 'react';
import {Container} from "react-bootstrap";
import PersonalDetails from "../../objects/PersonalDetails";
import Competitor from "../../objects/Competitor";
import Category from "../../objects/Category";
import RoundRobinDraw from "../../objects/fightModel/draws/RoundRobinDraw";

function Tournament() {
    console.log("tutaj");
    let competitors = []
    for (let i = 0; i < 5; i++) {
      let personal = new PersonalDetails(i,"kuba"+i,"nowakowski"+i,"1","1","1")
      let competitor = new Competitor(i,personal,"poland","jakiś",new Category("junir","men","115"),109)
      competitors.push(competitor)
    }
    let robin = new RoundRobinDraw(competitors)
    console.log(robin.matches)
    console.log(competitors)
    return (
        <Container className='tournament'>
            <h1>Tournament</h1>
        </Container>
    );
}

export default Tournament;