import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

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
    <div>
      <h2>Login/Signup</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Login;
