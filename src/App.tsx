import React from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {
  HashRouter
} from "react-router-dom";
import { Route, Routes} from 'react-router';
import Home from './components/Home/Home';
import Draw from './components/Draw/Draw';
import Tournament from './components/Tournament/Tournament';
import Weighting from './components/Weighting/Weighting';
import Reports from './components/Reports/Reports';
import {Col, Container, Row} from "react-bootstrap";


export function App() {

  return (
    <HashRouter>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <Container fluid className="p-0 overflow-hidden">
        <Row>
          <Col className="col-1 ">
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
              <Route path='/tournament' element={<Tournament />} />
              <Route path='/weighting' element={<Weighting />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </HashRouter>
  )
}