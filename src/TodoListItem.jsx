import React from "react";

const TodoListItem = ({ todo, onRemoveTodo }) => (
  <li>
    <span>{todo.fields.Title}</span>
    <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
  </li>
);

export default TodoListItem;
