import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './Register.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Register = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    cpassword: '',
    authority: 'ADMIN',
  });
  const [error, setError] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (user.cpassword !== user.password) setError("Passwords don't match");
    else setError('');
    document.getElementsByClassName('box inline-box right-box')[
      '0'
    ].style.height = window.innerHeight - 65 + 'px';
  }, [user.password, user.cpassword]);

  const handleRegister = () => {
    setSnackBarOpen(true);

    axios
      .post('http://localhost:4000/api/auth/register-admin', {
        email: user.email,
        password: user.password,
        cpassword: user.cpassword,
        authority: user.authority,
      })
      .then((res) => {
        props.history.push('/dashboard');
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setError('Some of the fields are missing!!');
        } else if (err.response.status === 500) {
          setError('Server failed');
        }
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  // set the position of error snackbar
  var vertical = 'top';
  var horizontal = 'center';

  return (
    <div id='container'>
      <div id='success'></div>
      <div id='form-container'>
        <form className='register-form' id='registerForm'>
          <div id='form-shadow'>
            <div id='registerHeading'>
              <h1>Register Here!!</h1>
            </div>
            <div className='input-styles input-width'>
              {/* <label className="Rlabelcontainer" htmlFor="name">First Name</label> */}
              <input
                className='box inline-box'
                type='text'
                value={user.name}
                onChange={handleInputs}
                placeholder='First Name'
                name='name'
                id='firstName'
                required
              />
              <input
                className='box inline-box right-box'
                type='text'
                value={user.lastname}
                onChange={handleInputs}
                placeholder='Last Name'
                name='name'
                id='lasttName'
                required
              />
            </div>
            <div className='input-styles '>
              {/* <label className="box inline-box" htmlFor="email">Email ID</label> */}
              <input
                className='box inline-box'
                type='text'
                value={user.email}
                onChange={handleInputs}
                name='email'
                id='email'
                placeholder='E-Mail'
                required
              />
            </div>
            <div className='input-styles input-width'>
              {/* <label className="Rlabelcontainer" htmlFor="password">Password</label> */}
              <input
                className='box inline-box'
                type='password'
                value={user.password}
                onChange={handleInputs}
                name='password'
                placeholder='Password'
                id='password'
                required
              />

              <input
                className='box inline-box right-box'
                type='password'
                value={user.cpassword}
                onChange={handleInputs}
                name='cpassword'
                placeholder='Confirm Password'
                id='cpassword'
                required
              />
            </div>

            {error && (
              <>
                <Snackbar
                  className='snackbar-reg'
                  open={snackBarOpen}
                  autoHideDuration={5000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical, horizontal }}
                >
                  <Alert onClose={handleClose} severity='error'>
                    {error}
                  </Alert>
                </Snackbar>
              </>
            )}
            <br />
            <div class='input-styles'>
              {/* <label class="labels box" for="gender">Gender:</label> */}
              <select
                class='box single-box drop-down '
                id='gender'
                name='gender'
              >
                <option value='gender'>Select Gender</option>
                <option value='MALE'>Male</option>
                <option value='FEMALE'>Female</option>
                <option value='OTHERS'>Others</option>
              </select>
              <br />
            </div>
            <div className='input-styles submit-btn'>
              <input
                id='submitDetails'
                type='button'
                className='form-submit'
                onClick={handleRegister}
                value='Register'
              />
            </div>
          </div>
        </form>
      </div>
      <div id='login-page'>
        <a href='/login'>
          <h4>Already Registered? Click here to Login</h4>
        </a>
      </div>
    </div>
  );
};

export default Register;
