import React from 'react';
import logo from '../src/assets/todoLogo.png';
import {useNavigate, useLocation} from 'react-router-dom';

import {
  NavbarContainer,
  StyledBtnLogout,
  StyledImg,
} from './styledComponents/LoginStyledComponents';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location;

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('token');
  };

  return (
    <NavbarContainer>
      <StyledImg src={logo} alt="" />
      {pathname !== '/' ? (
        <StyledBtnLogout onClick={handleLogout}>
          Logout
        </StyledBtnLogout>
      ) : (
        ''
      )}
    </NavbarContainer>
  );
};

export default Navbar;
