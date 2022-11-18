import React from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";

const SearchTitle = styled.h4`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  padding-bottom: 10px;
`;

const StyledBg = styled.div`
  background: darkgray;
  color: white;
  font-size: 1em;
  text-align: center;
  font-weight: 450;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const StyledCheckBox = styled.div`
  font-size: 15px;
`;

function CheckBox({ onParamChange }) {
  return (
    <div className="checkbox-parent pt-3">
      <SearchTitle>Advanced Search</SearchTitle>
      <StyledBg>Degree</StyledBg>
      <StyledCheckBox>
        <Form className="mt-2">
          <Form.Group>
            <Form.Check
              name="degree"
              label="Bachelor"
              value="Bachelor"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 2"
              label="Short cycle or equivalent"
              name="degree"
              value="Short cycle or equivalent"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 3"
              label="Master"
              name="degree"
              value="Master"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="PhD"
              name="degree"
              value="PhD"
              onChange={onParamChange}
            />
          </Form.Group>
        </Form>
      </StyledCheckBox>
      <StyledBg className="mt-5">Digital Opportunities</StyledBg>
      <StyledCheckBox>
        <Form className="mt-2">
          <Form.Group>
            <Form.Check
              name="dopportunities"
              value="No"
              onChange={onParamChange}
              label="No"
            />
            <Form.Check
              aria-label="option 2"
              name="dopportunities"
              value="Yes"
              onChange={onParamChange}
              label="Yes"
            />
          </Form.Group>
        </Form>
      </StyledCheckBox>
      <StyledBg className="mt-5">Field of studies</StyledBg>
      <StyledCheckBox>
        <Form className="mt-2">
          <Form.Group>
            <Form.Check
              aria-label="option 1"
              label="Business Studies and/or Management Science"
              name="fofstd"
              value="Business Studies"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 2"
              label="Communication and Information Sciences"
              name="fofstd"
              value="Communication"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 3"
              label="Engineering and/or Technology"
              name="fofstd"
              value="Engineering"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Languages and Philological Sciences"
              name="fofstd"
              value="Languages"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Mathematics and/or Informatics"
              name="fofstd"
              value="Mathematics"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Social Sciences"
              name="fofstd"
              value="Social"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Humanities"
              name="fofstd"
              value="Humanities"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Education and/or Teacher Training"
              name="fofstd"
              value="Education"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Natural Sciences"
              name="fofstd"
              value="Natural Sciences"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Architecture and/or Urban and Regional Planning"
              name="fofstd"
              value="Architecture"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Law"
              name="fofstd"
              value="Law"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Medical Sciences"
              name="fofstd"
              value="Medical"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Agriculture Sciences"
              name="fofstd"
              value="Agriculture"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="Geography and/or Geology"
              name="fofstd"
              value="Geography"
              onChange={onParamChange}
            />
          </Form.Group>
        </Form>
      </StyledCheckBox>
      <StyledBg className="mt-5">Duration</StyledBg>
      <StyledCheckBox>
        <Form className="mt-2">
          <Form.Group>
            <Form.Check
              aria-label="option 4"
              label="6 months"
              name="duration"
              value="6"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="3 months"
              name="duration"
              value="3"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="4 months"
              name="duration"
              value="4"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="12 months"
              name="duration"
              value="12"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="2 months"
              name="duration"
              value="2"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="5 months"
              name="duration"
              value="5"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="8 months"
              name="duration"
              value="8"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="9 months"
              name="duration"
              value="9"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="11 months"
              name="duration"
              value="11"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="10 months"
              name="duration"
              value="10"
              onChange={onParamChange}
            />
            <Form.Check
              aria-label="option 4"
              label="7 months"
              name="duration"
              value="7"
              onChange={onParamChange}
            />
          </Form.Group>
        </Form>
      </StyledCheckBox>
    </div>
  );
}

export default CheckBox;
