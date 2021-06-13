require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const utils = require("./utils");

const app = express();
const port = process.env.PORT || 4000;

// static user details
const userData = [
  {
    name: "Tann Mann Gaadi",
    username: "ttmg",
    password: "123456",
    cpassword: "123456",
    authority: "admin",
  },
];

//enable cors
app.use(cors());
//parse application/json
app.use(express.json());
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next();

  token = token.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (req, res, next) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user",
      });
    } else {
      req.user = user;
      next();
    }
  });
});

//request handlers
app.get("/", (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid user to access it" });
  res.send("Welcome to Backend " + req.user.name);
});

app.post("/user/register", (req, res) => {

    if(!req.body.name || !req.body.username || !req.body.password || !req.body.cpassword || !req.body.authority) {
        return res.status(400).json({
            error: true,
            message: "Fill all the fields.",
          });   
    }
  for(let i=0;i<userData.length;i++) {
      if(userData[i].username===req.body.username){
          return res.status(401).json({error: true, message: 'Username already exisits'});
      }
  }
  userData.push(req.body);
  return res.send("Registration Successfull");
});

// validate the user credentials
app.post("/user/signin", (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;

  if (!user || !pass) {
    return res.status(400).json({
      error: true,
      message: "Username or Password is missing.",
    });
  }

  console.log(userData);

  let flag = 0;

  for (let i = 0; i < userData.length; i++) {
    if (user === userData[i].username) {
      if (pass === userData[i].password) {
        flag = 1;
      }
    }
  }

  if (flag === 0) {
    return res.status(401).json({
      error: true,
      message: "Username or password is incorrect",
    });
  }

  //generate token
  const token = utils.generateToken(userData);
  //get basic user details
  const userObj = utils.getCleanUser(userData);

  //return the token along with user details
  return res.json({ user: userObj, token });
});

app.get("/verifyToken", (req, res) => {
  //check header or url parameters or post parameters for token
  var token = req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is missing",
    });
  }

  //if token is present, decode it to check if it is correct
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //token is invalid
    if (err)
      return res.status(401).json({
        error: true,
        message: "Token is invalid",
      });

    //userId is wrong
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Username not found.",
      });
    }

    //get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
