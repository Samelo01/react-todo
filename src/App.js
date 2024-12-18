import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const App = () => {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (todo) => {
    setTodoList([...todoList, todo]);
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todoList} onRemoveTodo={removeTodo} />
    </div>
  );
};

export default App;
