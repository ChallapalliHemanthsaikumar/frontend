import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    cpassword: "",
    authority: "admin",
  });
  const [error, setError] = useState(null);

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = () => {
    axios
      .post("http://localhost:4000/user/register", {
        name: user.name,
        username: user.username,
        password: user.password,
        cpassword: user.cpassword,
        authority: user.authority,
      })
      .then((res) => {
        props.history.push("/dashboard");
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="Rcontainer">
      
      <form className="register-form" id="register-form">
      <p className="form-title">Register Here!!</p>
        <div className="form-group">
          <label className="Rlabelcontainer" htmlFor="name">Name</label>
          <input className="Rinputcontainer"
            type="text"
            value={user.name}
            onChange={handleInputs}
            name="name"
            id="name"
            required
          />
        </div>
        <div className="form-group">
          <label className="Rlabelcontainer" htmlFor="username">Username</label>
          <input className="Rinputcontainer"
            type="text"
            value={user.username}
            onChange={handleInputs}
            name="username"
            id="username"
            required
          />
        </div>
        <div className="form-group">
          <label className="Rlabelcontainer" htmlFor="password">Password</label>
          <input className="Rinputcontainer"
            type="password"
            value={user.password}
            onChange={handleInputs}
            name="password"
            id="password"
            required
          />
        </div>
        <div className="form-group">
          <label className="Rlabelcontainer" htmlFor="cpassword">Confirm Password</label>
          <input className="Rinputcontainer"
            type="password"
            value={user.cpassword}
            onChange={handleInputs}
            name="cpassword"
            id="cpassword"
            required
          />
        </div>
        {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
        <div className="form-group form-button">
          <input
            type="button"
            className="form-submit"
            onClick={handleRegister}
            value="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
