import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import logo from "../../../assets/admin/CRMLogo.png";

const AdminHeader = ({ handleLogout }) => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <>
      <p className="mb-0 text-light fw-light" style={{backgroundColor:"#11235A",padding:"2px 0"}}>We offer Job Gurantee Courses (Any Degree/Diploma Canditates/Year Gap/Non IT/Any Passed outs)</p>
      <Navbar bg="light" expand="lg" className="shadow">
        <Navbar.Brand href="#" className="ms-3">
          <img
            src={logo}
            height="40"
            className="d-inline-block align-top"
            alt="ECS Training"
          />

          <span>ECS </span>
          <span>Training</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end me-5"
        >
          <Nav className="ml-auto gap-4">
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#job-post">Job Post</Nav.Link>
            <Nav.Link href="#blogs">Blogs</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            {/* <NavDropdown
              title="All Courses"
              id="basic-nav-dropdown"
              className="custom-dropdown"
            >
              <Container>
                <Row>
                  <Col>
                    <NavDropdown.Header>Business Solutions</NavDropdown.Header>
                    <NavDropdown.Item href="#convert">Convert</NavDropdown.Item>
                    <NavDropdown.Item href="#retain">Retain</NavDropdown.Item>
                    <NavDropdown.Item href="#engage">Engage</NavDropdown.Item>
                  </Col>
                  <Col>
                    <NavDropdown.Header>Product Adoption</NavDropdown.Header>
                    <NavDropdown.Item href="#convert">
                      Product Adoption 1
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#retain">
                      Product Adoption 2
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#engage">
                      Product Adoption 3
                    </NavDropdown.Item>
                  </Col>
                  <Col>
                    <NavDropdown.Header>Analytics</NavDropdown.Header>
                    <NavDropdown.Item href="#convert">Analyze</NavDropdown.Item>
                    <NavDropdown.Item href="#retain">Insights</NavDropdown.Item>
                    <NavDropdown.Item href="#engage">Reports</NavDropdown.Item>
                  </Col>
                </Row>
              </Container>
            </NavDropdown> */}
            {/* <NavDropdown title="All Courses" id="basic-nav-dropdown">
            <NavDropdown.Item href="#course1">Course 1</NavDropdown.Item>
            <NavDropdown.Item href="#course2">Course 2</NavDropdown.Item>
            <NavDropdown.Item href="#course3">Course 3</NavDropdown.Item>
          </NavDropdown> */}
            <button className="btn btn-outline-primary">All Course</button>
            <Button
              variant="primary"
              className="ml-2"
              onClick={handleLogoutClick}
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default AdminHeader;
