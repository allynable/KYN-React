import React from "react";
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import SearchBar from "./SearchBar";
const Banner = () => {
  return (
    <section className="banner">
      <Container>
        <Row>
          <Col sm={12} md={10} lg={8} className="offset-md-1 offset-lg-2">
            <h1 className="slogan">
              Explore your community with <br />
              Know-Your-Neighborhood
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col sm={12} md={10} lg={8} xl={6} className="mt-3">
            <SearchBar/>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
