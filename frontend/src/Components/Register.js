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
    document.getElementsByClassName('Rcontainer')['0'].style.height =
      window.innerHeight - 65 + 'px';
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
    <div className='Rcontainer'>
      <form className='register-form' id='register-form'>
        <p className='form-title'>Register Here!!</p>
        {/* <div className="form-group">
          <label className="Rlabelcontainer" htmlFor="name">First Name</label>
          <input className="Rinputcontainer"
            type="text"
            value={user.name}
            onChange={handleInputs}
            name="name"
            id="name"
            required
          />
        </div> */}
        <div className='form-group'>
          <label className='Rlabelcontainer' htmlFor='email'>
            Email ID
          </label>
          <input
            className='Rinputcontainer'
            type='text'
            value={user.email}
            onChange={handleInputs}
            name='email'
            id='email'
            required
          />
        </div>
        <div className='form-group'>
          <label className='Rlabelcontainer' htmlFor='password'>
            Password
          </label>
          <input
            className='Rinputcontainer'
            type='password'
            value={user.password}
            onChange={handleInputs}
            name='password'
            id='password'
            required
          />
        </div>
        <div className='form-group'>
          <label className='Rlabelcontainer' htmlFor='cpassword'>
            Confirm Password
          </label>
          <input
            className='Rinputcontainer'
            type='password'
            value={user.cpassword}
            onChange={handleInputs}
            name='cpassword'
            id='cpassword'
            required
          />
        </div>
        {/* {error && (
          <small
            style={{
              color: 'red',
              textAlign: 'center',
              fontSize: '16px',
              marginTop: '10px',
            }}
          >
            {error}
          </small>
        )} */}
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
        <div className='form-group form-button'>
          <input
            type='button'
            className='form-submit'
            onClick={handleRegister}
            value='Register'
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
