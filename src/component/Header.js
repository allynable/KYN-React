import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/img/header-logo.svg";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const [activeLink, setActiveLink] = useState("home");

  const handleLogout = () =>{
    props.onLogout()
  }

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
              Stores
            </Nav.Link>
            {props.authenticated && (
            <Nav.Link
              as={NavLink}
              to="/profile"
              onClick={() => updateActiveLink("profile")}
              className={activeLink === "profile" ? "active" : ""}
            >
              Profile
            </Nav.Link>
            )}
            { !props.authenticated && (
            <Nav.Link
              as={NavLink}
              to="/login"
              onClick={()=> updateActiveLink("login")}
              className={activeLink === "login" ? "active": ""}
            >
              Login/Register
            </Nav.Link>
            )}
            {props.authenticated && (
              <Nav.Link
                onClick={() => handleLogout()}
                className="nav-link logout-link"
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
