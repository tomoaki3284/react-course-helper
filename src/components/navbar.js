import React from 'react';
import '../css/navbar.css';
import { Container, Navbar } from 'react-bootstrap';

class MyNavbar extends React.Component {

  render() {
    return (
      <Container id="mynavbar">
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <img className='wsu-logo'/>
            <div className='nav-links'>
              <a href='https://www.westfield.ma.edu/'>Visit</a>
              <a href='https://explore.westfield.ma.edu/RecruitNewWFE/Account/Create'>Apply</a>
              <a href='https://www.westfieldalumni.org/make-a-gift/online-giving-form'>Give</a>
            </div>
          </Container>
        </Navbar>
      </Container>
    );
  }
}

export default MyNavbar