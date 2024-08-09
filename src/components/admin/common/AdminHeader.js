import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../../../assets/client/CRMLogo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiDotsThree } from "react-icons/pi";
function AdminHeader({ handleLogout }) {
  const handelLogin = () => {
    alert("Hii");
  };

  return (
    <div className="container-fluid p-0 adminHeader ">
      <Navbar collapseOnSelect expand="lg" className="px-2 adminHeaderNav">
        <Navbar.Brand className=" d-flex">
          <img
            src={logo}
            height="40"
            className="d-inline-block align-top"
            alt="ECS Training"
          />
          <div class="text-light d-flex justify-content-center align-items-center">
            <h2 class="mb-0 fw-bold">ECS</h2>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="me-auto ">
            <NavDropdown
              title="Home"
              id="basic-nav-dropdownDot"
              className="me-1"
            >
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/home/hero" className="me-1">
                  Home Section
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link
                  as={NavLink}
                  to="/home/whyjoinwithus"
                  className="me-1"
                >
                  Why Join With Us
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/companieshiring" className="me-1">
                  Companies Hiring
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link
                  as={NavLink}
                  to="/home/training/overview"
                  className="me-1"
                >
                  Cloud ECS Training Overview
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link
                  as={NavLink}
                  to="/home/training/placement"
                  className="me-1"
                >
                  Home FAQ
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to={"/contact"} className="me-1">
              Contact
            </Nav.Link>
            <NavDropdown
              title="LandingPage"
              id="basic-nav-dropdownDot"
              className="me-1"
            >
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to={"/landingpage1"} className="me-1">
                  LandingPage1
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to={"/landingpage2"} className="me-1">
                  Landingpage2
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={"About"}
              id="basic-nav-dropdownDot"
              className=""
            >
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/about" className="me-1">
                  About
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/aboutFaq" className="me-1">
                  About Faq
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/categories" className="me-1">
              Categories
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/course"} className="me-1 ">
              Course
            </Nav.Link>
            <Nav.Link as={NavLink} to="/testimonials" className="me-1">
              Testimonials
            </Nav.Link>
          </Nav>
          <Nav className="container dropdown">
            <NavDropdown
              title={<HiDotsHorizontal size={20} />}
              id="basic-nav-dropdownDot"
              className="fw-bold"
            >
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/CourseTestimonial" className="me-1">
                  CourseTestimonial
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link
                  as={NavLink}
                  to="/CourseVideoTestimonial"
                  className="me-1"
                >
                  CourseVideoTestimonial
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/courses" className="me-1">
                  ClientCourse
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/headeredit" className="me-1">
                  Header
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/footeredit" className="me-1">
                  Footer
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/privacypolicy" className="me-1">
                  PrivacyPolicy
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ color: "#343a40" }}>
                <Nav.Link as={NavLink} to="/TermsAndCondition" className="me-1">
                  Terms of Use
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<CgProfile size={20} />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={handleLogout}
                style={{ color: "#007bff" }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AdminHeader;
