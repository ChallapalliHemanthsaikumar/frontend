import React,{useState}from "react";
import { getUser, removeUserSession } from "../../Utils/Common";
import Insert from"../Insert/Insert";



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
    <div>
      <br />
      <br />
      Welcome User {user.firstname} {user.lastname}!<br />
      <br />
        <Insert todos={todos} input ={input} setTodos={setTodos}setInput={setInput}/>
        <TodoList todos={todos} />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;
