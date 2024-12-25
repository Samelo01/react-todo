import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
    const [todoText, setTodoText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (todoText.trim() === '') return;
        onAddTodo({
            id: Date.now(),
            text: todoText.trim(),
        });
        setTodoText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;
