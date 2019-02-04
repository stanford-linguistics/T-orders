import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import TorderForm from '../torderForm';

class TorderModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Button
          variant="primary"
          className="torder-compute-btn"
          onClick={this.handleShow}>
          <span>Compute T-order</span>
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Compute T-order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TorderForm />
          </Modal.Body>
          <Modal.Footer>
            <Button className="torder-compute-btn" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default TorderModal;
