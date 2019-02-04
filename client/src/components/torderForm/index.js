import React, { Component } from 'react';
import {
  OverlayTrigger,
  Popover,
  FormGroup,
  FormControl,
  Form
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

class TorderForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      open: false,
      hgMappingsOnly: false,
      displayArrows: false
    };
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleCheckBoxChanged = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  render() {
    const displayInputFilePopover = (
      <Popover id="popover-trigger-hover-focus" title="Input file">
        <em>The input file must be in an excel format.</em>
        <br />
        Please refer to the documentation for how to format the excel file.
      </Popover>
    );
    const displayCandidatesBoundPopover = (
      <Popover
        id="popover-trigger-hover-focus"
        title="Bound on number of candidates">
        This is the popover text for the Bound on number of candidates.
      </Popover>
    );
    const displayNumTrialsPopover = (
      <Popover id="popover-trigger-hover-focus" title="Number of trials">
        This is the popover text for the Number of trials.
      </Popover>
    );
    const displayWeightBoundPopover = (
      <Popover id="popover-trigger-hover-focus" title="Weight bound">
        This is the popover text for the Weight bound.
      </Popover>
    );
    const displayHGMappingsPopover = (
      <Popover
        id="popover-trigger-hover-focus"
        title="HG feasible mappings only">
        This is the popover text for the HG feasible mappings only field.
      </Popover>
    );
    const displayDisplayArrowsPopover = (
      <Popover id="popover-trigger-hover-focus" title="Display arrows">
        This is the popover text for the display arrows field.
      </Popover>
    );
    return (
      <div>
        <form>
          <FormGroup controlId="torderNameControls">
            <Form.Label>Name</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter a name for this T-order"
            />
          </FormGroup>
          <FormGroup controlId="torderDescriptionControls">
            <Form.Label>Description</Form.Label>
            <FormControl
              componentClass="textarea"
              placeholder="Enter description"
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Input file</Form.Label>

            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={displayInputFilePopover}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="torder-info-icon"
              />
            </OverlayTrigger>
            <a href={process.env.PUBLIC_URL + '/sample.txt'} download>
              Sample input file
            </a>
            <Form.Control type="file" />
          </FormGroup>

          <br />
          <Form.Group controlId="torderForm.optimizationMethod">
            <Form.Label>Optimization method</Form.Label>
            <Form.Control defaultValue="simplex" as="select">
              <option>simplex</option>
              <option>interior-point</option>
            </Form.Control>
          </Form.Group>
          <FormGroup controlId="candidatesBoundControls">
            <Form.Label>Bound on number of candidates</Form.Label>
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={displayCandidatesBoundPopover}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="torder-info-icon"
              />
            </OverlayTrigger>
            <FormControl
              defaultValue={10}
              min={0}
              type="number"
              placeholder="Enter bound"
            />
          </FormGroup>
          <FormGroup controlId="numTrialsControls">
            <Form.Label>Number of trials</Form.Label>
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={displayNumTrialsPopover}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="torder-info-icon"
              />
            </OverlayTrigger>
            <FormControl
              defaultValue={1000}
              min={0}
              type="number"
              placeholder="Enter number of trials"
            />
          </FormGroup>
          <FormGroup controlId="weightBoundControls">
            <Form.Label>Weight bound</Form.Label>
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={displayWeightBoundPopover}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="torder-info-icon"
              />
            </OverlayTrigger>
            <FormControl
              defaultValue={20}
              min={0}
              type="number"
              placeholder="Enter weight bound"
            />
          </FormGroup>
          <FormGroup>
            <Form.Check
              id="hgMappingsOnlyCheckbox"
              name="hgMappingsOnly"
              type="checkbox"
              label="Hg feasible mappings only"
              inline
              checked={this.state.hgMappingsOnly}
              onChange={this.handleCheckBoxChanged}
            />
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={displayHGMappingsPopover}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="torder-info-icon"
              />
            </OverlayTrigger>
          </FormGroup>
          <FormGroup>
            <Form.Check
              name="displayArrows"
              id="displayArrowsCheckbox"
              type="checkbox"
              label="Display arrows"
              inline
              checked={this.state.displayArrows}
              onChange={this.handleCheckBoxChanged}
            />
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="right"
              overlay={displayDisplayArrowsPopover}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="torder-info-icon"
              />
            </OverlayTrigger>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default TorderForm;
