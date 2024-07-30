import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AdminHeader({handleLogout}) {
  const handelLogin = () => {
    alert("Hii");
  };

  return (
    <div className="container-fluid p-0 AdminHeader" >
      <Navbar collapseOnSelect expand="lg" className=" 0px-2" style={{borderBottom: '1px solid #f2f2f2'}}>
      
        <Navbar.Brand href="#home">ECS Training</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  className="me-1">Home</Nav.Link>
            <Nav.Link href="#pricing" className="me-1">Course</Nav.Link>
            <Nav.Link href="#Contact" className="me-1">Contact</Nav.Link>
            <Nav.Link href="#About" className="me-1">About</Nav.Link>
            <Nav.Link href="#Blogs" className="me-1">Blogs</Nav.Link>
          </Nav>
          <Nav className=""> 
            <button className="btn btn-outline-info" onClick={handleLogout}>Logout</button>
          </Nav>
        </Navbar.Collapse>
     
    </Navbar>
    </div>
  );
}

export default AdminHeader;
