import React from 'react';
import { Navbar } from 'react-bootstrap';
import { BiCycling } from 'react-icons/bi';


function NavBarLogo(props) {
  return (
    <Navbar.Brand
      onClick={(e) => props.homePageView(e)}
      className="main-logo"
      href=""
    >
      <img className="logo" src={require('../../../images/logo.png')} />
      {/* <BiCycling/> */}
    </Navbar.Brand>
  );
}

export default NavBarLogo;
