import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/img/Logo.png";
import { NavLink } from "react-router-dom";
import {FaUserAlt} from "react-icons/fa";

const Header = () => {
  const [activeLink, setActiveLink] = useState("home");

  const updateActiveLink = (link) => {
    setActiveLink(link);
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container>
        <Navbar.Brand href="/">
          <img src={Logo} alt="Logo" className="header-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              onClick={() => updateActiveLink("home")}
              className={activeLink === "home" ? "active" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/stores"
              onClick={() => updateActiveLink("stores")}
              className={activeLink === "stores" ? "active" : ""}
            >
              Store
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/profile"
              onClick={() => updateActiveLink("profile")}
              className={activeLink === "profile" ? "active" : ""}
            >
              Profile
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/login"
              onClick={()=> updateActiveLink("login")}
              className={activeLink === "login" ? "active": ""}
              
            >
              <FaUserAlt size={30} className="login-icon bg-success"/>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
