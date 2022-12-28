import React, {useState} from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {HashRouter} from "react-router-dom";
import {Route, Routes} from 'react-router';
import Home from './components/Home/Home';
import Draw from './components/Draw/Draw';
import TournamentMenu from './components/Tournament/TournamentMenu';
import Weighting from './components/Weighting/Weighting';
import Reports from './components/Reports/Reports';
import {Col, Container, Row} from "react-bootstrap";
import TournamentDraw from "./components/Tournament/TournamentDraw";
import Competition from "./objects/Competition";


export function App() {
    const [selectedCompetition, setSelectedCompetition] = useState(new Competition(null, null, null, null,null));
    return (
        <>
            <HashRouter>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <Container fluid className="p-0 overflow-hidden main-container">
                    <Row className="h-97">
                        <Col className="col-1 p-0">
                            <Row>
                                <Col className="col-7 p-0">
                                    <Navbar/>
                                </Col>
                                <Col className="col-5 ">
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-11 p-0">
                            <Routes>
                                <Route path='/' element={<Home setSelectedCompetition={setSelectedCompetition}/>}/>
                                <Route path='/draw' element={<Draw competition={selectedCompetition}/>}/>
                                <Route path='/reports' element={<Reports/>}/>
                                <Route path='/tournament' element={<TournamentMenu competition={selectedCompetition}/>}/>
                                <Route path='/weighting' element={<Weighting competition={selectedCompetition}/>}/>
                                <Route path='/tournament-draw' element={<TournamentDraw />}/>
                            </Routes>
                        </Col>
                    </Row>
                    <Row className={"h-3 text-center justify-content-center"}>
                        {selectedCompetition?.name}
                    </Row>
                </Container>
            </HashRouter>
        </>

    )
}