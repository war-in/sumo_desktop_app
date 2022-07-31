import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import './Draw.css';
import MaterialTable from "material-table";
import {Box} from "@material-ui/core";

function Draw() {

    const [state, setState] = useState({rowSelected: false, combatsGenerated: false});

    function CategoryDetails() {
        const Columns = [
            {"title": undefined, "field": "id"},
            {"title": undefined, "field": "name"},
            {"title": undefined, "field": "club"},
        ]

        const dataset = [{
            id: 1,
            name: "Jakub Nowakowski",
            club: "LUKS Lubzina"
        }, {
            id: 1,
            name: "Jakub Nowakowski",
            club: "LUKS Lubzina"
        }, {
            id: 1,
            name: "Jakub Nowakowski",
            club: "LUKS Lubzina"
        }, {
            id: 1,
            name: "Jakub Nowakowski",
            club: "LUKS Lubzina"
        }];

        return (
            <Box>
                <MaterialTable
                    title=""
                    columns={Columns}
                    data={dataset}
                    options={{
                        header: false,
                        toolbar: false,
                        paging: false,
                        sorting: false
                    }}
                />
            </Box>
        );
    }

    function Categories() {
        const Columns = [
            {"title": "Weight", "field": "weight"},
            {"title": "Age", "field": "age"},
            {"title": "Sex", "field": "sex"},
            {"title": "Nr of competitors", "field": "nr"},
        ]

        const dataset = [{
            weight: 60,
            age: "Junior",
            sex: "Female",
            nr: 15
        }, {
            weight: 60,
            age: "Junior",
            sex: "Female",
            nr: 15
        }, {
            weight: 60,
            age: "Junior",
            sex: "Female",
            nr: 15
        }, {
            weight: 60,
            age: "Junior",
            sex: "Female",
            nr: 15
        }];

        return (
            <Box className="categories">
                <MaterialTable
                    title="Categories"
                    columns={Columns}
                    data={dataset}
                    options={{
                        doubleHorizontalScroll: true,
                        maxBodyHeight: 500,
                        search: false
                    }}
                    onRowClick={() => {
                        setState({rowSelected: true, combatsGenerated: false})
                    }}
                    detailPanel={() => {
                        return (
                            <CategoryDetails/>
                        )
                    }}
                />
            </Box>
        );
    }

    function GenerateCombatsButton() {
        return (
            <div>{state.rowSelected && <Button className="combat-button" variant="dark"
            onClick={() => {
                setState({rowSelected: false, combatsGenerated: true});
            }}>Krzyżówka 15</Button>}</div>
        );
    }

    function Combats() {
        return (
            <div>{state.combatsGenerated &&
                <Box className="details-card">
                    <Box className="combat">
                        <Row className="detail-row">
                            <Col className="detail">A</Col>
                            <Col className="detail">A</Col>
                        </Row>
                        <Row className="details-row">
                            <Col className="detail">B</Col>
                            <Col className="detail">B</Col>
                        </Row>
                    </Box>
                    <Box className="combat">
                        <Row className="detail-row">
                            <Col className="detail">A</Col>
                            <Col className="detail">A</Col>
                        </Row>
                        <Row className="details-row">
                            <Col className="detail">B</Col>
                            <Col className="detail">B</Col>
                        </Row>
                    </Box>
                    <Box className="combat">
                        <Row className="detail-row">
                            <Col className="detail">A</Col>
                            <Col className="detail">A</Col>
                        </Row>
                        <Row className="details-row">
                            <Col className="detail">B</Col>
                            <Col className="detail">B</Col>
                        </Row>
                    </Box>
                    <Box className="combat">
                        <Row className="detail-row">
                            <Col className="detail">A</Col>
                            <Col className="detail">A</Col>
                        </Row>
                        <Row className="details-row">
                            <Col className="detail">B</Col>
                            <Col className="detail">B</Col>
                        </Row>
                    </Box>
                </Box>
            }</div>
        );
    }

    function GenerateCombatsButtons() {
        return (
            <Box className="combats">
                <GenerateCombatsButton/>
                <GenerateCombatsButton/>
                <GenerateCombatsButton/>
            </Box>
        );
    }

    return (
        <Container className='draw'>
            <Row>
                <Col className="col-6">
                    <Categories/>
                </Col>
                <Col className="col-5">
                    <GenerateCombatsButtons/>
                    <Combats/>
                </Col>
            </Row>
        </Container>
    );
}

export default Draw;