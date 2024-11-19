// src/TodoList.jsx
import React from 'react';
import TodoListItem from './TodoListItem';  // Import TodoListItem

function TodoList() {
  const todos = ['Task 1', 'Task 2'];

  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoListItem key={index} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
