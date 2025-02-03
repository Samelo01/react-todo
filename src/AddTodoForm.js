import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoText.trim()) {
      setError("Todo text is required.");
      return;
    }
    onAddTodo(todoText.trim());
    setTodoText(""); // Clear input after adding
    setError(""); // Clear any previous error
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo-input">Add Todo:</label>
      <input
        type="text"
        id="todo-input"
        name="todoText"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        required
        aria-describedby="error-message" // Accessibility improvement
      />
      <button type="submit">Add Todo</button>
      {error && <p id="error-message" style={{ color: "red" }}>{error}</p>} {/* Display error message */}
    </form>
  );
};

export default AddTodoForm;
