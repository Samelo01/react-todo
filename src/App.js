// /src/App.jsx
import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = (todoTitle) => {
        setTodos([...todos, { id: Date.now(), title: todoTitle }]);
        setNewTodo(todoTitle);
    };

    return (
        <div>
            <AddTodoForm onAddTodo={handleAddTodo} />
            <p>New Todo: {newTodo}</p>
            <TodoList todos={todos} />
        </div>
    );
};

export default App;

