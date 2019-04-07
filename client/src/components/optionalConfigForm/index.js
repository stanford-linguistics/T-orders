import React from 'react';
import { Container, Form, FormGroup, FormControl } from 'react-bootstrap';
import QuestionTooltip from '../questionTooltip';

function OptionalConfigForm(props) {
  return (
    <Container id="optional-configuration">
      <hr />

      <Form.Group controlId="torderForm.optimizationMethod">
        <Form.Label>Optimization method</Form.Label>
        <QuestionTooltip title="Optimization method">
          This is the popover text for the optimization method.
        </QuestionTooltip>
        <Form.Control
          required
          as="select"
          name="optimizationMethod"
          value={props.optimizationMethod}
          onChange={props.handleInputChange}>
          <option>simplex</option>
          <option>interior-point</option>
        </Form.Control>
      </Form.Group>

      <FormGroup controlId="candidatesBoundControls">
        <Form.Label>Bound on number of candidates</Form.Label>
        <QuestionTooltip title="Bound on number of candidates">
          This is the popover text for the Bound on number of candidates.
        </QuestionTooltip>

        <FormControl
          required
          min={1}
          type="number"
          name="candidatesBound"
          value={props.candidatesBound}
          onChange={props.handleInputChange}
          placeholder="Enter bound"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a value greater than 0.
        </Form.Control.Feedback>
      </FormGroup>

      <FormGroup controlId="numTrialsControls">
        <Form.Label>Number of trials</Form.Label>
        <QuestionTooltip title="Number of trials">
          This is the popover text for the Number of trials.
        </QuestionTooltip>

        <FormControl
          required
          min={1}
          type="number"
          name="numTrials"
          value={props.numTrials}
          onChange={props.handleInputChange}
          placeholder="Enter number of trials"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a value greater than 0.
        </Form.Control.Feedback>
      </FormGroup>

      <FormGroup controlId="weightBoundControls">
        <Form.Label>Weight bound</Form.Label>
        <QuestionTooltip title="Weight bound">
          This is the popover text for the Weight bound.
        </QuestionTooltip>
        <FormControl
          required
          min={1}
          name="weightBound"
          onChange={props.handleInputChange}
          type="number"
          value={props.weightBound}
          placeholder="Enter weight bound"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a value greater than 0.
        </Form.Control.Feedback>
      </FormGroup>

      <FormGroup>
        <Form.Check
          id="hgMappingsOnlyCheckbox"
          name="hgMappingsOnly"
          type="checkbox"
          label="Hg feasible mappings only"
          inline
          checked={props.hgMappingsOnly}
          onChange={props.handleCheckBoxChanged}
        />
        <QuestionTooltip title="HG feasible mappings only">
          This is the popover text for the HG feasible mappings only field.
        </QuestionTooltip>
      </FormGroup>

      <FormGroup>
        <Form.Check
          name="displayArrows"
          id="displayArrowsCheckbox"
          type="checkbox"
          label="Display arrows entailed by transitivity"
          inline
          checked={props.displayArrows}
          onChange={props.handleCheckBoxChanged}
        />
        <QuestionTooltip title="Display arrows entailed by transitivity">
          This is the popover text for the display arrows field.
        </QuestionTooltip>
      </FormGroup>
    </Container>
  );
}

export default OptionalConfigForm;
