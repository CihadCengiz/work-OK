import React, {useState} from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import bg from "./bg.svg";
import styled from "styled-components";
import expandDown from "./assets/expand-down.png";
import expandUp from "./assets/expand-up.png";
import "./App.css"

const StyledImg = styled.img`
  width: 90%;
`;
const data = [
  {
    question: "What Is Aggregator?",
    answer:
      "Aggregator, Is an internship aggregator targeting students, recent grads and individuals. Our main mission Is to provide valuable internship contents to help our users find the opportunity they want. What we want Is to make the internship search process easier",
  },

  {
    question: "How do I find internships?",
    answer:
      "To make the internship search easier, our site is lean and straight to the point of finding internships and applying directly to the source. With Aggregator, you can search through all of our jobs from lots of different sources. If you’d like to apply for a job, It links you back to the source. How It works Is simple you just search and click on an internship offer that interests you and apply.",
  },
  {
    question: "How do you aggregate the data?",
    answer:
      "We made multiple scripts that run on a cron job that gathers data from multiple RSS feeds. After gathering the data, the script then forwards it to our Postgres database then we filter by a specific query that would filter all internships. Then after the filtering process, we render it on our front-end. Aside from that we also use other internship boards APIs to increase the value of our content.",
  },
  {
    question: "What technologies are you using?",
    answer:
      "It's React.Js, Node.Js, Express.Js, PostgreSQL, Bootstrap 5 and various other libraries.",
  },
];


export default function Faq() {
  const [selected, setSelected] = useState(null)
  
  const toggle = i => {
    if(selected === i) {
      return setSelected(null)
    }

    
    setSelected(i)
  }


  return (
    <Container>
      <Row className="pb-5 justify-content-center">
        <h1 className="d-flex justify-content-center mt-5 pt-5 contact">
          Get to know us
        </h1>
        <h2 className="justify-content-center mt-4 text-muted font-weight-light text-center">
          Browse through internship opportunities and find your match.
        </h2>
        <StyledImg
          src={bg}
          alt="team meeting illustration"
          className="mt-5 mb-5"
        />
      </Row>
      <Row>
        <h2 className="d-flex justify-content-center text-muted">
          Frequently Asked Questions
        </h2>
          <div className="accordion">
            {data.map((item, i) => (
              <Col className="item text-muted" key={i} >
                <div className="title font-weight-light" onClick={() => toggle(i)}>
                <h2 className="contact">{item.question}</h2>
                <Image className="expand-image" src={selected === i ? expandUp : expandDown} alt="expand-icon" roundedCircle></Image>
                  </div>
                <div className={selected === i ? "content show cntn-color" : "content cntn-color" }>{item.answer}</div>
                {/* Buggy - To be fixed
                <div ref={modalRef} className={selected === i ? "content show cntn-color" : "content cntn-color" }>{item.answer}</div> */}
              </Col>
            ))}
          </div>
      </Row>
    </Container>
  );
}
