import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function RemoveModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm remove</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemoveModal;
