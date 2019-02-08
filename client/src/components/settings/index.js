import React, { Component } from 'react';
import {
  OverlayTrigger,
  Popover,
  FormGroup,
  Form,
  Button,
  Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { setDeleteExpiredTorders } from '../../modules/settings';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Settings extends Component {
  constructor(props, context) {
    super(props, context);

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      showModal: false
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleCheckBoxChanged = e => {
    this.props.setDeleteExpiredTorders(e.target.checked);
  };

  render() {
    const displayDeleteExpiredPopover = (
      <Popover id="popover-trigger-hover-focus" title="Delete expired t-orders">
        This is the popover text for the displayDeleteExpiredPopover.
      </Popover>
    );
    return (
      <>
        <Button className="torder-compute-btn" onClick={this.toggleModal}>
          <FontAwesomeIcon icon={faCog} />
        </Button>

        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <FormGroup>
                <Form.Check
                  name="shouldDeleteExpiredTorders"
                  id="deleteExpiredCheckbox"
                  type="checkbox"
                  label="Automatically delete expired t-orders"
                  inline
                  checked={this.props.shouldDeleteExpiredTorders}
                  onChange={this.handleCheckBoxChanged}
                />
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="right"
                  overlay={displayDeleteExpiredPopover}>
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="torder-info-icon"
                  />
                </OverlayTrigger>
              </FormGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({ settings }) => ({
  shouldDeleteExpiredTorders: settings.deleteExpiredTorders
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setDeleteExpiredTorders }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
