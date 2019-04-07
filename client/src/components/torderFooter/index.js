import React from 'react';
import { Navbar, Container, Row, Col, Image } from 'react-bootstrap';
import CNRS_Logo from '../../assets/images/cnrs.svg';
import ANR_LOGO from '../../assets/images/anr-logo.png';
import GITHUB_LOGO from '../../assets/images/Professortocat_v2.png';

const TorderFooter = props => (
  <Navbar className="sticky-nav" bg="dark" variant="dark">
    <Container className="h-100">
      <Row id="torder-footer-sponsors" className="align-items-center h-100">
        <Col className="text-center">
          <a
            href="http://www.cnrs.fr/"
            title="Centre national de la recherche scientifique"
            target="_blank"
            rel="noopener noreferrer">
            <Image width={100} src={CNRS_Logo} fluid />
          </a>
        </Col>
        <Col className="text-center">
          <a
            href="https://anr.fr/en/anrs-role-in-research/missions/"
            title="The French National Research Agency (ANR)"
            target="_blank"
            rel="noopener noreferrer">
            <Image width={300} src={ANR_LOGO} fluid />
          </a>
        </Col>
        <Col id="torder-footer-contact">
          <h4>Contact</h4>
          <hr />
          <div>
            <p>Arto Tapani Anttila</p>
            <p>
              <a
                href="mailto:anttila@stanford.edu"
                title="anttila@stanford.edu"
                target="_blank"
                rel="noopener noreferrer">
                anttila@stanford.edu
              </a>
            </p>
            <p>Giorgio Magri</p>
            <a
              href="mailto:magrigrg@gmail.com"
              title="magrigrg@gmail.com"
              target="_blank"
              rel="noopener noreferrer">
              magrigrg@gmail.com
            </a>
            <p />
          </div>
        </Col>
        <Col className="text-center">
          <a
            href="https://github.com/CoGeTo/T-orders"
            title="https://github.com/CoGeTo/T-orders"
            target="_blank"
            rel="noopener noreferrer">
            <Image width={100} src={GITHUB_LOGO} fluid />
          </a>
        </Col>
      </Row>
    </Container>
  </Navbar>
);

export default TorderFooter;
