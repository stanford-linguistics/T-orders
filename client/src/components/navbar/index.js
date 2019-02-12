import React, { Component } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Settings from '../../containers/settings';
import { withRouter } from 'react-router-dom';

class TorderNavbar extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Navbar
        fixed="top"
        className="sticky-nav"
        bg="dark"
        variant="dark"
        expand="sm">
        <Container>
          <Navbar.Brand to="/">T-orders</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer exact to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Documentation" id="torder-docs-dropdown">
                <NavDropdown.Item
                  as={NavLink}
                  to="/documentation#introduction"
                  href="/documentation#introduction">
                  Introduction
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/documentation#getting-started"
                  href="/documentation#getting-started">
                  Getting Started
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/documentation#glossary"
                  href="/documentation#glossary">
                  Glossary
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/documentation#references"
                  href="/documentation#references">
                  Referances
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/documentation#citing"
                  href="/documentation#citing">
                  Citing
                </NavDropdown.Item>
              </NavDropdown>
              <LinkContainer exact to="/my-t-orders">
                <Nav.Link>My T-orders</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="justify-content-end">
              <Settings />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

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
)(withRouter(TorderNavbar));
