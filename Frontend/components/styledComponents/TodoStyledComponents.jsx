import styled from 'styled-components';

export const TodoContainer = styled.div`
  /* border: 1px solid red; */
  width: 100vw;
  /* height: 100vh; */
  /* min-width: 700px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledInputContainer = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  justify-content: center;
  margin: 5rem 0 2rem 0;
  flex-shrink: 0;
`;

export const StyledInput = styled.input`
  height: 60px;
  width: 800px;
  min-width: 200px;
  padding: 8px;
  padding-left: 2rem;
  font-size: 32px;
  border: none;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background-color: #f0e3d2;

  &:focus {
    outline: none;
    border-color: #007bff; /* Change focus border color as needed */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Change focus box-shadow as needed */
  }

  &::placeholder {
    color: #969696; /* Placeholder text color */
  }
`;

export const StyledAddButton = styled.button`
  height: 60px;
  width: 120px;
  font-size: 32px;
  text-transform: uppercase;
  border: none;
  background-color: #76b7cd;
  color: #f3f3f3;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`;

export const CardContainer = styled.div`
  width: 800px;
  height: auto;
  background-color: #f0e3d2;
  border-radius: 10px;
`;

export const StyledTodoList = styled.ul`
  list-style-type: none;
  padding: 0.5rem;
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTodoItem = styled.li`
  padding: 1rem;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  flex-direction: column;
`;

export const StyledBtnDelete = styled.button`
  background-color: #d98326;
  color: #fff; /* Text color */
  padding: 10px 15px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 1rem;
  float: right;
  &:hover {
    background-color: #555; /* Change hover color as needed */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(115, 115, 115, 0.7); /* Change focus box-shadow as needed */
  }
`;

export const StyledImage = styled.img`
  width: 200px;
  opacity: 0.4;
  /* margin: 0 auto;
  margin-top: 5rem; */
`;

export const StyledDivCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
