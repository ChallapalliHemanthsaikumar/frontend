import React,{useState}from "react";
import { getUser, removeUserSession } from "../../Utils/Common";
import Insert from"../Insert/Insert";
import Label from '../Manager/Label'
import { Route,BrowserRouter as Router,Switch,Link } from "react-router-dom";

import "./Dashboard.css";
import TodoList from "../Insert/TodoList";

function Dashboard(props) {
    const [input,setInput]=useState('');
    const [todos,setTodos]=useState([]);


  const user = getUser();
  console.log(user);

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  return (
    <Router>
    <div>
      <br />
      <br />
      Welcome User {user.firstname} {user.lastname}!<br />
      <br />
        
        <Link to='/dashboard/manager'>Manager</Link>
        <Link to='/dashboard/user'>User</Link>
        <Switch>
        <Route path='/dashboard/user'><Insert todos={todos} input ={input} setTodos={setTodos}setInput={setInput}/>
        <TodoList todos={todos} /></Route>
       <Route path='/dashboard/manager' exact component={Label}/> 
       </Switch>
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
    </Router>
  );
}

export default Dashboard;
