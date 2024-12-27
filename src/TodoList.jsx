import React from "react";

const TodoList = ({ todoList, setTodoList }) => {
  const handleRemove = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleRemove(todo.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
