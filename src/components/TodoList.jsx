import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onRemoveTodo }) => (
  <ul>
    {todos.map((todo) => (
      <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fields: PropTypes.shape({
        Title: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
