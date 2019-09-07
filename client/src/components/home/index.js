import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Jumbotron, Container, Button, Row, Col } from 'react-bootstrap';

const Home = props => (
  <Container id="torder-home-container">
    <Row>
      <Col lg={{ span: 6, offset: 3 }}>
        <Jumbotron className="torder-jumbotron torder-home-bg-color">
          <Container id="torder-home-content">
            <h1>CoGeTo</h1> <hr />
            <h6 id="torder-home-headline">
              Compute T-orders in Constraint-Based Phonology
            </h6>
            <p>
              CoGeTo is a suite of tools that exploit the rich convex geometry
              underlying constraint-based phonology to extract typological
              information without ever enumerating the typology. These tools
              thus allow you to analyze not only categorical typologies in OT
              and HG, but also infinite probabilistic typologies in Stochastic
              OT, Noisy HG, and Maxent.
            </p>
            <Row>
              <div className="col-sm-12 text-center">
                <Button
                  variant="primary"
                  className="torder-primary-btn"
                  onClick={() => props.changePage('/compute')}>
                  <span>Compute</span>
                </Button>
                <div id="torder-learn-more">
                  <Button
                    variant="outline-secondary"
                    className="torder-secondary-btn"
                    onClick={() => props.changePage('/about')}>
                    <span>About</span>
                  </Button>
                </div>
              </div>
            </Row>
          </Container>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: page => push(page)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
