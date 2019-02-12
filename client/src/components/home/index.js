import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Jumbotron, Container, Button, Row } from 'react-bootstrap';
import TorderFormContainer from '../../containers/torderFormContainer';

const Home = props => (
  <Container id="torder-home-container">
    <Jumbotron className="torder-jumbotron torder-home-bg-color">
      <Container id="torder-home-content">
        <h1>T-orders</h1>
        <h3 id="torder-home-headline">
          Compute T-orders in Constraint-Based Phonology
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia
          enim semper, ultrices lectus id, venenatis augue. Morbi vestibulum
          velit nec porta feugiat. Donec odio dui, dapibus viverra accumsan ut,
          pulvinar quis sapien. Nam justo dui, interdum eget malesuada at,
          tincidunt et arcu. Duis vitae imperdiet nisi. In felis tortor.
        </p>
        <Row>
          <div className="col-sm-12 text-center">
            <TorderFormContainer />
            <div id="torder-learn-more">
              <Button
                // title="Learn More"
                variant="outline-secondary"
                className="torder-secondary-btn"
                onClick={() => props.changePage('/documentation')}>
                <span>Learn More</span>
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </Jumbotron>
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
