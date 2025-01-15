import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(todoText);
    setTodoText(""); // Clear input after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo-input">Add Todo:</label>
      <input
        type="text"
        id="todo-input" // Added id for better accessibility
        name="todoText" // Added name attribute for autofill and form submission
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
