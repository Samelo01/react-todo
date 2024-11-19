import React from 'react';

const AddTodoForm = ({ onAddTodo }) => {
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.title.value;
        console.log(todoTitle);
        event.target.reset();
        onAddTodo(todoTitle);
    };

    return (
        <form onSubmit={handleAddTodo}>
            <input type="text" name="title" placeholder="Add Todo" />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;
