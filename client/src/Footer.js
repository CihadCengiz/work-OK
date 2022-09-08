import { Link } from "react-router-dom";
import { Nav, Container, Row, Col } from "react-bootstrap";
import "./App.css";

var style = {
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  position: "relative",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
  paddingTop: "10px",
};

var phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
};

const brandStyle = {
  color: "hsl(357, 57%, 63%)",
  fontSize: "1em",
  fontFamily: "Raleway",
};

function Footer() {
  return (
    <Container className="footer">
      <Row>
        <Col>
          <div style={phantom} />
          <div
            style={style}
            className="d-flex justify-content-between align-items-center"
          >
            <Nav.Link as={Link} eventKey="0" style={brandStyle} to="/">
              <b>work | OK Copyright © 2022</b>
            </Nav.Link>
            <div className="d-flex">
              <Nav.Link as={Link} eventKey="1" style={brandStyle} to="/contact">
                <Nav>Contact Us</Nav>
              </Nav.Link>
              <Nav.Link as={Link} eventKey="2" style={brandStyle} to="/privacy">
                <Nav>Privacy Policy</Nav>
              </Nav.Link>
              <Nav.Link as={Link} eventKey="3" style={brandStyle} to="/terms">
                <Nav>Terms of Service</Nav>
              </Nav.Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
