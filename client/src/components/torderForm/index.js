import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  Form,
  Button,
  Collapse,
  Container,
  Row,
  Col
} from 'react-bootstrap';

import QuestionTooltip from '../questionTooltip';
import OptionalConfigForm from '../optionalConfigForm';

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
                  <QuestionTooltip title="Input file">
                    <em>The input file must be in an excel format.</em>
                    <br />
                    Please refer to the documentation for how to format the
                    excel file.
                  </QuestionTooltip>
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
              <OptionalConfigForm
                preferredSettings={this.props.preferredSettings}
                handleInputChange={this.props.handleInputChange}
                handleCheckBoxChanged={this.props.handleCheckBoxChanged}
                optimizationMethod={this.props.optimizationMethod}
                candidatesBound={this.props.candidatesBound}
                numTrials={this.props.numTrials}
                weightBound={this.props.weightBound}
                hgMappingsOnly={this.props.hgMappingsOnly}
                displayArrows={this.props.displayArrows}
              />
            </Container>
          </Collapse>
        </Form>
      </div>
    );
  }
}

export default TorderForm;
