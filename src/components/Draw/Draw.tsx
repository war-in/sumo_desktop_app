import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import './Draw.css';
import MaterialTable from "material-table";
import {Box} from "@material-ui/core";

//TODO: fix onRowClick in categories table - setState function cancells togglePanel function
//TODO: add generating logic for Buttons and Combat view
//TODO: connect to backend

function Draw() {

    const [state, setState] = useState({buttonsVisible: false, combatsVisible: false});

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
            <Box className="category-details">
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
                        search: false,
                        detailPanelType: "single",
                        detailPanelColumnAlignment: "right",
                        detailPanelColumnStyle: { display: 'none'},
                    }}
                    onRowClick={(event, rowData, togglePanel) => {
                        togglePanel();
                        setState({buttonsVisible: true, combatsVisible: false})
                    }}
                    detailPanel={ rowData => {
                        return (<CategoryDetails/>)
                    }}
                />
            </Box>
        );
    }

    function GenerateCombatsButton() {
        return (
            <div>{state.buttonsVisible && <Button className="combat-button" variant="dark"
            onClick={() => {
                setState({buttonsVisible: false, combatsVisible: true});
            }}>Krzyżówka 15</Button>}</div>
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

    function Combat(){
        return (
            <Box className="combat">
                <Row className="detail">Para 1 A</Row>
                <Row className="detail">Para 1 B</Row>
            </Box>
        );
    }

    function Combats() {
        return (
            <div>{state.combatsVisible &&
                <Container className="combats">
                    <Row className="details-card">
                        <Col>
                            <Combat/>
                            <Combat/>
                            <Combat/>
                        </Col>
                        <Col>
                            <Combat/>
                            <Combat/>
                            <Combat/>
                        </Col>
                    </Row>
                </Container>
            }</div>
        );
    }

    return (
        <Container className='draw'>
            <h1 className="title">Draw</h1>
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