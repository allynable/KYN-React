import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/img/footer-logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-light">
        <Container>
          <hr />
          <div className="d-flex align-items-center">
            <img src={Logo} alt="Logo" className="footer-logo mr-3"/> &nbsp;&nbsp;&nbsp;&nbsp;
            <h4 className="mb-0 text-secondary" >Know-Your-Neighborhood</h4>
          </div>
          <hr />
          <Row>
            <Col xs={12} sm={6} md={3}>
              <h6>What's Popular</h6>
              <ul>
                <li><a href="">Pizza</a></li>
                <li><a href="">Fast Food</a></li>
                <li><a href="">Sushi</a></li>
                <li><a href="">Coffee</a></li>
                <li><a href="">Filipino Food</a></li>
                <li><a href="">Japanese Food</a></li>
              </ul>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <h6>About</h6>
              <ul>
                <li><a href="">About KYN</a></li>
                <li><a href="">Terms & Condition</a></li>
                <li><a href="">Privacy Policy</a></li>
              </ul>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <h6>Support</h6>
              <ul>
                <li><a href="">Help</a></li>
                <li><a href="">FAQs</a></li>
                <li><a href="">Sell on KYN</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-dark">
        <p>
          <a href="">Hong Kong</a> &nbsp; | &nbsp;
          <a href="">Indonesia</a> &nbsp; | &nbsp;
          <a href="">Malaysia</a> &nbsp; | &nbsp;
          <a href="">Myanmar</a> &nbsp; | &nbsp;
          <a href="">Philippines</a> &nbsp; | &nbsp;
          <a href="">Singapore</a> &nbsp; | &nbsp;
          <a href="">Taiwan</a> &nbsp; | &nbsp;
          <a href="">Thailand</a>
        </p>
        <br />
        <p>&copy; Know-Your-Neighborhood 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
