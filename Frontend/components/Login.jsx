import React, {useState, useEffect} from 'react';
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
  StyledActionP,
} from './styledComponents/LoginStyledComponents';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(true);
  const [errorStatus, setErrorStatus] = useState(false);
  const [actionMsg, SetActionMsg] = useState('');

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
        SetActionMsg(result.msg);
        throw new Error(` ${result.msg}`);
      }
      return result;
    } catch (error) {
      console.error('Error during API request:', error.message);
      throw error;
    }
  };

  const handleSignup = async () => {
    try {
      await makeApiRequest(
        'http://localhost:3000/user/signup',
        'POST',
        {username, password}
      );
      setLoginStatus(true);
      setUsername('');
      setPassword('');
      SetActionMsg('Sign Up Successful');
    } catch (error) {
      console.log(error);
      setErrorStatus(true);
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
      setErrorStatus(true);
    }
  };

  const handleInputUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrorStatus(false);
  };

  const handleInputPasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorStatus(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SetActionMsg('');
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [actionMsg]);

  return (
    <>
      <CardContainer>
        <StyledActionP
          style={{color: errorStatus ? '#ff0000b0' : '#008000b0'}}
        >
          {actionMsg}
        </StyledActionP>

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
              onChange={(e) => {
                handleInputUsernameChange(e);
              }}
              style={
                errorStatus
                  ? {border: '2px solid red'}
                  : {border: '2px solid transparent'}
              }
            />
          </StyledLabel>
          <br />
          <StyledLabel>
            Password:
            <StyledInput
              type="password"
              value={password}
              onChange={(e) => {
                handleInputPasswordChange(e);
              }}
              style={
                errorStatus
                  ? {border: '2px solid red'}
                  : {border: '2px solid transparent'}
              }
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
                  setPassword('');
                  setUsername('');
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
                  setPassword('');
                  setUsername('');
                  setLoginStatus((prev) => !prev);
                }}
              >
                Login
              </StyledA>
            </StyledP>
          )}
        </StyledForm>
      </CardContainer>
    </>
  );
};

export default Login;
