import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

export default function Volunteer({ volunteer }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={12} sm={12} md={8} lg={9}>
            <Card.Title className="mb-3 text-primary d-flex align-items-center">
              {volunteer.title}
            </Card.Title>
          </Col>
          <Col xs={12} sm={12} md={4} lg={3} className="d-flex flex-md-row-reverse flex-sm-row align-items-center">
            <Badge className="mb-3" bg="secondary">{volunteer.location}</Badge>
          </Col>
        </Row>

        <div className="d-flex">
          <div>
            <Card.Title className="">
              <h6 className="text-primary">{volunteer.company} </h6>
            </Card.Title>
            <Col>
          <Card.Subtitle className="text-muted mt-3">
            <b>Period:</b> {volunteer.period}
          </Card.Subtitle>
        </Col>
          </div>
        </div>
        <Row className="d-flex justify-content-around">
        <Col>
          <Card.Subtitle className="text-muted mt-3">
            <b>Duration:</b> {volunteer.duration}
          </Card.Subtitle>
        </Col>
        <Col>
          <Card.Subtitle className="text-muted mt-3">
            <b>Post Date:</b> {new Date(volunteer.postdate).toLocaleDateString()}
          </Card.Subtitle>
        </Col>
        <Col>
          <Button
            className="d-none d-md-block"
            variant="primary"
            size="lg"
            href={volunteer.redirect}
            >
            View Details
          </Button>
            </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
