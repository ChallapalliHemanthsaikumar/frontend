import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../Utils/Common";

import './Login.css';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:4000/user/signin", {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="outer">
    <div className="container">
      <h1>Login</h1>
      <br />
      <br />
      <div>
        <label className="labelcontainer" >Username</label>
        <input className="inputcontainer" type="text" {...username}  />
      </div>
      <div style={{ marginTop: 10 }}>
        <label className="labelcontainer" >Password</label>
        <input className="inputcontainer" type="password" {...password} />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </div>
    </div>
  );
}

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
