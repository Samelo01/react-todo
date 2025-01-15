import React from "react";

const TodoListItem = ({ todo, removeTodo }) => (
  <li>
    {todo.title}
    <button onClick={() => removeTodo(todo.id)}>Remove</button>
  </li>
);

export default TodoListItem;
