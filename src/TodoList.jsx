import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onRemoveTodo }) => (
  <ul>
    {todos.map((todo) => (
      <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
    ))}
  </ul>
);

export default TodoList;
