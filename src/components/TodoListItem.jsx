import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";

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
