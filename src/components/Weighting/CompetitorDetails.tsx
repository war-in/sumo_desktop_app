import React from 'react';
import './CompetitorDetails.css';
import {Box, Input} from "@material-ui/core";
import {Image, Row} from "react-bootstrap";

function CompetitorDetails() {
    return (
        <Box className="details-card">
            <Image className="photo" src="https://exnessin.com/img/avatar-blank.png"/>
            <Box className="details">
                <Row className="detail"><Box className="detail-text">Name</Box></Row>
                <Row className="detail"><Box className="detail-text">Birthdate</Box></Row>
                <Row className="detail"><Box className="detail-text">Country</Box></Row>
                <Row className="detail"><Box className="detail-text">Club</Box></Row>
                <Row className="detail"><Box className="detail-text">Sex</Box></Row>
                <Box className="detail-text">Weight:</Box>
                <Input className="weight-input"></Input>
            </Box>
        </Box>
    );
}

export default CompetitorDetails;