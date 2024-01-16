import styled from 'styled-components';

export const NavbarContainer = styled.div`
  background-color: #f1ece6;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* min-width: 700px; */
`;

export const StyledImg = styled.img`
  /* border: 1px solid red; */
  width: 150px;
`;

export const CardContainer = styled.div`
  width: 40%;
  min-width: 400px;
  min-height: 400px;
  background-color: #f1ece6;
  text-align: center;
  border-radius: 20px;
  margin-top: 10rem;
  /* margin-bottom: 15rem; */
  border: 1px solid #737373;
`;

export const StyledH2 = styled.h2`
  color: #d98326;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 18px;
  color: #737373; /* Change color as needed */
`;

export const StyledInput = styled.input`
  width: 40%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc; /* Change border color as needed */
  border-radius: 4px;
  box-sizing: border-box;
  /* margin-bottom: 16px; */
  margin-left: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff; /* Change focus border color as needed */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Change focus box-shadow as needed */
  }
`;

export const StyledBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled.button`
  background-color: #d98326;
  color: #fff; /* Text color */
  padding: 10px 15px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 60%;
  margin-top: 1rem;

  &:hover {
    background-color: #555; /* Change hover color as needed */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(115, 115, 115, 0.7); /* Change focus box-shadow as needed */
  }
`;

export const StyledBtnLogout = styled(StyledButton)`
  width: auto;
  position: absolute;
  right: 5rem;
  top: 1rem;
`;

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  height: 70%;
  flex-direction: column;
`;

export const StyledA = styled.a`
  color: #d98326;
  font-weight: 700;
`;

export const StyledP = styled.p`
  margin-top: 1rem;
`;
