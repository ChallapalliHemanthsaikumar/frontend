import React from "react";
import "./Insert.css";
import Todo from "./Todo";
function TodoList({todos}){

    return(
        <div className="todo-container">


            <ul className="todo-list">
                {
                    todos.map(todo=>(
                        <Todo text={todo.text} />
                        )

                    )
                }
            </ul>
            <Todo/>
        </div>
    );
}
export default TodoList;