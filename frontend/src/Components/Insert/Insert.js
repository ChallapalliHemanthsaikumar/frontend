import React from "react";
import "./Insert.css"

 function Insert({input,setInput,todos,setTodos}){

    const inputHandler=(e)=>{

        setInput(e.target.value);
    };
    const submit=(e)=>{
       e.preventDefault();
       setTodos([...todos,{text:input}]);
       setInput('');
    }

     return(
         <form>
             <input value={input} onChange={inputHandler} type="text" className="todo-input"/>
             <button onClick={submit} className="todo-button" type="submit">
                 <i className="fas fa-plus-square"></i>
             </button>

         </form>

     );
 }
 export default Insert;