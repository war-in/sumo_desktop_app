import React from 'react';
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

function Draw() {

    function GenerateCombatsButton(){
        return (
            <Button variant="dark">Dark</Button>
        );
    }

    function Combats() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th colSpan={2}>Combats</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Jakub Nowakowski</td>
                    <td>Marcin Warchoł</td>
                </tr>
                <tr>
                    <td>Jakub Nowakowski</td>
                    <td>Marcin Warchoł</td>
                </tr>
                <tr>
                    <td>Jakub Nowakowski</td>
                    <td>Marcin Warchoł</td>
                </tr>
                <tr>
                    <td>Jakub Nowakowski</td>
                    <td>Marcin Warchoł</td>
                </tr>
                <tr>
                    <td>Jakub Nowakowski</td>
                    <td>Marcin Warchoł</td>
                </tr>
                <tr>
                    <td>Jakub Nowakowski</td>
                    <td>Marcin Warchoł</td>
                </tr>
                </tbody>
            </Table>
        );
    }

    function ContainerFluid() {
        return (
            <Container>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
        );
    }

    function Header(){
        return (
            <Alert variant={'dark'}>
                <Container>
                    <Row>
                        <Col>Weight</Col>
                        <Col>Age</Col>
                        <Col>Sex</Col>
                        <Col>Nr of competitors</Col>
                    </Row>
                </Container>
            </Alert>
        );
    }

    function CustomAccordionItem(props){
        return (
            <Accordion.Item eventKey={props.eventKey}>
                <Accordion.Header>
                    <ContainerFluid/>
                </Accordion.Header>
                <Accordion.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        </tbody>
                    </Table>
                    <GenerateCombatsButton/>
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function Categories() {
        return (
        <Accordion defaultActiveKey="">
            <CustomAccordionItem eventKey={0}/>
            <CustomAccordionItem eventKey={1}/>
            <CustomAccordionItem eventKey={2}/>
            <CustomAccordionItem eventKey={3}/>
            <CustomAccordionItem eventKey={4}/>
            <CustomAccordionItem eventKey={5}/>
        </Accordion>);
    }

    return (
    <Container className='draw'>
        <Row>
            <Col className="col-7">
                <Header/>
                <Categories/>
            </Col>
            <Col className="col-5">
                <Combats/>
            </Col>
        </Row>
    </Container>
  );
}

export default Draw;