import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col>
            <p>&copy; Copyright 2023. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer