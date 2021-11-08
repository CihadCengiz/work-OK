import React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'
import {BASE_API_URL} from './BASE_API'
import "./App.css";
import contactsvg from "./character.svg"
import styled from "styled-components";
import "./App.css"


const StyledImg = styled.img`
max-height: 800px;
`;


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }

  handleSubmit(e){
    e.preventDefault();
    axios({
      method: "POST",
      url:`${BASE_API_URL}/send`,
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success') {
        alert("Message Sent.");
        this.resetForm()
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }

  resetForm(){
    this.setState({name: '', email: '', message: ''})
  }

  render() {
    return(
      <div className="main-contact">
      <Container className="mt-5">
        <Row>
          <Col>
          <h1 className="contact">Get in touch!</h1>
          <h5 className="text-muted font-weight-light">We would love to hear from you! Please fill out our form below and we will contact you as soon as possible.</h5>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
              <label htmlFor="name">Your name *</label>
              <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="exampleInputEmail1">Your e-mail address *</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
          </div>
          <button type="submit" className="btn custom-btn mt-3">Submit</button>
        </form>
        </Col>
        <Col className="d-none d-md-flex justify-content-center">
        <StyledImg
          src={contactsvg}
          alt="contact illustration"
        />
        </Col>
        </Row>
      </Container>
      </div>
    );
  }

  onNameChange(event) {
	  this.setState({name: event.target.value})
  }

  onEmailChange(event) {
	  this.setState({email: event.target.value})
  }

  onMessageChange(event) {
	  this.setState({message: event.target.value})
  }
}

export default App;