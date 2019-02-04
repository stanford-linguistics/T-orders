import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import TorderModal from '../torderModal';

const Home = props => (
  <Container className="h-100 d-flex">
    <Jumbotron className="torder-jumbotron">
      <Container>
        <h1>Compute T-orders in Constraint-Based Phonology</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia
          enim semper, ultrices lectus id, venenatis augue. Morbi vestibulum
          velit nec porta feugiat. Donec odio dui, dapibus viverra accumsan ut,
          pulvinar quis sapien. Nam justo dui, interdum eget malesuada at,
          tincidunt et arcu. Duis vitae imperdiet nisi. In felis tortor.
        </p>

        <TorderModal />

        <Button
          variant="primary"
          className="torder-compute-btn"
          onClick={() => props.changePage('/documentation')}>
          <span>Learn More</span>
        </Button>
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
