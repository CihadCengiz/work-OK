import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function SearchForm({params, onParamChange}) {
    return (
        <Form className="mb-3 mt-3">
            <Row>
                <Form.Group as={Col}>
                    <Form.Control placeholder="Search by location" onChange={onParamChange} value={params.location ? params.location : '' } name="location" type="text"/>
                </Form.Group>
            </Row>
        </Form>
    )
}
