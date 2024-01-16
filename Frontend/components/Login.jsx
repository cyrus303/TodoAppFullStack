import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  CardContainer,
  StyledH2,
  StyledInput,
  StyledLabel,
  StyledButton,
  StyledForm,
  StyledBtnContainer,
  StyledA,
  StyledP,
} from './styledComponents/LoginStyledComponents';

const makeApiRequest = async (url, method, data) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${result.msg}`);
    }
    return result;
  } catch (error) {
    console.error('Error during API request:', error.message);
    throw error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(true);

  const handleSignup = async () => {
    try {
      await makeApiRequest(
        'http://localhost:3000/user/signup',
        'POST',
        {username, password}
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const responseData = await makeApiRequest(
        'http://localhost:3000/user/signin',
        'POST',
        {username, password}
      );

      localStorage.setItem('token', responseData.token);
      navigate('/todo');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContainer>
      {loginStatus ? (
        <StyledH2>LOGIN</StyledH2>
      ) : (
        <StyledH2>SIGN-UP</StyledH2>
      )}
      <StyledForm>
        <StyledLabel>
          Username
          <StyledInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </StyledLabel>
        <br />
        <StyledLabel>
          Password:
          <StyledInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledLabel>
        <br />
        <StyledBtnContainer>
          {loginStatus ? (
            <StyledButton type="button" onClick={handleLogin}>
              Login
            </StyledButton>
          ) : (
            <StyledButton type="button" onClick={handleSignup}>
              Signup
            </StyledButton>
          )}
        </StyledBtnContainer>
        {loginStatus ? (
          <StyledP>
            no account yet?{' '}
            <StyledA
              onClick={() => {
                setLoginStatus((prev) => !prev);
              }}
            >
              Sign up
            </StyledA>
          </StyledP>
        ) : (
          <StyledP>
            already have an account?{' '}
            <StyledA
              onClick={() => {
                setLoginStatus((prev) => !prev);
              }}
            >
              Login
            </StyledA>
          </StyledP>
        )}
      </StyledForm>
    </CardContainer>
  );
};

export default Login;
