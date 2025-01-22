// src/TodoListItem.jsx
import React from "react";

const TodoListItem = ({ todo, removeTodo }) => (
  <li>
    {todo.fields.Title}
    <button onClick={() => removeTodo(todo.id)}>Remove</button>
  </li>
);

export default TodoListItem;
