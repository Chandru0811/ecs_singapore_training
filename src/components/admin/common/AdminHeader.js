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
            <Nav.Link
              as={NavLink}
              to="/home"
              className="me-1 "
              style={{ fontWeight: "150" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/course"}
              className="me-1 "
              style={{ fontWeight: "150" }}
            >
              Course
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/contact"}
              className="me-1"
              style={{ fontWeight: "150" }}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              className="me-1"
              style={{ fontWeight: "150" }}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/testimonials"
              className="me-1"
              style={{ fontWeight: "150" }}
            >
              Testimonials
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/categories"
              className="me-1"
              style={{ fontWeight: "150" }}
            >
              Categories
            </Nav.Link>
          </Nav>
          <Nav className="container"> 
          <NavDropdown
            title={<HiDotsHorizontal size={25} />}
            id="basic-nav-dropdownDot"
          >
            <NavDropdown.Item style={{ color: "#343a40" }}>
            <Nav.Link as={NavLink} to="/privacypolicy" className="me-1">
              PrivacyPolicy
            </Nav.Link>
            </NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#343a40" }}>
            <Nav.Link as={NavLink} to="/footeredit" className="me-1">
              Footer
            </Nav.Link>
            </NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#343a40" }}>
            <Nav.Link as={NavLink} to="/headeredit" className="me-1">
              Header
            </Nav.Link>
            </NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#343a40" }}>
            <Nav.Link as={NavLink} to="/courses" className="me-1">
             ClientCourse
            </Nav.Link>
            </NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#343a40" }}>
            <Nav.Link
              as={NavLink}
              to="/CourseVideoTestimonial"
              className="me-1" style={{fontWeight:"150"}}
            >
              CourseVideoTestimonial
            </Nav.Link>
            </NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#343a40" }}>
            <Nav.Link as={NavLink} to="/CourseTestimonial" className="me-1" style={{fontWeight:"150"}}>
              CourseTestimonial
            </Nav.Link>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={<CgProfile size={30} />}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              onClick={handleLogout}
              style={{ color: "#007bff" }}
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
                style={{ color: "#007bff" }}
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
