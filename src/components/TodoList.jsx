import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onRemoveTodo }) => {
  console.log("Rendering Todo List with todos:", todos); // Log todos received

  return (
    <ul>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))
      ) : (
        <p>No todos yet.</p>
      )}
    </ul>
  );
};

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