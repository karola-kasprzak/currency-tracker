import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function RemoveButton(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleConfirm = () => {
        props.confirmAction();
        setShow(false);
    };

    const trashIcon = <i className="fa fa-trash" aria-hidden="true" />;
    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                {props.description ? props.description : trashIcon}
            </Button>

            <Modal animation={false} show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm remove</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.currencyCode
                        ? `Do you want to remove ${props.currencyCode} from the list?`
                        : `Do you want to remove everything?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemoveButton;
