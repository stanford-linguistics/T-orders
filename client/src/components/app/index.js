import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../home';
import Documentation from '../documentation';
import Navbar from '../navbar';
import MyTorders from '../myTorders';
import SuFooter from '../suFooter';
import SuHeader from '../suHeader';
import { Container, Row, Col } from 'react-bootstrap';

function getClassForRoute(path) {
  if (path === '/' || path === '/home') {
    return 'torder-home-main-container';
  } else if (path === '/documentation') {
    return 'torder-docs-main-container';
  } else if (path === '/my-t-orders') {
    return 'torder-my-torders-main-container';
  } else {
    return null;
  }
}

const App = props => (
  <div
    id="torder-main-container"
    className={getClassForRoute(props.location.pathname)}>
    <div id="su-wrap">
      <div id="su-content">
        <SuHeader />
        <main>
          <Navbar />
          <Container>
            <Row>
              <Col md="auto">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route exact path="/home" component={Home} />
                  <Route
                    exact
                    path="/documentation"
                    component={Documentation}
                  />
                  <Route exact path="/my-t-orders" component={MyTorders} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
    <SuFooter />
  </div>
);

export default withRouter(App);
