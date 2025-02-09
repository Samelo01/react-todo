import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import styles from "./TodoListItem.module.css"; // Import the CSS module

const TodoListItem = ({ todo, onRemoveTodo }) => (
  <li className={styles.ListItem}>
    <span>{todo.fields.Title}</span>
    <button className={styles.RemoveButton} onClick={() => onRemoveTodo(todo.id)}>
      Remove
    </button>
  </li>
);

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fields: PropTypes.shape({
      Title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
