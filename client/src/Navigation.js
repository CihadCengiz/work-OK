import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./App.css";
import { Link } from "react-router-dom";

function Navigation() {
  const navStyle = {
    color: "white",
    fontSize: "1.2em",
    fontFamily: 'Raleway'
  };
  const brandStyle = {
    color: "white",
    paddingLeft: "0",
    fontSize: "1.5em",
    fontFamily: 'Raleway'
  };

  return (
    <Navbar
      sticky="top"
      expand='lg'
      collapseOnSelect 
      className="d-flex justify-content-between navbar-custom"
    >
      <Container fluid>
      <Navbar.Brand>
        <Nav.Link as={Link} eventKey="0" style={brandStyle} to="/">
        <b>work | OK</b>
        </Nav.Link>
      </Navbar.Brand>
        <Navbar.Toggle className="flex-md-row-reverse flex-sm-row align-items-center" />
        <Navbar.Collapse className="">
          <Nav className="ms-auto">
            <Nav.Link as={Link} eventKey="1" style={navStyle} to="/internships">
              <Nav>Internships</Nav>
            </Nav.Link>
            <Nav.Link as={Link} eventKey="3" style={navStyle} to="/Faq">
              <Nav>FAQ</Nav>
            </Nav.Link>
            <Nav.Link as={Link} eventKey="4" style={navStyle} to="/contact">
              <Nav>Contact us</Nav>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Navigation;
