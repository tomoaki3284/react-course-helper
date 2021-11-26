import React from 'react';
import '../css/navbar.css';
import { Container, Navbar } from 'react-bootstrap';

class MyNavbar extends React.Component {

  render() {
    return (
      <Container id="mynavbar">
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
    );
  }
}

export default MyNavbar