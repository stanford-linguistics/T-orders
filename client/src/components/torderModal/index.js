import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function TorderModal(props) {
  return (
    <div>
      <Button
        variant="primary"
        className="torder-compute-btn"
        onClick={props.toggleModal}>
        <span>Compute T-order</span>
      </Button>
      <Modal
        show={props.showModal}
        onHide={props.toggleModal}
        keyboard={false}
        backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Compute T-order</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button className="torder-compute-btn" onClick={props.toggleModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="torder-compute-btn"
            disabled={props.shouldDisableSubmit()}
            onClick={props.submitTorderRequest}>
            <span>Submit</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TorderModal;
