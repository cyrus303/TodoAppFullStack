import React from 'react';
import logo from '../src/assets/todoLogo.png';
import {
  NavbarContainer,
  StyledImg,
} from './styledComponents/LoginStyledComponents';

const Navbar = () => {
  return (
    <NavbarContainer>
      <StyledImg src={logo} alt="" />
    </NavbarContainer>
  );
};

export default Navbar;