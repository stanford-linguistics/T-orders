import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const SuFooter = props => (
  <div id="torder-su-footer">
    <Container>
      <Row>
        <Col>
          <a href="https://www.stanford.edu">
            <img
              src="https://www-media.stanford.edu/su-identity/images/footer-stanford-logo@2x.png"
              alt="Stanford University"
              width="105"
              height="49"
            />
          </a>
        </Col>
        <Col md={10}>
          <Row>
            <ul id="primary-links">
              <li>
                <a href="https://www.stanford.edu">Stanford Home</a>
              </li>
              <li>
                <a href="https://visit.stanford.edu/plan/">Maps & Directions</a>
              </li>
              <li>
                <a href="https://www.stanford.edu/search/">Search Stanford</a>
              </li>
              <li>
                <a href="https://emergency.stanford.edu">Emergency Info</a>
              </li>
            </ul>
          </Row>
          <Row>
            <ul id="policy-links">
              <li>
                <a
                  href="https://www.stanford.edu/site/terms/"
                  title="Terms of use for sites">
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="https://www.stanford.edu/site/privacy/"
                  title="Privacy and cookie policy">
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="https://uit.stanford.edu/security/copyright-infringement"
                  title="Report alleged copyright infringement">
                  Copyright
                </a>
              </li>
              <li>
                <a
                  href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4"
                  title="Ownership and use of Stanford trademarks and images">
                  Trademarks
                </a>
              </li>
              <li>
                <a
                  href="http://exploredegrees.stanford.edu/nonacademicregulations/nondiscrimination/"
                  title="Non-discrimination policy">
                  Non-Discrimination
                </a>
              </li>
              <li>
                <a
                  href="https://www.stanford.edu/site/accessibility"
                  title="Report web accessibility issues">
                  Accessibility
                </a>
              </li>
            </ul>
          </Row>
          <Row>
            <ul id="copywrite">
              <li>
                &copy; <span>Stanford University</span>
              </li>
            </ul>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
);

export default SuFooter;
