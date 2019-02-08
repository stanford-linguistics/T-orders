import React, { Component } from 'react';
import {
  OverlayTrigger,
  Popover,
  FormGroup,
  FormControl,
  Form,
  Button,
  Collapse,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

class TorderForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      openOptionalConfiguration: false,
      validated: false
    };
  }

  render() {
    const { openOptionalConfiguration } = this.state;
    const displayOptimizationMethodPopover = (
      <Popover id="popover-trigger-hover-focus" title="Optimization method">
        This is the popover text for the optimization method.
      </Popover>
    );
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
        <Form noValidate validated={this.state.validated}>
          <FormGroup controlId="torderNameControls">
            <Form.Label>Name (Optional)</Form.Label>
            <FormControl
              type="text"
              name="name"
              onChange={this.props.handleInputChange}
              placeholder="Enter a name for this t-order"
            />
          </FormGroup>
          <FormGroup>
            <Container>
              <Row>
                <Col>
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
                </Col>
                <Col>
                  <a href={process.env.PUBLIC_URL + '/sample.xls'} download>
                    Sample input file
                  </a>
                </Col>
              </Row>
            </Container>

            <Form.Control
              type="file"
              required
              accept="application/vnd.ms-excel"
              onChange={this.props.addFile}
            />
          </FormGroup>

          <br />
          <Button
            variant="link"
            onClick={() =>
              this.setState({
                openOptionalConfiguration: !openOptionalConfiguration
              })
            }
            aria-controls="optional-configuration"
            aria-expanded={openOptionalConfiguration}>
            Optional Configuration
          </Button>
          <Collapse in={this.state.openOptionalConfiguration}>
            <Container id="optional-configuration">
              <hr />
              <Form.Group controlId="torderForm.optimizationMethod">
                <Form.Label>Optimization method</Form.Label>
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="right"
                  overlay={displayOptimizationMethodPopover}>
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="torder-info-icon"
                  />
                </OverlayTrigger>
                <Form.Control
                  defaultValue="simplex"
                  as="select"
                  name="optimizationMethod"
                  onChange={this.props.handleInputChange}>
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
                  name="candidatesBound"
                  onChange={this.props.handleInputChange}
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
                  name="numTrials"
                  onChange={this.props.handleInputChange}
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
                  name="weightBound"
                  onChange={this.props.handleInputChange}
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
                  checked={this.props.hgMappingsOnly}
                  onChange={this.props.handleCheckBoxChanged}
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
                  checked={this.props.displayArrows}
                  onChange={this.props.handleCheckBoxChanged}
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
            </Container>
          </Collapse>
        </Form>
      </div>
    );
  }
}

export default TorderForm;
