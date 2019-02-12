import React from 'react';

const SuFooter = props => (
  <div id="global-footer" className="torder-footer">
    <div className="container">
      <div className="row">
        <div id="bottom-logo" className="col-sm-12 col-md-2">
          <a href="https://www.stanford.edu">
            <img
              src="https://www-media.stanford.edu/su-identity/images/footer-stanford-logo@2x.png"
              alt="Stanford University"
              width="105"
              height="49"
            />
          </a>
        </div>

        <div id="bottom-text">
          <div className="col-xs-5 col-xs-offset-1 col-sm-12 col-sm-offset-0 col-md-10">
            <ul id="primary-links">
              <li className="home">
                <a href="https://www.stanford.edu">Stanford Home</a>
              </li>
              <li className="maps alt">
                <a href="https://visit.stanford.edu/plan/">Maps & Directions</a>
              </li>
              <li className="search-stanford">
                <a href="https://www.stanford.edu/search/">Search Stanford</a>
              </li>
              <li className="emergency alt">
                <a href="https://emergency.stanford.edu">Emergency Info</a>
              </li>
            </ul>
          </div>
          <div className="col-xs-6 col-sm-12 col-md-10">
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
          </div>
          <div className="col-xs-12 col-md-10 col-md-offset-2">
            <p className="copyright vcard">
              &copy; <span className="fn org">Stanford University</span>,{' '}
              <span className="adr">
                {' '}
                <span className="locality">Stanford</span>,{' '}
                <span className="region">California</span>{' '}
                <span className="postal-code">94305</span>
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SuFooter;
