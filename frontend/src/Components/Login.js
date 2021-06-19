import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

import './Login.css';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  useEffect(() => {
    document.getElementsByClassName('outer')['0'].style.height =
      window.innerHeight - 65 + 'px';
  });

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post('http://localhost:4000/api/auth/login', {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        // console.log('data', response.data);
        setUserSession(response.data.token, response.data.user);
        // console.log(response.data.user);
        props.history.push('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) setError('Fill all the fields!!');
        else if (error.response.status === 401)
          setError('Email address or password is incorrect');
        else setError('Something went wrong. Please try again later.');
      });
  };

  return (
    <div className='outer'>
      <div className='container'>
        <h1>Login</h1>
        <br />
        <br />
        <div>
          <label className='labelcontainer'>Email ID</label>
          <input className='inputcontainer' type='text' {...email} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label className='labelcontainer'>Password</label>
          <input className='inputcontainer' type='password' {...password} />
        </div>
        {error && (
          <>
            <small
              style={{
                color: 'red',
                textAlign: 'center',
                marginTop: '10px',
                fontSize: '16px',
              }}
            >
              {error}
            </small>
          </>
        )}
        <br />
        <div className='loginButton'>
          <input
            type='button'
            className='submit'
            value={loading ? 'Loading...' : 'Login'}
            onClick={handleLogin}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
