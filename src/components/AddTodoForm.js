
import React, { useState } from "react";
import PropTypes from "prop-types";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todoText.trim()) {
      setError("Todo text is required.");
      return;
    }

    console.log("Attempting to add todo:", todoText.trim()); // Log attempt to add todo

    try {
      await onAddTodo(todoText.trim());
      console.log("Todo added successfully:", todoText.trim()); // Log success
      setTodoText(""); // ✅ Clear input after adding
      setError(""); // ✅ Clear any previous error
    } catch (error) {
      console.error("Error adding todo:", error); // Log error
      setError("Failed to add todo.");
    }
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
        aria-describedby="error-message"
      />
      <button type="submit">Add Todo</button>
      {error && <p id="error-message" style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;