import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { HiDotsHorizontal } from "react-icons/hi";

function AdminHeader({ handleLogout }) {
  const handelLogin = () => {
    alert("Hii");
  };

  return (
    <div className="container-fluid p-0 adminHeader ">
      <Navbar collapseOnSelect expand="lg" className="px-2 adminHeaderNav">
        <Navbar.Brand className="text-light">ECS Training</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="me-auto ">
            <Nav.Link as={NavLink} to="/home" className="me-1">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/course"} className="me-1">
              Course
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/contact"} className="me-1">
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="me-1">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/testimonials" className="me-1">
              Testimonials
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categories" className="me-1">
              Categories
            </Nav.Link>
            <Nav.Link as={NavLink} to="/CourseTestimonial" className="me-1">
              CourseTestimonial
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/CourseVideoTestimonial"
              className="me-1"
            >
              CourseVideoTestimonial
            </Nav.Link>
            <Nav.Link as={NavLink} to="/headerfooter" className="me-1">
              HeaderFooter
            </Nav.Link>
            
          </Nav>
          <Nav className="container"> 
          <NavDropdown
            title={<HiDotsHorizontal size={25} />}
            id="basic-nav-dropdownDot"
          >
            <NavDropdown.Item style={{ color: "#343a40" }}>
              Another action
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={<CgProfile size={30} />}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              onClick={handleLogout}
              style={{ color: "#007bff", fontWeight: "bold" }}
            >
              Logout
            </NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#343a40" }}>
              Another action
            </NavDropdown.Item>
          </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AdminHeader;
