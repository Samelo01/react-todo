import React from "react";
import styles from "./TodoListItem.module.css"; // Import the CSS module

const TodoListItem = ({ todo, onRemoveTodo }) => (
  <li className={styles.ListItem}>
    <span>{todo.fields.Title}</span>
    <button className={styles.RemoveButton} onClick={() => onRemoveTodo(todo.id)}>
      Remove
    </button>
  </li>
);

export default TodoListItem;
