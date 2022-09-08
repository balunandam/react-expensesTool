import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

function NavBar() {
  const location = useLocation();
  const [color, setColor] = useState(false);
  const checkCondition = () => {
    if (
      location.pathname === '/register' ||
      location.pathname === '/login' ||
      location.pathname === '/'
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Navbar bg={color ? 'dark' : 'primary'} variant="dark">
        {checkCondition() === true ? (
          <>
            <Container className="justify-content-center">
              <Navbar.Brand href="/home">Expenses tool</Navbar.Brand>
            </Container>
          </>
        ) : (
          <>
            <div className="d-flex flex-row px-3">
              <Navbar.Brand href="/home">Expenses</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/charts">Visualization</Nav.Link>
              </Nav>
              <Nav className="me-auto text-right">
                <Nav.Link href="/login">Logout</Nav.Link>
                <BootstrapSwitchButton
                  onstyle="dark"
                  offstyle="light"
                  style="border"
                  width={85}
                  size="xs"
                  checked={false}
                  onlabel="Dark"
                  offlabel="Light"
                  onChange={(checked) => {
                    setColor(checked);
                  }}
                />
              </Nav>
            </div>
          </>
        )}
      </Navbar>
    </>
  );
}

export default NavBar;
