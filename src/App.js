import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const App = () => {
  const [todoList, setTodoList] = useState([]);  // State to hold todos

  const addTodo = (title) => {
    const newTodo = { title, id: Date.now() };
    setTodoList([...todoList, newTodo]);  // Update todoList state
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
};

export default App;
