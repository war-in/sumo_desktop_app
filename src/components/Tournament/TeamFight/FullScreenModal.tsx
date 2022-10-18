import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import React from "react";

type Props = {
    show: boolean,
    onHide: () => void
    content:React.ReactNode
    header:string
}
const FullScreenModal: React.FC<Props> = (props: Props) => {

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            fullscreen={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.content}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default FullScreenModal