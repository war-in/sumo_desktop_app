import React from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {
  HashRouter
} from "react-router-dom";
import { Route, Routes} from 'react-router';
import Home from './components/Home/Home';
import Draw from './components/Draw/Draw';
import TournamentMenu from './components/Tournament/TournamentMenu';
import Weighting from './components/Weighting/Weighting';
import Reports from './components/Reports/Reports';
import {Col, Container, Row} from "react-bootstrap";
import TournamentDraw from "./components/Tournament/TournamentDraw";
import TeamFight from "./components/Tournament/TeamFight/TeamFight";


export function App() {

  return (
    <HashRouter>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <Container fluid className="p-0 overflow-hidden main-container">
        <Row className="h-100">
          <Col className="col-1 p-0">
            <Row>
            <Col className="col-7 p-0">
              <Navbar />
            </Col>
            <Col className="col-5 ">
            </Col>
            </Row>
          </Col>
          <Col className="col-11 p-0">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/draw' element={<Draw />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/tournament' element={<TournamentMenu />} />
              <Route path='/weighting' element={<Weighting />} />
              <Route path='/tournament-draw' element={<TournamentDraw />} />
              <Route path='/team-fight' element={<TeamFight model=""/>} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </HashRouter>
  )
}