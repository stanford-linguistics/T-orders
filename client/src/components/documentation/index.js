import React from 'react';
import { Tab, Row, Col, ListGroup, Container } from 'react-bootstrap';

const Documentation = () => (
  <Container className="torder-docs">
    <Tab.Container
      id="list-group-tabs-example"
      defaultActiveKey="#introduction">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#introduction">
              Introduction
            </ListGroup.Item>
            <ListGroup.Item action href="#gettingStarted">
              Getting Started
            </ListGroup.Item>
            <ListGroup.Item action href="#glossary">
              Glossary
            </ListGroup.Item>
            <ListGroup.Item action href="#references">
              References
            </ListGroup.Item>
            <ListGroup.Item action href="#citing">
              Citing
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#introduction">
              <Container>
                <h2>Introduction</h2>
                <p>
                  o more be griev'd at that which thou hast done: Roses have
                  thorns, and silver fountains mud: Clouds and eclipses stain
                  both moon and sun, And loathsome canker lives in sweetest bud.
                  All men make faults, and even I in this, Authorizing thy
                  trespass with compare, Myself corrupting, salving thy amiss,
                  Excusing thy sins more than thy sins are; For to thy sensual
                  fault I bring in sense,-- Thy adverse party is thy advocate,--
                </p>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="#gettingStarted">
              <Container>
                <h2>Getting Started</h2>
                <p>
                  Those lips that Love's own hand did make, Breathed forth the
                  sound that said 'I hate', To me that languish'd for her sake:
                  But when she saw my woeful state, Straight in her heart did
                  mercy come, Chiding that tongue that ever sweet Was us'd in
                  giving gentle doom; And taught it thus anew to greet; 'I hate'
                  she alter'd with an end, That followed it as gentle day,
                </p>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="#glossary">
              <Container>
                <h2>Glossary</h2>
                <p>
                  Those lips that Love's own hand did make, Breathed forth the
                  sound that said 'I hate', To me that languish'd for her sake:
                  But when she saw my woeful state, Straight in her heart did
                  mercy come, Chiding that tongue that ever sweet Was us'd in
                  giving gentle doom; And taught it thus anew to greet; 'I hate'
                  she alter'd with an end, That followed it as gentle day,
                </p>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="#references">
              <Container>
                <h2>References</h2>
                <p>
                  Those lips that Love's own hand did make, Breathed forth the
                  sound that said 'I hate', To me that languish'd for her sake:
                  But when she saw my woeful state, Straight in her heart did
                  mercy come, Chiding that tongue that ever sweet Was us'd in
                  giving gentle doom; And taught it thus anew to greet; 'I hate'
                  she alter'd with an end, That followed it as gentle day,
                </p>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="#citing">
              <Container>
                <h2>Citing</h2>
                <p>
                  Those lips that Love's own hand did make, Breathed forth the
                  sound that said 'I hate', To me that languish'd for her sake:
                  But when she saw my woeful state, Straight in her heart did
                  mercy come, Chiding that tongue that ever sweet Was us'd in
                  giving gentle doom; And taught it thus anew to greet; 'I hate'
                  she alter'd with an end, That followed it as gentle day,
                </p>
              </Container>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </Container>
);

export default Documentation;
