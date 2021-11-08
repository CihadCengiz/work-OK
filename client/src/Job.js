import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import "./App.css"

export default function Job({ job }) {

  return (
    <Card className="mb-3 container-custom">
      <Card.Body>
        <Row>
          <Col xs={12} sm={12} md={8} lg={9}>
            <Card.Title className="mb-3 jobtitle d-flex align-items-center">
              {job.title}
            </Card.Title>
          </Col>
          <Col xs={12} sm={12} md={4} lg={3} className="d-flex flex-md-row-reverse flex-sm-row align-items-center">
            <Badge className="mb-3 custom-badge">{job.location}</Badge>
          </Col>
        </Row>

        <div className="d-flex">
          <a href={job.redirect}>
            <img
              src={job.logo}
              className="d-none d-md-block mb-2 me-2 border rounded"
              width="100px"
              height="100px"
              alt={job.company}
            ></img>
          </a>
          <div>
            <Card.Title className="">
              <p className="text-muted font-weight-light">{job.fofstd}</p>
              <h6 className="jobcompany">{job.company} </h6>
            </Card.Title>
          </div>
        </div>
        <Row className="d-flex justify-content-around">
        <Col>
          <Card.Subtitle className="text-muted mt-3">
            <b>Duration:</b> {job.duration}
          </Card.Subtitle>
        </Col>
        <Col>
          <Card.Subtitle className="text-muted mt-3">
            <b>Post Date:</b> {new Date(job.postdate).toLocaleDateString()}
          </Card.Subtitle>
        </Col>
        <Col>
          <Card.Subtitle className="text-muted mt-3">
            <b>Deadline:</b> {new Date(job.deadline).toLocaleDateString()}
          </Card.Subtitle>
        </Col>
        <Col>
          <Button
            className="d-none d-md-block custom-btn"
            size="lg"
            href={job.redirect}
            >
            View Details
          </Button>
            </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
